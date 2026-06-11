/** 集計の対象期間。年度（4月〜翌3月）または明示的な from/to を解決する。 */

export interface Period {
  from: string | null; // ISO8601, inclusive
  to: string | null; // ISO8601, exclusive
  label: string;
}

/**
 * クエリから期間を解決する。
 *  - from/to が指定されていればそれを優先（year は無視）
 *  - year のみなら日本の年度（year-04-01 〜 翌year-04-01）
 *  - いずれも無ければ全期間（フィルタなし）
 */
export function resolvePeriod(q: { year?: number; from?: string; to?: string }): Period {
  if (q.from || q.to) {
    return {
      from: q.from ?? null,
      to: q.to ?? null,
      label: `${q.from ?? '*'}〜${q.to ?? '*'}`,
    };
  }
  if (q.year && Number.isInteger(q.year)) {
    const y = q.year;
    return {
      from: `${y}-04-01T00:00:00.000Z`,
      to: `${y + 1}-04-01T00:00:00.000Z`,
      label: `${y}年度`,
    };
  }
  return { from: null, to: null, label: '全期間' };
}

/**
 * 指定カラムに対する期間の WHERE 断片とバインド値を返す。
 * submitted_at は ISO8601(UTC) 文字列なので辞書順比較で範囲指定できる。
 * 断片は空文字になり得るので、呼び出し側で WHERE/AND を組み立てる。
 */
export function periodClause(col: string, p: Period): { sql: string; binds: string[] } {
  const parts: string[] = [];
  const binds: string[] = [];
  if (p.from) {
    parts.push(`${col} >= ?`);
    binds.push(p.from);
  }
  if (p.to) {
    parts.push(`${col} < ?`);
    binds.push(p.to);
  }
  return { sql: parts.join(' AND '), binds };
}
