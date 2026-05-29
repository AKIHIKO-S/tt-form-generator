import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { computeTotal, buildRows } from './submit.js';

// Minimal synthetic tournament covering events + extras.
const tournament = {
  id: 'test_cup',
  name: '第1回テスト杯\n（テスト大会）',
  events: [
    {
      id: 'event_1',
      title: 'シングルス\n（男子・女子）',
      fields: [
        { key: 'name', label: '氏名' },
        { key: 'team', label: '団体名' },
      ],
      categories: [
        { name: '一般男子', fee: 1000 },
        { name: '一般女子', fee: 1000 },
      ],
    },
    {
      id: 'event_2',
      title: 'ダブルス',
      fields: [{ key: 'name1', label: '氏名１' }],
      categories: [{ name: 'ミックス', fee: 2000 }],
    },
  ],
  extras: [
    { id: 'bento', price: 800 },
    { id: 'party', price: 3000 },
  ],
};

describe('computeTotal', () => {
  it('returns 0 for an empty submission', () => {
    const formData = { teamInfo: {}, eventEntries: {}, extraEntries: {} };
    expect(computeTotal(tournament, formData)).toBe(0);
  });

  it('sums fees per event entry by matching category', () => {
    const formData = {
      teamInfo: {},
      eventEntries: {
        event_1: [{ category: '一般男子' }, { category: '一般女子' }],
        event_2: [{ category: 'ミックス' }],
      },
      extraEntries: {},
    };
    expect(computeTotal(tournament, formData)).toBe(1000 + 1000 + 2000);
  });

  it('ignores entries whose category does not match any defined category', () => {
    const formData = {
      teamInfo: {},
      eventEntries: { event_1: [{ category: '存在しない区分' }] },
      extraEntries: {},
    };
    expect(computeTotal(tournament, formData)).toBe(0);
  });

  it('adds extras priced by the number of names', () => {
    const formData = {
      teamInfo: {},
      eventEntries: {},
      extraEntries: { bento: ['太郎', '花子', '次郎'], party: ['太郎'] },
    };
    expect(computeTotal(tournament, formData)).toBe(800 * 3 + 3000);
  });

  it('combines event and extra fees', () => {
    const formData = {
      teamInfo: {},
      eventEntries: { event_2: [{ category: 'ミックス' }] },
      extraEntries: { bento: ['太郎'] },
    };
    expect(computeTotal(tournament, formData)).toBe(2000 + 800);
  });
});

describe('buildRows', () => {
  const formData = {
    teamInfo: {
      team_name: 'テスト団体',
      responsible: '担当 太郎',
      phone: '090-0000-0000',
      coaches: { c1: '引率A', c2: '', c3: '引率B' },
    },
    eventEntries: {
      event_1: [{ category: '一般男子', name: '山田', team: 'A中' }],
    },
    extraEntries: { bento: ['太郎', '花子'] },
  };

  it('produces one row per event entry plus one per extra name', () => {
    const rows = buildRows(tournament, formData);
    expect(rows).toHaveLength(1 + 2);
  });

  it('flattens tournament name newlines on every row', () => {
    const rows = buildRows(tournament, formData);
    for (const row of rows) {
      expect(row.tournament_name).toBe('第1回テスト杯 （テスト大会）');
      expect(row.tournament_id).toBe('test_cup');
    }
  });

  it('carries team header info onto each row', () => {
    const [eventRow] = buildRows(tournament, formData);
    expect(eventRow.team_name).toBe('テスト団体');
    expect(eventRow.responsible).toBe('担当 太郎');
    expect(eventRow.phone).toBe('090-0000-0000');
  });

  it('maps non-empty coaches sequentially into coach1..coach3', () => {
    const [eventRow] = buildRows(tournament, formData);
    // '引率A' and '引率B' are kept; the empty value is skipped.
    expect(eventRow.coach1).toBe('引率A');
    expect(eventRow.coach2).toBe('引率B');
    expect(eventRow.coach3).toBe('');
  });

  it('records event rows with kind, fee and field values', () => {
    const eventRow = buildRows(tournament, formData).find(r => r.event_kind === 'event');
    expect(eventRow.event_id).toBe('event_1');
    expect(eventRow.category).toBe('一般男子');
    expect(eventRow.fee).toBe(1000);
    expect(eventRow.name).toBe('山田');
    expect(eventRow.team).toBe('A中');
  });

  it('records extra rows with their price and Japanese label', () => {
    const extraRows = buildRows(tournament, formData).filter(r => r.event_kind === 'extra');
    expect(extraRows).toHaveLength(2);
    expect(extraRows[0].event_title).toBe('お弁当');
    expect(extraRows[0].fee).toBe(800);
    expect(extraRows.map(r => r.name)).toEqual(['太郎', '花子']);
  });

  it('uses fee 0 when an entry category is unknown', () => {
    const fd = {
      teamInfo: { team_name: 'X', coaches: {} },
      eventEntries: { event_1: [{ category: '未知', name: 'A' }] },
      extraEntries: {},
    };
    const [row] = buildRows(tournament, fd);
    expect(row.fee).toBe(0);
  });
});
