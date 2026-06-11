import { describe, it, expect } from 'vitest';
import { resolvePeriod, periodClause } from '../src/period';

describe('resolvePeriod', () => {
  it('year を日本の年度（4月〜翌3月）に解決する', () => {
    const p = resolvePeriod({ year: 2025 });
    expect(p.from).toBe('2025-04-01T00:00:00.000Z');
    expect(p.to).toBe('2026-04-01T00:00:00.000Z');
    expect(p.label).toBe('2025年度');
  });

  it('from/to を year より優先する', () => {
    const p = resolvePeriod({ year: 2025, from: '2026-01-01', to: '2026-02-01' });
    expect(p.from).toBe('2026-01-01');
    expect(p.to).toBe('2026-02-01');
  });

  it('未指定なら全期間（フィルタなし）', () => {
    const p = resolvePeriod({});
    expect(p.from).toBeNull();
    expect(p.to).toBeNull();
    expect(p.label).toBe('全期間');
  });
});

describe('periodClause', () => {
  it('from/to 両方で AND の断片を作る', () => {
    const { sql, binds } = periodClause('submitted_at', resolvePeriod({ year: 2025 }));
    expect(sql).toBe('submitted_at >= ? AND submitted_at < ?');
    expect(binds).toEqual(['2025-04-01T00:00:00.000Z', '2026-04-01T00:00:00.000Z']);
  });

  it('from のみなら下限だけ', () => {
    const { sql, binds } = periodClause('submitted_at', { from: '2025-04-01', to: null, label: '' });
    expect(sql).toBe('submitted_at >= ?');
    expect(binds).toEqual(['2025-04-01']);
  });

  it('期間なしなら空断片', () => {
    const { sql, binds } = periodClause('submitted_at', resolvePeriod({}));
    expect(sql).toBe('');
    expect(binds).toEqual([]);
  });
});
