/**
 * 卓球大会申込フォーム - 受信用 Google Apps Script
 *
 * 【セットアップ手順】
 * 1. Google スプレッドシートを新規作成
 *    （例: 「2026年度 卓球大会 申込受付」）
 * 2. 拡張機能 > Apps Script を開く
 * 3. 既定の Code.gs を全消ししてこのファイルを貼り付け
 * 4. 保存（💾）→ デプロイ > 新しいデプロイ
 *    - 種類: ウェブアプリ
 *    - 説明: 卓球大会申込API
 *    - 次のユーザーとして実行: 自分
 *    - アクセスできるユーザー: 全員
 * 5. 「アクセスを承認」→ 確認後にデプロイ
 * 6. 表示された「ウェブアプリ URL」をコピー
 * 7. tt-form-generator の src/config.js の
 *    GAS_ENDPOINT に貼り付けて再デプロイ
 *
 * 【受信時の動作】
 * - 大会IDごとに専用のタブを自動作成（無ければ新規作成）
 * - 1申込につき 1〜N行を追加（出場種目・人数ぶん）
 * - 「申込一覧」タブにサマリも記録
 *
 * 【更新時】
 * - コード修正後は「デプロイを管理」→ 既存デプロイの「✏ 編集」→
 *   バージョン: 新バージョン → デプロイ
 *   ※ URL は変わりません
 */

const SUMMARY_SHEET = '申込一覧';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const result = writeSubmission(ss, payload);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, ...result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    service: 'tt-form-generator GAS endpoint',
    time: new Date().toISOString(),
  })).setMimeType(ContentService.MimeType.JSON);
}

function writeSubmission(ss, payload) {
  const rows = payload.rows || [];
  const tournamentId = payload.tournament_id || 'unknown';
  const tournamentName = (payload.tournament_name || '').replace(/\n/g, ' ');
  const submittedAt = payload.submitted_at || new Date().toISOString();

  // Per-tournament sheet
  const sheetName = sheetNameFor(tournamentId);
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['申込日時', '大会名', '団体名', '申込責任者', '連絡先',
      '顧問1', '顧問2', '顧問3',
      '種別', '種目', '区分', '参加料',
      'データ（JSON）']);
    sheet.getRange(1, 1, 1, 13)
      .setFontWeight('bold')
      .setBackground('#0f4c81')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  for (const r of rows) {
    sheet.appendRow([
      r.submitted_at || submittedAt,
      r.tournament_name || tournamentName,
      r.team_name || '',
      r.responsible || '',
      r.phone || '',
      r.coach1 || '',
      r.coach2 || '',
      r.coach3 || '',
      r.event_kind || '',
      r.event_title || '',
      r.category || '',
      r.fee || 0,
      JSON.stringify(stripBase(r)),
    ]);
  }

  // Summary sheet (1 row per submission)
  let sum = ss.getSheetByName(SUMMARY_SHEET);
  if (!sum) {
    sum = ss.insertSheet(SUMMARY_SHEET);
    sum.appendRow(['申込日時', '大会ID', '大会名', '団体名', '申込責任者', '連絡先', '件数', '合計参加料']);
    sum.getRange(1, 1, 1, 8)
      .setFontWeight('bold')
      .setBackground('#7c3aed')
      .setFontColor('#ffffff');
    sum.setFrozenRows(1);
  }
  sum.appendRow([
    submittedAt,
    tournamentId,
    tournamentName,
    payload.team_info?.team_name || '',
    payload.team_info?.responsible || '',
    payload.team_info?.phone || '',
    rows.length,
    payload.total || 0,
  ]);

  return { sheet: sheetName, rows: rows.length };
}

function sheetNameFor(tournamentId) {
  // Safe sheet name (max 100 chars, no special chars)
  return String(tournamentId).replace(/[\[\]\\\/\?\*\:]/g, '_').slice(0, 100);
}

function stripBase(row) {
  // Remove base fields already shown in dedicated columns
  const skip = new Set(['submitted_at', 'tournament_id', 'tournament_name',
    'team_name', 'responsible', 'phone',
    'coach1', 'coach2', 'coach3',
    'event_kind', 'event_id', 'event_title', 'category', 'fee']);
  const out = {};
  for (const k in row) if (!skip.has(k)) out[k] = row[k];
  return out;
}
