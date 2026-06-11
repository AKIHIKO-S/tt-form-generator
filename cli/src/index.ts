import { api, type PeriodOpts } from './client.js';
import { login } from './auth.js';
import { runMcpServer } from './mcp.js';
import { emit, fail, table, setJsonMode } from './output.js';

/**
 * 釧路卓球協会 内部データ CLI。
 * 人間はターミナルから、シェルを扱う AI エージェントは同じコマンドを実行する。
 * `mcp` サブコマンドで起動すると MCP サーバとして振る舞う（同一バイナリ）。
 */

const HELP = `釧路卓球協会 内部データ CLI (kushiro-tt)

使い方:
  kushiro-tt login                       IdP ログイン（ブラウザを開く）
  kushiro-tt whoami                      認証された自分の身元を表示
  kushiro-tt tournaments                 大会一覧（件数・合計参加料）
  kushiro-tt submissions [--tournament <id>] [--limit <n>]
                                         申込一覧
  kushiro-tt submission <id>             申込1件の詳細（明細つき）
  kushiro-tt stats [--tournament <id>]   集計（区分別内訳）
  kushiro-tt annual [--year <y>] [--from <d>] [--to <d>]
                                         年間（期間）集計（大会別・団体別）
  kushiro-tt teams                       団体一覧（件数・合計参加料）
  kushiro-tt team <名称> [--year <y>] [--from <d>] [--to <d>]
                                         特定団体の申込（全大会横断）
  kushiro-tt mcp                         MCP サーバとして起動（stdio）

オプション:
  --json     常に JSON で出力（パイプ時は自動で JSON）
  -h, --help ヘルプ

接続先 API: 環境変数 TT_API_URL で上書き可。`;

function parseFlags(args: string[]) {
  const flags: Record<string, string | boolean> = {};
  const positional: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--json') flags.json = true;
    else if (a === '-h' || a === '--help') flags.help = true;
    else if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else flags[key] = true;
    } else positional.push(a);
  }
  return { flags, positional };
}

function periodOpts(flags: Record<string, string | boolean>): PeriodOpts {
  return {
    year: flags.year ? Number(flags.year) : undefined,
    from: typeof flags.from === 'string' ? flags.from : undefined,
    to: typeof flags.to === 'string' ? flags.to : undefined,
  };
}

async function main() {
  const argv = process.argv.slice(2);

  // MCP は遅延認証・stdio 専有なので最優先で分岐
  if (argv[0] === 'mcp') {
    await runMcpServer();
    return;
  }

  const { flags, positional } = parseFlags(argv);
  if (flags.json) setJsonMode(true);
  const cmd = positional.shift();
  if (!cmd || flags.help || cmd === 'help') {
    process.stdout.write(HELP + '\n');
    return;
  }

  try {
    switch (cmd) {
      case 'login':
        await login();
        emit({ ok: true }, () => 'ログインしました。');
        break;

      case 'whoami': {
        const me = await api.me();
        emit(me, () => `${me.email}${me.dev ? ' (dev bypass)' : ''}`);
        break;
      }

      case 'tournaments': {
        const t = await api.tournaments();
        emit(t, () =>
          table(t, ['tournament_id', 'tournament_name', 'submissions', 'total_fee']),
        );
        break;
      }

      case 'submissions': {
        const subs = await api.submissions(
          flags.tournament as string | undefined,
          flags.limit ? Number(flags.limit) : undefined,
        );
        emit(subs, () =>
          table(subs, ['id', 'tournament_id', 'team_name', 'responsible', 'total', 'submitted_at']),
        );
        break;
      }

      case 'submission': {
        const id = Number(positional[0]);
        if (!Number.isInteger(id)) fail('申込IDを指定してください: kushiro-tt submission <id>');
        const s = await api.submission(id);
        emit(s, () => {
          const lines = [
            `#${s.id}  ${s.tournament_name}`,
            `団体: ${s.team_name}　責任者: ${s.responsible}　連絡先: ${s.phone}`,
            `顧問/引率: ${(s.coaches || []).join(' / ') || '(なし)'}`,
            `合計参加料: ¥${Number(s.total).toLocaleString()}`,
            '',
            table(
              (s.entries || []).map((e: any) => ({
                ...e,
                player: e.player ? JSON.stringify(e.player) : '',
              })),
              ['event_title', 'category', 'fee', 'player'],
            ),
          ];
          return lines.join('\n');
        });
        break;
      }

      case 'stats': {
        const st = await api.stats(flags.tournament as string | undefined);
        emit(st, () => {
          const head = `対象: ${st.tournament_id || '全大会'}　申込 ${st.submissions} 件　合計 ¥${Number(st.total_fee).toLocaleString()}`;
          return head + '\n\n' + table(st.by_category, ['event_title', 'category', 'entries', 'fee']);
        });
        break;
      }

      case 'annual': {
        const a = await api.annual(periodOpts(flags));
        emit(a, () => {
          const head = `期間: ${a.period.label}　申込 ${a.totals.submissions} 件　団体 ${a.totals.teams}　合計 ¥${Number(a.totals.total_fee).toLocaleString()}`;
          return [
            head,
            '',
            '■ 大会別',
            table(a.by_tournament, ['tournament_id', 'tournament_name', 'submissions', 'total_fee']),
            '',
            '■ 団体別',
            table(a.by_team, ['team_name', 'submissions', 'total_fee']),
          ].join('\n');
        });
        break;
      }

      case 'teams': {
        const t = await api.teams();
        emit(t, () => table(t, ['team_name', 'submissions', 'total_fee']));
        break;
      }

      case 'team': {
        const name = positional[0];
        if (!name) fail('団体名を指定してください: kushiro-tt team <名称>');
        const tm = await api.team(name, periodOpts(flags));
        emit(tm, () => {
          const head = `団体: ${tm.team_name}　期間: ${tm.period.label}　申込 ${tm.totals.submissions} 件　合計 ¥${Number(tm.totals.total_fee).toLocaleString()}`;
          return head + '\n\n' + table(tm.submissions, ['id', 'tournament_id', 'tournament_name', 'total', 'submitted_at']);
        });
        break;
      }

      default:
        fail(`不明なコマンド: ${cmd}\n\n${HELP}`);
    }
  } catch (err: any) {
    fail(err?.message || String(err));
  }
}

main();
