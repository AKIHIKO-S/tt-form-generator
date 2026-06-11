/**
 * 内部データAPI（Cloudflare Workers + D1）への取込ブリッジ。
 *
 * 既存の doPost（スプレッドシート書込）に加えて、申込ペイロードを
 * D1 の /ingest エンドポイントへも転送し、業務データの正本を一元化する。
 *
 * 【前提】
 *  - /ingest は Cloudflare Access の Bypass ポリシー対象（IdP ログイン不可経路）
 *  - 正当性は HMAC-SHA256 署名で担保する
 *
 * 【セットアップ】
 *  スクリプトのプロパティに次を設定（プロジェクトの設定 > スクリプト プロパティ）:
 *    TT_API_URL        : https://tt-data-api.kushiro-tt.workers.dev
 *    INGEST_HMAC_SECRET: wrangler secret put したものと同じ値
 *
 *  既存 Code.gs の doPost 内で writeSubmission(...) の直後に
 *    forwardToApi(payload);
 *  を呼べば、スプレッドシートと D1 の両方へ書き込まれる。
 */

function forwardToApi(payload) {
  const props = PropertiesService.getScriptProperties();
  const url = props.getProperty('TT_API_URL');
  const secret = props.getProperty('INGEST_HMAC_SECRET');
  if (!url || !secret) return; // 未設定なら何もしない（スプレッドシートのみ運用）

  const body = JSON.stringify(payload);
  const sigBytes = Utilities.computeHmacSha256Signature(body, secret);
  const signature = sigBytes
    .map(function (b) {
      const v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? '0' + v : v;
    })
    .join('');

  UrlFetchApp.fetch(url + '/ingest', {
    method: 'post',
    contentType: 'application/json',
    payload: body,
    headers: { 'X-Signature': signature },
    muteHttpExceptions: true,
  });
}
