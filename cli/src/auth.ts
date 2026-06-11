import { spawn } from 'node:child_process';
import { ACCESS_APP_URL } from './config.js';

/**
 * 認証トークンの取得は cloudflared に肩代わりさせる。
 * CLI 自身は秘密情報（鍵やパスワード）を一切持たない。
 *
 *   - login(): ブラウザを開いて IdP 認証 → JWT を cloudflared がキャッシュ
 *   - getToken(): キャッシュ済みの短命 JWT を取り出す
 */

function run(args: string[], opts: { inheritStdio?: boolean } = {}): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn('cloudflared', args, {
      stdio: opts.inheritStdio ? 'inherit' : ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (d) => (stdout += d.toString()));
    child.stderr?.on('data', (d) => (stderr += d.toString()));
    child.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'ENOENT') {
        reject(
          new Error(
            'cloudflared が見つかりません。インストールしてください: https://developers.cloudflare.com/cloudflared/',
          ),
        );
      } else {
        reject(err);
      }
    });
    child.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });
}

/** ブラウザを開いて IdP ログイン。トークンは cloudflared がキャッシュする。 */
export async function login(): Promise<void> {
  const { code } = await run(['access', 'login', ACCESS_APP_URL], { inheritStdio: true });
  if (code !== 0) throw new Error('ログインに失敗しました');
}

/**
 * キャッシュ済みの短命 JWT を取得。未ログイン・cloudflared 未導入なら null。
 * （トークンが必要かどうかは API 側の応答で決まる。401/403 を受けた時点で
 *   client が login() を呼び、そこで未導入なら導入手順を表示する。）
 */
export async function getToken(): Promise<string | null> {
  try {
    const { code, stdout } = await run(['access', 'token', '--app', ACCESS_APP_URL]);
    const token = stdout.trim();
    if (code !== 0 || !token || token.includes('Unable to find token')) return null;
    return token;
  } catch {
    return null;
  }
}
