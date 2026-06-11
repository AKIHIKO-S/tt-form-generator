-- ローカル開発用のサンプルデータ（実データではない）

INSERT INTO submissions (tournament_id, tournament_name, team_name, responsible, phone, coaches, total, submitted_at, raw)
VALUES
  ('yasaka', '第51回ヤサカ杯', '釧路第一中学校', '山田太郎', '090-1111-2222', '["佐藤先生","鈴木先生"]', 3000, '2026-05-01T09:12:00.000Z', '{}'),
  ('yasaka', '第51回ヤサカ杯', '釧路東高校',     '田中花子', '090-3333-4444', '["高橋先生"]',          4500, '2026-05-02T14:30:00.000Z', '{}'),
  ('league54', '第54回くしろリーグ', '湿原クラブ', '伊藤次郎', '090-5555-6666', '[]',                 6000, '2026-05-03T10:05:00.000Z', '{}');

INSERT INTO entries (submission_id, event_kind, event_id, event_title, category, fee, player)
VALUES
  (1, 'event', 'singles', '男子シングルス', '中学生', 1500, '{"name":"山田一郎","grade":"2年"}'),
  (1, 'event', 'singles', '男子シングルス', '中学生', 1500, '{"name":"山田二郎","grade":"1年"}'),
  (2, 'event', 'singles', '女子シングルス', '高校生', 1500, '{"name":"田中桜","grade":"2年"}'),
  (2, 'event', 'doubles', '女子ダブルス',   '高校生', 3000, '{"name":"田中桜・佐々木梅"}'),
  (3, 'event', 'team',    '団体戦',         '一般',   6000, '{"name":"湿原クラブA"}');
