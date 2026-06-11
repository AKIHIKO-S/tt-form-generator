import { describe, it, expect } from 'vitest';
import { periodQuery } from '../src/client';

describe('periodQuery', () => {
  it('year を文字列クエリにする', () => {
    expect(periodQuery({ year: 2025 }).toString()).toBe('year=2025');
  });

  it('from/to を含める', () => {
    const q = periodQuery({ from: '2025-04-01', to: '2026-04-01' });
    expect(q.get('from')).toBe('2025-04-01');
    expect(q.get('to')).toBe('2026-04-01');
  });

  it('未指定なら空', () => {
    expect(periodQuery({}).toString()).toBe('');
  });
});
