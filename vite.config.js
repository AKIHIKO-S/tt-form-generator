import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pagesでサブパス公開する際のベースパス
// リポジトリ名と同じにしてください
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/tt-form-generator/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2018'
  }
})
