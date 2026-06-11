import { defineConfig } from 'vitest/config';

export default defineConfig({
  // ルートの Tailwind PostCSS 設定を拾わないようにする。
  css: { postcss: { plugins: [] } },
  test: { environment: 'node' },
});
