import { API_URL } from './config.js';
import { getToken, login } from './auth.js';

/**
 * API クライアント。取得済み JWT を cf-access-token ヘッダに載せて呼ぶ。
 * 401/403 を受けたら一度だけ再ログインして再試行する（遅延認証）。
 */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function call<T>(path: string, retried = false): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${API_URL}${path}`, {
    headers: token ? { 'cf-access-token': token } : {},
  });

  if ((res.status === 401 || res.status === 403) && !retried) {
    // トークン切れ or 未ログイン → 一度だけ取り直して再試行
    await login();
    return call<T>(path, true);
  }

  const body = (await res.json().catch(() => ({}))) as any;
  if (!res.ok || body.ok === false) {
    throw new ApiError(res.status, body.error || `HTTP ${res.status}`);
  }
  return body as T;
}

export const api = {
  me: () => call<{ email: string; sub: string; dev: boolean }>('/api/me'),
  tournaments: () =>
    call<{ tournaments: any[] }>('/api/tournaments').then((r) => r.tournaments),
  submissions: (tournament?: string, limit?: number) => {
    const q = new URLSearchParams();
    if (tournament) q.set('tournament', tournament);
    if (limit) q.set('limit', String(limit));
    const qs = q.toString();
    return call<{ submissions: any[] }>(`/api/submissions${qs ? `?${qs}` : ''}`).then(
      (r) => r.submissions,
    );
  },
  submission: (id: number) =>
    call<{ submission: any }>(`/api/submissions/${id}`).then((r) => r.submission),
  stats: (tournament?: string) => {
    const qs = tournament ? `?tournament=${encodeURIComponent(tournament)}` : '';
    return call<{ stats: any }>(`/api/stats${qs}`).then((r) => r.stats);
  },
};
