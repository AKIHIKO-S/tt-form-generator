/** 取込 Webhook の HMAC-SHA256 署名検証（テスト可能なよう独立モジュール化）。 */

/** body を秘密鍵で HMAC-SHA256 し、hex 文字列で返す。 */
export async function computeHmacHex(secret: string, body: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(body));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** 長さ・内容を timing-safe に比較する（hex 同士）。 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** 受信した hex 署名が body と秘密鍵に対して正当かを検証する。 */
export async function verifyHmac(secret: string, body: string, hexSig: string): Promise<boolean> {
  const expected = await computeHmacHex(secret, body);
  return timingSafeEqual(expected, hexSig.trim().toLowerCase());
}
