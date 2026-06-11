# 実 Cloudflare デプロイ runbook（内部データAPI基盤）

役員向け内部データAPI（`api/`）を実 Cloudflare 環境にデプロイし、Cloudflare
Access（IdP 認証）で保護するまでの手順です。完了すると、役員は `cloudflared`
ログインだけで CLI / MCP から API にアクセスでき、API キーの配布は不要になります。

- 所要時間: 30〜60 分（ドメインの DNS 反映待ちを除く）
- 費用: 50 ユーザーまで Access 無料 / Workers・D1 も小規模は無料枠内。実費は
  IdP（Google Workspace 等）のみ。
- アーキテクチャ全体は [docs/IDP_API.md](IDP_API.md) を参照。

> 重要: `*.workers.dev` のホスト名には Cloudflare Access を適用できません。
> 自分の Cloudflare アカウントに追加済みのゾーン（例 `example.com`）配下の
> ホスト名（例 `tt-api.example.com`）を Worker に割り当て、それを保護します。

---

## 前提

- Cloudflare アカウントと、そこに追加済みのゾーン（独自ドメイン）が 1 つ。
- Cloudflare Zero Trust（無料プラン可）が有効。
- IdP（Google Workspace 等）の管理権限。
- ローカルに Node.js 18+ / `npx`（`api/` で `npm ci` 済み）。
- 役員のメールアドレス一覧（許可対象）。Workspace ドメイン全体でも個別 Gmail 列挙でも可。

---

## ステップ1: 認証方式を用意（IdP または One-time PIN）

「誰が役員か」の判断をここで決める。小規模なら **One-time PIN** が最も手軽。

### 方式A: One-time PIN（外部IdP不要・推奨）
許可したメールアドレス宛にワンタイムコードを送るだけ。Gmail でも可で、Workspace
契約も OAuth 設定も不要。

1. Zero Trust > **Settings > Authentication > Login methods**。
2. **One-time PIN** が既定で有効になっていることを確認する（無ければ Add で追加）。
3. 許可するアドレスはステップ4 の Access ポリシーで指定する（ここでは設定不要）。

### 方式B: 外部 IdP（Google Workspace 等）
ドメイン単位で許可したい、既存の IdP に寄せたい場合。

1. Zero Trust > **Settings > Authentication > Login methods > Add new**。
2. IdP（例: Google）を追加し OAuth を設定 → **Test** で確認。

このあとの本人確認はすべてこの方式に委ねられる。

---

## ステップ2: D1 データベースを作成しスキーマを適用

```bash
cd api
npx wrangler d1 create tt-data
```
出力された `database_id` を `wrangler.toml` の `[[d1_databases]]` に貼り付ける。

```bash
npm run db:init:remote      # 本番 D1 にスキーマを適用（schema.sql）
```

> 本番にサンプルデータ（`seed.sql`）は投入しない。実データは GAS / フォームからの
> `/ingest` 経由でのみ入る。

---

## ステップ3: カスタムドメインを割り当ててデプロイ

1. `wrangler.toml` の `routes` のコメントを外し、保護したいホスト名に変更する:
   ```toml
   routes = [
     { pattern = "tt-api.example.com", custom_domain = true }
   ]
   ```
   `custom_domain = true` にすると wrangler が DNS レコードと証明書を自動作成する
   （ゾーンが同一アカウントにある場合）。
2. デプロイ:
   ```bash
   npm run deploy
   ```
3. ブラウザで `https://tt-api.example.com/health` を開き、`{"ok":true,...}` が
   返ることを確認する（この時点ではまだ Access 未適用）。

---

## ステップ4: Cloudflare Access アプリを作成

1. Zero Trust > **Access > Applications > Add an application > Self-hosted**。
2. **Application domain**: `tt-api.example.com`（ステップ3 のホスト名）。
3. **Identity providers**: ステップ1 の IdP を有効化。
4. **Policies**: `Allow` ポリシーを作り、許可対象を絞る。
   - Workspace ドメイン全体: Selector = `Emails ending in` → `@example.com`
   - 個別指定: Selector = `Emails` → 役員のアドレスを列挙
5. 保存後、アプリの **Overview** から **Application Audience (AUD) Tag** をコピー。
6. **チームドメイン**は Zero Trust > Settings > Custom Pages（または URL）に表示される
   `your-team.cloudflareaccess.com`。

---

## ステップ5: issuer / AUD を設定して再デプロイ

`wrangler.toml` の `[vars]` を実値にする:
```toml
[vars]
ACCESS_TEAM_DOMAIN = "your-team.cloudflareaccess.com"   # issuer の元
ACCESS_AUD         = "コピーした AUD タグ"                # audience
DEV_BYPASS         = "false"                             # 本番は必ず false
```
再デプロイ:
```bash
npm run deploy
```
オリジン（Worker）はこの issuer / AUD と JWKS（`/cdn-cgi/access/certs`）で
`Cf-Access-Jwt-Assertion` を再検証する（多層防御）。

---

## ステップ6: 取込シークレットと Bypass ポリシー（IdP ログイン不可経路）

`/health`（外形監視）と `/ingest`（フォーム/GAS の Webhook）は人間のブラウザ認証を
行えないため、Access の保護対象から外す。

1. HMAC 署名鍵を設定（`/ingest` の正当性担保）:
   ```bash
   npx wrangler secret put INGEST_HMAC_SECRET
   ```
2. Access アプリに **Bypass** ポリシーを追加し、対象を以下のパスに限定する:
   - `tt-api.example.com/health`
   - `tt-api.example.com/ingest`
   Selector は `Everyone`（Bypass はパスで限定しているため）。
3. これ以外のパス（`/api/*`）は Allow ポリシーのみが通る状態にする。

> `/ingest` は署名が一致しないと 401 を返すため、Bypass でも未署名アクセスは弾かれる。

---

## ステップ7: 動作確認（役員の端末で）

```bash
# CLI を接続先に向ける（既定値が異なる場合）
export TT_API_URL=https://tt-api.example.com

cloudflared access login https://tt-api.example.com   # ブラウザで IdP ログイン
kushiro-tt whoami        # 認証された自分のメールが返れば成功
kushiro-tt annual        # 年間集計（まだ空なら 0 件）
```
- 未許可アカウントでログインすると `/api/*` が 403 になることも確認する。
- `curl https://tt-api.example.com/api/me`（トークンなし）→ Access のログイン画面に
  リダイレクト or 401 になることを確認する。

---

## ステップ8: フォーム/GAS から取込を有効化（任意）

申込データを D1 にも蓄積する場合:
1. `gas/Ingest.gs` を既存の `gas/Code.gs` と同じ Apps Script プロジェクトに追加。
2. スクリプトプロパティに `TT_API_URL`（`https://tt-api.example.com`）と
   `INGEST_HMAC_SECRET`（ステップ6 と同値）を設定。
3. `doPost` 内の `writeSubmission(...)` の直後に `forwardToApi(payload);` を呼ぶ。

これでスプレッドシートと D1 の両方に書き込まれ、役員は CLI / MCP から参照できる。

---

## トラブルシューティング

| 症状 | 原因 / 対処 |
|---|---|
| `/api/*` が常に 401（`missing Cf-Access-Jwt-Assertion`） | Access アプリのドメインが Worker のホスト名と不一致。`Application domain` を確認。 |
| `Access JWT verification failed`（403） | `ACCESS_TEAM_DOMAIN` / `ACCESS_AUD` が誤り。AUD タグを再コピーして再デプロイ。 |
| `whoami` が 403 | ログインアカウントが Allow ポリシーの対象外。IdP の名簿を確認。 |
| `/ingest` が常に 401 | 署名不一致。GAS と Worker の `INGEST_HMAC_SECRET` が同値か確認。 |
| `cloudflared` でブラウザが開かない | `cloudflared access login <URL>` の URL がカスタムドメインか確認。 |

---

## 運用

- **入退社**: IdP の名簿を更新するだけ。Access は認証のたびに IdP を参照するため、
  削除されたユーザは新規トークンを取得できず、既存の短命トークンも失効する。
- **鍵ローテーション**: Access の署名鍵は自動ローテーション。Worker は JWKS から
  都度取得するので対応不要。
- **ロールバック**: `npx wrangler deployments list` / `npx wrangler rollback` で
  直前のデプロイに戻せる。
- **DEV_BYPASS**: 本番では必ず `false`。`true` は手元の `wrangler dev` 専用。
