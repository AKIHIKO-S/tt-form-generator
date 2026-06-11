-- 釧路卓球協会 内部データAPI : D1 スキーマ（業務データの正本）
--
-- 申込（submission）1件に対し、出場種目・付帯（弁当/懇親会）ごとの
-- 明細（entry）が N 件ぶら下がる構造。フォーム→GAS→ingest で書き込み、
-- 役員は Access 認証ごしに CLI / MCP から参照する。

DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS submissions;

CREATE TABLE submissions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id   TEXT    NOT NULL,
  tournament_name TEXT    NOT NULL,
  team_name       TEXT    NOT NULL,
  responsible     TEXT,
  phone           TEXT,
  coaches         TEXT,                 -- JSON 配列（顧問/引率）
  total           INTEGER NOT NULL DEFAULT 0,
  submitted_at    TEXT    NOT NULL,     -- ISO8601
  raw             TEXT                  -- 受信ペイロード全体（JSON）
);

CREATE TABLE entries (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id INTEGER NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  event_kind    TEXT,                   -- 'event' | 'extra'
  event_id      TEXT,
  event_title   TEXT,
  category      TEXT,
  fee           INTEGER NOT NULL DEFAULT 0,
  player        TEXT                    -- 種目固有フィールド（JSON）
);

CREATE INDEX idx_submissions_tournament ON submissions(tournament_id);
CREATE INDEX idx_submissions_submitted  ON submissions(submitted_at);
CREATE INDEX idx_entries_submission     ON entries(submission_id);
