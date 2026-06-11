import { defineConfig } from 'tsup';

// CLI / MCP を単一の実行ファイルにバンドルする。
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  platform: 'node',
  target: 'node18',
  bundle: true,
  clean: true,
  outDir: 'dist',
  banner: { js: '#!/usr/bin/env node' },
});
