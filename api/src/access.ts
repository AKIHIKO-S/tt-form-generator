import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';

/**
 * Cloudflare Access（IdP 認証）の二段階検証のうち、オリジン側の再検証。
 *
 * エッジ（Cloudflare Access）が IdP でログイン済みのリクエストだけを通し、
 * オリジン向けに `Cf-Access-Jwt-Assertion` ヘッダを付与して転送する。
 * ここではそのヘッダの JWT を、Access が公開する JWKS で再検証する。
 *
 * 多層防御のため、Access を経由せずオリジンに直接到達したリクエスト
 * （ヘッダ無し・署名不正・issuer/AUD 不一致）は確実に弾く。
 * 鍵は定期ローテーションされるので公開鍵は固定で持たず JWKS から都度取得する。
 */

export interface Identity {
  /** 認証された利用者のメールアドレス（IdP 由来） */
  email: string;
  /** Access の主体識別子（sub クレーム） */
  sub: string;
  /** ローカル開発バイパスで発行した擬似 ID かどうか */
  dev: boolean;
}

export interface AccessConfig {
  teamDomain: string; // 例: kushiro-tt.cloudflareaccess.com
  aud: string; // アプリ固有の Application Audience
  devBypass: boolean;
}

const ACCESS_JWT_HEADER = 'Cf-Access-Jwt-Assertion';

// JWKS セットは team ドメインごとに 1 つ。jose が内部で鍵をキャッシュ＆
// ローテーションに追従するため、モジュールレベルで使い回す。
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function getJwks(teamDomain: string) {
  let jwks = jwksCache.get(teamDomain);
  if (!jwks) {
    const url = new URL(`https://${teamDomain}/cdn-cgi/access/certs`);
    jwks = createRemoteJWKSet(url);
    jwksCache.set(teamDomain, jwks);
  }
  return jwks;
}

export class AccessError extends Error {
  constructor(public status: 401 | 403, message: string) {
    super(message);
  }
}

/**
 * リクエストを検証し、認証済みの身元を返す。失敗時は AccessError を投げる。
 */
export async function verifyAccess(
  req: Request,
  cfg: AccessConfig,
): Promise<Identity> {
  // ローカル開発のみのバイパス経路。本番には絶対に持ち込まない。
  if (cfg.devBypass) {
    return { email: 'dev@localhost', sub: 'dev', dev: true };
  }

  const token = req.headers.get(ACCESS_JWT_HEADER);
  if (!token) {
    throw new AccessError(
      401,
      `missing ${ACCESS_JWT_HEADER} header — request did not pass through Cloudflare Access`,
    );
  }

  const issuer = `https://${cfg.teamDomain}`;
  let payload: JWTPayload;
  try {
    const result = await jwtVerify(token, getJwks(cfg.teamDomain), {
      issuer,
      audience: cfg.aud,
    });
    payload = result.payload;
  } catch (err) {
    throw new AccessError(403, `Access JWT verification failed: ${String(err)}`);
  }

  const email = typeof payload.email === 'string' ? payload.email : '';
  if (!email) {
    throw new AccessError(403, 'Access JWT has no email claim');
  }

  return { email, sub: String(payload.sub ?? ''), dev: false };
}
