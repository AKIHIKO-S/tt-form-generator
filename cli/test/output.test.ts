import { describe, it, expect, vi } from 'vitest';
import { table, emit, setJsonMode } from '../src/output';

describe('table', () => {
  it('ヘッダ・区切り・行を整形する', () => {
    const out = table([{ a: '1', b: 'x' }], ['a', 'b']);
    const lines = out.split('\n');
    expect(lines[0]).toContain('a');
    expect(lines[0]).toContain('b');
    expect(lines[1]).toMatch(/─/);
    expect(lines[2]).toContain('1');
    expect(lines[2]).toContain('x');
  });

  it('空配列は「(該当なし)」', () => {
    expect(table([], ['a'])).toBe('(該当なし)');
  });
});

describe('emit', () => {
  it('JSON モードでは構造化データを書き出す', () => {
    setJsonMode(true);
    const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    try {
      emit({ ok: true, n: 1 }, () => 'human');
      const written = spy.mock.calls.map((c) => String(c[0])).join('');
      expect(JSON.parse(written)).toEqual({ ok: true, n: 1 });
    } finally {
      spy.mockRestore();
      setJsonMode(false);
    }
  });
});
