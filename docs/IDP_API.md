# 釧路卓球協会 内部データAPI 基盤（IdP 認証 × CLI/MCP 共有）

役員・運営が、申込データなどの業務情報を **人間も AI も同じ認証で** 参照できる
内部API基盤のプロトタイプです。API キーを配布せず、API 自体を
Cloudflare Access（IdP 認証）で保護し、その認証を CLI と MCP で共有します。

> 公開の申込フォーム（GitHub Pages）はこれまで通り誰でも使えます。本基盤が
> 保護するのは **集約された業務データ（申込の正本）への参照経路** だけです。

## 全体構成

```
                         ┌──────────────────────────────┐
  公開フォーム ──申込──▶  │ Google Apps Script           │
  (GitHub Pages)         │  ├ スプレッドシート書込        │
                         │  └ /ingest へ転送 (HMAC署名)   │
                         └──────────────┬───────────────┘
                                        ▼
   役員(人間)         AI ホスト                  ┌───────── Cloudflare ─────────┐
   ターミナル         (Claude/Codex)             │  Access(エッジ, IdP認証)      │
      │                  │                       │      │ Cf-Access-Jwt-Assertion │
   ┌──┴──┐  cloudflared  │ stdio/JSON-RPC        │      ▼                        │
   │ CLI │◀─token cache─▶│                       │  Workers (API/保護対象)       │
   │     │───────────────┴──cf-access-token────▶ │   └ JWKS で JWT 再検証 ──▶ D1  │
   └─────┘   同一バイナリ(`kushiro-tt mcp`)        └──────────────────────────────┘
```

- **API（保護対象）**: Cloudflare Workers + D1。業務データの正本。`api/`
- **CLI**: 人間も、シェルを扱う AI エージェントも同じコマンドを実行。`cli/`
- **MCP サーバ**: CLI と同一バイナリ（`kushiro-tt mcp`）。AI ホスト向け入口。

CLI と MCP は認証・通信・データアクセスをすべて共有します。違うのは公開する
操作範囲だけ（MCP は参照系のみ）。

## 認証の流れ

1. `kushiro-tt login` → cloudflared がブラウザを開き IdP 認証 → 短命 JWT をキャッシュ
2. API 呼び出し時、CLI は JWT を `cf-access-token` ヘッダで送る（秘密情報は持たない）
3. エッジ（Access）が JWT を検証し、通過したら `Cf-Access-Jwt-Assertion` を付与して転送
4. オリジン（Workers）が JWKS（`/cdn-cgi/access/certs`）で **再検証**（issuer + AUD 一致）
5. 検証に成功したリクエストだけが本処理に到達

「誰が役員か」は IdP に一元化。退会＝IdP から外すだけで CLI/MCP/API すべて即失効。

## セットアップ（概要）

> 実環境への手順は [DEPLOY.md](DEPLOY.md) に詳述（カスタムドメイン・Access アプリ
> 作成・Bypass ポリシー・動作確認まで）。以下は要点のみ。

### 1. Cloudflare Access
- IdP（Google 等）を Zero Trust に連携（Gmail 個別アドレスの許可リストでも可）
- Self-hosted Application を作成し、Workers の URL を保護対象に設定
- アクセスポリシー: 役員のメールアドレス/グループを許可
- `/health` と `/ingest` は **Bypass ポリシー** で認証対象から除外

### 2. API（`api/`）
```bash
cd api
npm install
npx wrangler d1 create tt-data          # 出力の database_id を wrangler.toml へ
npm run db:init:remote                   # スキーマ適用
# wrangler.toml の ACCESS_TEAM_DOMAIN / ACCESS_AUD を実値に
npx wrangler secret put INGEST_HMAC_SECRET
npm run deploy
```
ローカル開発:
```bash
npm run db:init && npm run db:seed
DEV_BYPASS=true npm run dev              # Access 検証をバイパス（本番厳禁）
```

### 3. CLI / MCP（`cli/`）
```bash
cd cli
npm install
npm run build                            # dist/index.js（単一バイナリ）
```
配布は GitHub Packages。`cli-vX.Y.Z` タグの push で `.github/workflows/publish-cli.yml`
が publish。利用者は Org メンバーのトークンで取得（`.npmrc.example` 参照）:
```bash
export NODE_AUTH_TOKEN=$(gh auth token)
npm install -g @kushiro-tt/cli
kushiro-tt login
kushiro-tt tournaments
kushiro-tt annual --year 2025      # 年度の大会別・団体別集計
kushiro-tt teams                   # 団体一覧
kushiro-tt team 釧路第一中学校      # 特定団体の申込（全大会横断）
```
MCP は AI ホストの設定に登録（`cli/mcp.example.json`）。

## API エンドポイント

| メソッド | パス | 保護 | 用途 |
|---|---|---|---|
| GET | `/health` | Bypass | ヘルスチェック（機密なし） |
| POST | `/ingest` | Bypass + HMAC | フォーム/GAS からの取込 |
| GET | `/api/me` | Access | 認証された身元 |
| GET | `/api/tournaments` | Access | 大会一覧（件数・合計） |
| GET | `/api/submissions` | Access | 申込一覧（`?tournament=`） |
| GET | `/api/submissions/:id` | Access | 申込詳細（明細つき） |
| GET | `/api/stats` | Access | 大会別集計（区分別内訳） |
| GET | `/api/annual` | Access | 年間集計（`?year=`/`?from=&to=`、大会別・団体別） |
| GET | `/api/teams` | Access | 団体一覧（件数・合計） |
| GET | `/api/team` | Access | 団体別の申込（`?name=` 必須、期間絞り込み可） |

`?year=2025` は年度（2025-04〜2026-03）。`from`/`to` 明示時はそれを優先、いずれも
無ければ全期間。

## セキュリティ境界

- 本体の境界は **Cloudflare Access（IdP 認証）**。CLI バイナリは秘密情報を含まず、
  流出しても IdP 認証を通らなければ API に到達できない。
- GitHub Packages の非公開化は「無関係な人が入手する入口を一段減らす」補助層。
- 結果として境界は二重（配布=Org メンバーシップ / 実行=IdP 認証）。退会で両方失効。

## 注意

- `DEV_BYPASS=true` と `INGEST` のローカル運用は **本番に絶対持ち込まない**。
- MCP に公開するのは参照系のみ。AI からデータを変更できないことを設計で保証する。
