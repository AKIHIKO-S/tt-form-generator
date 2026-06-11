import { Hono } from 'hono';
import { verifyAccess, AccessError, type Identity, type AccessConfig } from './access';
import {
  listTournaments,
  listSubmissions,
  getSubmission,
  getStats,
  getAnnual,
  listTeams,
  getTeam,
  insertSubmission,
} from './db';
import { resolvePeriod } from './period';
import { verifyHmac } from './hmac';
import { DASHBOARD_HTML } from './dashboard';

function periodFromQuery(c: { req: { query(k: string): string | undefined } }) {
  const year = c.req.query('year');
  return resolvePeriod({
    year: year ? Number(year) : undefined,
    from: c.req.query('from') || undefined,
    to: c.req.query('to') || undefined,
  });
}

export interface Env {
  DB: D1Database;
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  DEV_BYPASS: string;
  INGEST_HMAC_SECRET?: string;
}

type Vars = { identity: Identity };

const app = new Hono<{ Bindings: Env; Variables: Vars }>();

function accessConfig(env: Env): AccessConfig {
  return {
    teamDomain: env.ACCESS_TEAM_DOMAIN,
    aud: env.ACCESS_AUD,
    devBypass: env.DEV_BYPASS === 'true',
  };
}

// ── Bypass 経路（IdP ログインできない経路）─────────────────────
//   Cloudflare Access 側の Bypass ポリシーで認証対象から外す前提。
//   機密を返さない / 署名で担保する。

// ヘルスチェック：認証不要・機密なし
app.get('/health', (c) =>
  c.json({ ok: true, service: 'tt-data-api', time: new Date().toISOString() }),
);

// デモ用ダッシュボード：DEV_BYPASS のときだけ配信（本番では出さない）。
// Worker と同一オリジンで返すため CORS 不要。
app.get('/', (c) => {
  if (c.env.DEV_BYPASS !== 'true') return c.notFound();
  return c.html(DASHBOARD_HTML);
});

// 取込 Webhook：HMAC 署名で正当性を担保（IdP ログインなし）
app.post('/ingest', async (c) => {
  const secret = c.env.INGEST_HMAC_SECRET;
  if (!secret) return c.json({ ok: false, error: 'ingest not configured' }, 503);

  const raw = await c.req.text();
  const sig = c.req.header('X-Signature') ?? '';
  if (!(await verifyHmac(secret, raw, sig))) {
    return c.json({ ok: false, error: 'invalid signature' }, 401);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return c.json({ ok: false, error: 'invalid json' }, 400);
  }

  const result = await insertSubmission(c.env.DB, payload);
  return c.json({ ok: true, ...result });
});

// ── 保護対象 API（/api/*）──────────────────────────────────
//   オリジン側で Access JWT を再検証してから本処理に到達させる。
app.use('/api/*', async (c, next) => {
  try {
    const identity = await verifyAccess(c.req.raw, accessConfig(c.env));
    c.set('identity', identity);
  } catch (err) {
    if (err instanceof AccessError) {
      return c.json({ ok: false, error: err.message }, err.status);
    }
    return c.json({ ok: false, error: 'authentication error' }, 401);
  }
  await next();
});

// 認証された身元を返す（whoami）
app.get('/api/me', (c) => {
  const id = c.get('identity');
  return c.json({ ok: true, email: id.email, sub: id.sub, dev: id.dev });
});

app.get('/api/tournaments', async (c) => {
  return c.json({ ok: true, tournaments: await listTournaments(c.env.DB) });
});

app.get('/api/submissions', async (c) => {
  const tournamentId = c.req.query('tournament') || undefined;
  const limit = c.req.query('limit') ? Number(c.req.query('limit')) : undefined;
  const submissions = await listSubmissions(c.env.DB, { tournamentId, limit });
  return c.json({ ok: true, submissions });
});

app.get('/api/submissions/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if (!Number.isInteger(id)) return c.json({ ok: false, error: 'invalid id' }, 400);
  const sub = await getSubmission(c.env.DB, id);
  if (!sub) return c.json({ ok: false, error: 'not found' }, 404);
  return c.json({ ok: true, submission: sub });
});

app.get('/api/stats', async (c) => {
  const tournamentId = c.req.query('tournament') || undefined;
  return c.json({ ok: true, stats: await getStats(c.env.DB, tournamentId) });
});

// 年間（期間）集計：大会別・団体別内訳。?year= または ?from=&to=
app.get('/api/annual', async (c) => {
  return c.json({ ok: true, stats: await getAnnual(c.env.DB, periodFromQuery(c)) });
});

// 団体一覧（discovery 用）
app.get('/api/teams', async (c) => {
  return c.json({ ok: true, teams: await listTeams(c.env.DB) });
});

// 特定団体の申込（全大会横断）。?name= 必須、?year=/?from=&to= で期間絞り込み可
app.get('/api/team', async (c) => {
  const name = c.req.query('name');
  if (!name) return c.json({ ok: false, error: 'name is required' }, 400);
  return c.json({ ok: true, team: await getTeam(c.env.DB, name, periodFromQuery(c)) });
});

// デモ用：ランダムなサンプル申込を1件投入する（DEV_BYPASS のときだけ有効）。
// ダッシュボードの「サンプル申込を追加」ボタンから呼ばれ、数字が動くのを見せる。
app.post('/api/demo/seed', async (c) => {
  if (c.env.DEV_BYPASS !== 'true') return c.notFound();
  const result = await insertSubmission(c.env.DB, randomSubmission());
  return c.json({ ok: true, ...result });
});

// デモ用のランダム申込ペイロード（取込ペイロードと同じ形）。
function randomSubmission() {
  const pick = <T>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
  const tournaments = [
    { id: 'yasaka', name: '第51回ヤサカ杯' },
    { id: 'nittaku', name: '釧路選手権（ニッタク杯）' },
    { id: 'league54', name: '第54回くしろリーグ' },
    { id: 'junior', name: '釧路ジュニア選手権' },
  ];
  const teams = ['釧路第一中学校', '釧路東高校', '湿原クラブ', '阿寒卓球少年団', '鳥取ジュニアクラブ', '中央クラブ'];
  const events = [
    { title: '男子シングルス', category: '中学生', fee: 1500 },
    { title: '女子シングルス', category: '高校生', fee: 1500 },
    { title: 'ダブルス', category: '一般', fee: 3000 },
    { title: '団体戦', category: '一般', fee: 6000 },
  ];
  const t = pick(tournaments);
  const n = 1 + Math.floor(Math.random() * 3);
  const rows = Array.from({ length: n }, () => {
    const e = pick(events);
    return { event_kind: 'event', event_title: e.title, category: e.category, fee: e.fee, name: pick(teams) + '選手' };
  });
  const total = rows.reduce((s, r) => s + r.fee, 0);
  return {
    tournament_id: t.id,
    tournament_name: t.name,
    submitted_at: new Date().toISOString(),
    total,
    team_info: { team_name: pick(teams), responsible: '担当者', phone: '090-0000-0000', coaches: {} },
    rows,
  };
}

export default app;
