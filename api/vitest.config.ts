import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

// Workers ランタイム（workerd）上でテストを実行し、D1 バインディングを
// 実際に使う。wrangler.toml の D1 設定を再利用する。
export default defineWorkersConfig({
  // ルートの Tailwind PostCSS 設定を拾わないよう明示的に無効化する。
  css: { postcss: { plugins: [] } },
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.toml' },
        miniflare: {
          // テスト用の D1。スキーマは beforeAll で適用する。
          d1Databases: { DB: 'test-db' },
        },
      },
    },
  },
});
