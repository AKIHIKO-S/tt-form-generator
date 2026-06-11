/**
 * 出力先がパイプ（非 TTY）または --json 指定のとき機械可読な JSON へ
 * 自動で切り替える。これにより AI（シェルを扱うエージェント）からも扱える。
 */
let forceJson = false;
export function setJsonMode(on: boolean) {
  forceJson = on;
}

function isJson(): boolean {
  return forceJson || !process.stdout.isTTY;
}

export function emit(data: unknown, human: () => string): void {
  if (isJson()) {
    process.stdout.write(JSON.stringify(data, null, 2) + '\n');
  } else {
    process.stdout.write(human() + '\n');
  }
}

export function fail(message: string, code = 1): never {
  if (isJson()) {
    process.stdout.write(JSON.stringify({ ok: false, error: message }) + '\n');
  } else {
    process.stderr.write(`エラー: ${message}\n`);
  }
  process.exit(code);
}

/** 簡易テーブル整形（人間向け） */
export function table(rows: Record<string, unknown>[], cols: string[]): string {
  if (!rows.length) return '(該当なし)';
  const widths = cols.map((c) =>
    Math.max(c.length, ...rows.map((r) => String(r[c] ?? '').length)),
  );
  const line = (vals: string[]) =>
    vals.map((v, i) => v.padEnd(widths[i])).join('  ');
  const header = line(cols);
  const sep = widths.map((w) => '─'.repeat(w)).join('  ');
  const body = rows.map((r) => line(cols.map((c) => String(r[c] ?? ''))));
  return [header, sep, ...body].join('\n');
}
