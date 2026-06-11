// シェル非依存のデモ起動スクリプト（zsh/bash どちらでも動く）。
// D1 をリセット＆サンプル投入してから、DEV_BYPASS でローカル起動する。
// 起動後、ブラウザで http://localhost:8787 を開くとダッシュボードが見られる。
import { spawnSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

// npm 経由なら PATH に node_modules/.bin が入るが、直接実行にも備えてローカル優先で解決。
const bin = existsSync('./node_modules/.bin/wrangler') ? './node_modules/.bin/wrangler' : 'wrangler';

function run(args) {
  const r = spawnSync(bin, args, { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log('› D1 をリセットしてサンプルデータを投入します…');
run(['d1', 'execute', 'tt-data', '--local', '--file=./schema.sql']);
run(['d1', 'execute', 'tt-data', '--local', '--file=./seed.sql']);

console.log('\n› デモを起動します。ブラウザで http://localhost:8787 を開いてください。\n');
const child = spawn(
  bin,
  ['dev', '--local', '--port', '8787', '--var', 'DEV_BYPASS:true', '--var', 'INGEST_HMAC_SECRET:demo-secret'],
  { stdio: 'inherit' },
);
child.on('exit', (code) => process.exit(code ?? 0));
