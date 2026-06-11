/** D1 アクセス層。参照系（役員/AI 向け）と取込系（Webhook）を分離する。 */

export interface SubmissionRow {
  id: number;
  tournament_id: string;
  tournament_name: string;
  team_name: string;
  responsible: string | null;
  phone: string | null;
  coaches: string | null;
  total: number;
  submitted_at: string;
  raw: string | null;
}

export interface EntryRow {
  id: number;
  submission_id: number;
  event_kind: string | null;
  event_id: string | null;
  event_title: string | null;
  category: string | null;
  fee: number;
  player: string | null;
}

function parseCoaches(s: string | null): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function shapeSubmission(r: SubmissionRow) {
  return {
    id: r.id,
    tournament_id: r.tournament_id,
    tournament_name: r.tournament_name,
    team_name: r.team_name,
    responsible: r.responsible ?? '',
    phone: r.phone ?? '',
    coaches: parseCoaches(r.coaches),
    total: r.total,
    submitted_at: r.submitted_at,
  };
}

/** 大会一覧（申込件数・合計参加料つき） */
export async function listTournaments(db: D1Database) {
  const { results } = await db
    .prepare(
      `SELECT tournament_id, tournament_name,
              COUNT(*) AS submissions,
              SUM(total) AS total_fee
         FROM submissions
        GROUP BY tournament_id, tournament_name
        ORDER BY MAX(submitted_at) DESC`,
    )
    .all<{ tournament_id: string; tournament_name: string; submissions: number; total_fee: number }>();
  return results ?? [];
}

/** 申込一覧（大会IDで絞り込み可） */
export async function listSubmissions(
  db: D1Database,
  opts: { tournamentId?: string; limit?: number } = {},
) {
  const limit = Math.min(Math.max(opts.limit ?? 100, 1), 500);
  const stmt = opts.tournamentId
    ? db
        .prepare(
          `SELECT * FROM submissions WHERE tournament_id = ?
            ORDER BY submitted_at DESC LIMIT ?`,
        )
        .bind(opts.tournamentId, limit)
    : db
        .prepare(`SELECT * FROM submissions ORDER BY submitted_at DESC LIMIT ?`)
        .bind(limit);
  const { results } = await stmt.all<SubmissionRow>();
  return (results ?? []).map(shapeSubmission);
}

/** 申込1件 + 明細 */
export async function getSubmission(db: D1Database, id: number) {
  const sub = await db
    .prepare(`SELECT * FROM submissions WHERE id = ?`)
    .bind(id)
    .first<SubmissionRow>();
  if (!sub) return null;

  const { results } = await db
    .prepare(`SELECT * FROM entries WHERE submission_id = ? ORDER BY id`)
    .bind(id)
    .all<EntryRow>();

  return {
    ...shapeSubmission(sub),
    entries: (results ?? []).map((e) => ({
      event_kind: e.event_kind ?? '',
      event_id: e.event_id ?? '',
      event_title: e.event_title ?? '',
      category: e.category ?? '',
      fee: e.fee,
      player: e.player ? safeJson(e.player) : null,
    })),
  };
}

/** 大会の集計（件数・合計・区分別内訳） */
export async function getStats(db: D1Database, tournamentId?: string) {
  const where = tournamentId ? `WHERE s.tournament_id = ?` : '';
  const bind = tournamentId ? [tournamentId] : [];

  const summary = await db
    .prepare(
      `SELECT COUNT(*) AS submissions, COALESCE(SUM(total),0) AS total_fee
         FROM submissions s ${where}`,
    )
    .bind(...bind)
    .first<{ submissions: number; total_fee: number }>();

  const { results: byCategory } = await db
    .prepare(
      `SELECT e.event_title, e.category, COUNT(*) AS entries, COALESCE(SUM(e.fee),0) AS fee
         FROM entries e
         JOIN submissions s ON s.id = e.submission_id
         ${where}
        GROUP BY e.event_title, e.category
        ORDER BY e.event_title, e.category`,
    )
    .bind(...bind)
    .all<{ event_title: string; category: string; entries: number; fee: number }>();

  return {
    tournament_id: tournamentId ?? null,
    submissions: summary?.submissions ?? 0,
    total_fee: summary?.total_fee ?? 0,
    by_category: byCategory ?? [],
  };
}

/** 取込（フォーム/GAS → Webhook）。submission + entries をまとめて保存。 */
export async function insertSubmission(db: D1Database, payload: any) {
  const submittedAt = payload.submitted_at || new Date().toISOString();
  const teamInfo = payload.team_info ?? {};
  const coaches = Object.values(teamInfo.coaches ?? {}).filter(Boolean);
  const rows: any[] = Array.isArray(payload.rows) ? payload.rows : [];

  const res = await db
    .prepare(
      `INSERT INTO submissions
        (tournament_id, tournament_name, team_name, responsible, phone, coaches, total, submitted_at, raw)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      payload.tournament_id ?? 'unknown',
      payload.tournament_name ?? '',
      teamInfo.team_name ?? '',
      teamInfo.responsible ?? '',
      teamInfo.phone ?? '',
      JSON.stringify(coaches),
      Number(payload.total ?? 0),
      submittedAt,
      JSON.stringify(payload),
    )
    .run();

  const submissionId = res.meta.last_row_id;

  for (const r of rows) {
    const { event_kind, event_id, event_title, category, fee, ...rest } = r;
    await db
      .prepare(
        `INSERT INTO entries
          (submission_id, event_kind, event_id, event_title, category, fee, player)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        submissionId,
        event_kind ?? null,
        event_id ?? null,
        event_title ?? null,
        category ?? null,
        Number(fee ?? 0),
        JSON.stringify(rest),
      )
      .run();
  }

  return { id: submissionId, entries: rows.length };
}

function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}
