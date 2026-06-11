/**
 * 接続先 API の URL。CLI に既定値を持たせ、通常は設定不要。
 * 別環境に向けるときだけ環境変数 TT_API_URL で上書きする。
 */
export const API_URL =
  process.env.TT_API_URL?.replace(/\/+$/, '') || 'https://tt-data-api.kushiro-tt.workers.dev';

/** cloudflared が access token を取得する対象アプリ URL（= API_URL）。 */
export const ACCESS_APP_URL = API_URL;
