// テスト用の型補助。cloudflare:test の env を Worker の Env で型付けし、
// ?raw でのSQL読み込みを許可する。
import type { Env } from '../src/index';

declare module 'cloudflare:test' {
  interface ProvidedEnv extends Env {}
}

declare module '*.sql?raw' {
  const content: string;
  export default content;
}
