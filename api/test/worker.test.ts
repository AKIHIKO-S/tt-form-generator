import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { beforeAll, describe, it, expect } from 'vitest';
import worker from '../src/index';
import { computeHmacHex } from '../src/hmac';
import schemaSql from '../schema.sql?raw';
import seedSql from '../seed.sql?raw';

// SQL ファイルをステートメント単位に割る（-- コメント行は除去）。
function statements(sql: string): string[] {
  return sql
    .split('\n')
    .filter((l) => !l.trim().startsWith('--'))
    .join('\n')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
}

beforeAll(async () => {
  for (const s of statements(schemaSql)) await env.DB.prepare(s).run();
  for (const s of statements(seedSql)) await env.DB.prepare(s).run();
});

const DEV = { DEV_BYPASS: 'true' };
const SECRET = { INGEST_HMAC_SECRET: 'sekret' };

async function call(
  path: string,
  init: RequestInit = {},
  envOverride: Record<string, string> = {},
): Promise<Response> {
  const ctx = createExecutionContext();
  const res = await worker.fetch(
    new Request(`https://api.test${path}`, init),
    { ...env, ...envOverride } as any,
    ctx,
  );
  await waitOnExecutionContext(ctx);
  return res;
}

describe('Bypass 経路', () => {
  it('GET /health は認証不要で 200', async () => {
    const res = await call('/health');
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });
});

describe('Access による保護', () => {
  it('ヘッダ無し・DEV_BYPASS=false なら 401', async () => {
    const res = await call('/api/me'); // DEV_BYPASS は wrangler.toml の "false"
    expect(res.status).toBe(401);
  });

  it('DEV_BYPASS で身元が返る', async () => {
    const res = await call('/api/me', {}, DEV);
    expect(res.status).toBe(200);
    const body = await res.json<any>();
    expect(body.email).toBe('dev@localhost');
    expect(body.dev).toBe(true);
  });
});

describe('参照系エンドポイント', () => {
  it('大会一覧を返す', async () => {
    const body = await (await call('/api/tournaments', {}, DEV)).json<any>();
    expect(body.tournaments).toHaveLength(2);
  });

  it('年間集計: 年度2026 は seed の3件、年度2025 は空', async () => {
    const y2026 = await (await call('/api/annual?year=2026', {}, DEV)).json<any>();
    expect(y2026.stats.totals.submissions).toBe(3);
    expect(y2026.stats.totals.teams).toBe(3);
    expect(y2026.stats.totals.total_fee).toBe(13500);

    const y2025 = await (await call('/api/annual?year=2025', {}, DEV)).json<any>();
    expect(y2025.stats.totals.submissions).toBe(0);
  });

  it('団体一覧を返す', async () => {
    const body = await (await call('/api/teams', {}, DEV)).json<any>();
    expect(body.teams).toHaveLength(3);
  });

  it('団体別: name 必須（無ければ 400）', async () => {
    const res = await call('/api/team', {}, DEV);
    expect(res.status).toBe(400);
  });

  it('団体別: 指定団体の申込を返す', async () => {
    const path = `/api/team?name=${encodeURIComponent('釧路第一中学校')}`;
    const body = await (await call(path, {}, DEV)).json<any>();
    expect(body.team.totals.submissions).toBe(1);
    expect(body.team.totals.total_fee).toBe(3000);
  });
});

describe('取込 /ingest（HMAC）', () => {
  const payload = JSON.stringify({
    tournament_id: 'nittaku',
    tournament_name: '釧路選手権',
    submitted_at: '2026-06-01T00:00:00.000Z',
    total: 1500,
    team_info: { team_name: 'テストクラブ', responsible: '検証', phone: '' },
    rows: [{ event_kind: 'event', event_title: 'シングルス', category: '一般', fee: 1500, name: '検証' }],
  });

  it('正しい署名は受理し、保護APIから参照できる', async () => {
    const sig = await computeHmacHex('sekret', payload);
    const res = await call('/ingest', { method: 'POST', body: payload, headers: { 'X-Signature': sig } }, SECRET);
    expect(res.status).toBe(200);
    const ingested = await res.json<any>();
    expect(ingested.ok).toBe(true);
    expect(ingested.entries).toBe(1);

    // 同一テスト内なら書き込みが見える（isolatedStorage は it 単位）
    const list = await (await call('/api/submissions?tournament=nittaku', {}, DEV)).json<any>();
    expect(list.submissions).toHaveLength(1);
    expect(list.submissions[0].team_name).toBe('テストクラブ');
  });

  it('不正な署名は 401', async () => {
    const res = await call('/ingest', { method: 'POST', body: payload, headers: { 'X-Signature': 'deadbeef' } }, SECRET);
    expect(res.status).toBe(401);
  });
});
