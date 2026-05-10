# セットアップガイド

団体管理者がスマホで申込 → 主催者のGoogleスプレッドシートに自動集計、という運用を作るまでの手順です。

## 全体の流れ

```
[団体管理者]                            [GitHub Pages]                [Google Apps Script]            [Googleスプレッドシート]
スマホで                ───── 開く ─────▶  tt-form-generator
ウィザード回答          ──── 申込送信 ───▶  ［POST］                ───── 書込 ─────▶  各大会のタブに蓄積
```

---

## ステップ1: スプレッドシートとGASを準備（1回だけ）

1. [Google Drive](https://drive.google.com/) で **空のスプレッドシート** を新規作成
   - 例: `2026年度 卓球大会 申込受付`
2. シート上部メニューから **拡張機能 > Apps Script** を開く
3. 既定の `Code.gs` を全選択して削除
4. このリポジトリの [`gas/Code.gs`](../gas/Code.gs) の中身を **そのままコピペ**
5. 💾 で保存（ファイル名はそのまま `Code.gs` でOK）
6. 右上 **デプロイ > 新しいデプロイ** をクリック
   - 種類: **ウェブアプリ**
   - 説明: `卓球大会申込API`（任意）
   - 次のユーザーとして実行: **自分（あなたのGoogleアカウント）**
   - アクセスできるユーザー: **全員**
7. 「デプロイ」→ 初回はアクセス承認画面が出るので承認
8. 表示された **ウェブアプリ URL** をコピー
   - 形式: `https://script.google.com/macros/s/AKfycb.../exec`

> ⚠ コード更新時は **デプロイを管理 → 既存デプロイの「✏ 編集」→ バージョン: 新しいバージョン → デプロイ** で再デプロイしてください。URLは変わりません。

---

## ステップ2: tt-form-generator の設定

1. このリポジトリをクローン or フォーク
2. `src/config.js` を編集:
   ```js
   export const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycb.../exec';
   export const FALLBACK_EMAIL = 'your-email@example.com';
   export const ORGANIZER_NAME = '釧路卓球協会';
   ```
3. コミットしてpush

```bash
git add src/config.js
git commit -m "Configure GAS endpoint"
git push
```

GitHub Actions が自動でGitHub Pagesにデプロイします（数分）。

---

## ステップ3: 各大会の申込URLを取得

GitHub Pages にデプロイ後、ブラウザで以下を開く:

```
https://<あなたのユーザー名>.github.io/tt-form-generator/?admin=1
```

各大会の **直接URL** と **iframe埋め込みコード** をコピーできます。

例:
```html
<iframe src="https://akihiko-s.github.io/tt-form-generator/?t=yasaka" width="100%" height="900" style="border:0" loading="lazy"></iframe>
```

これを大会案内のWebページに貼り付けるだけで、ページ内で申込が完結します。

---

## 動作テスト

1. `?t=yasaka` などの大会URLを開く
2. 適当に団体名・選手を入力して「申込を送信」
3. Googleスプレッドシートを開いて確認
   - `yasaka` タブに行が追加される
   - `申込一覧` タブにサマリが1行追加される

---

## トラブルシューティング

### 「送信エラー: HTTP 404」が出る
- GASのウェブアプリURLが間違っている可能性
- `src/config.js` の `GAS_ENDPOINT` を見直し（末尾は `/exec`）

### 「送信エラー」のままで原因不明
- ブラウザの開発者ツール（Console）にエラー詳細
- GASエディタで「実行数」から過去の実行ログを確認

### CORSエラー
- このリポジトリのGASコードは `text/plain` で受け取りプリフライトを回避済み
- それでも出る場合はGASを再デプロイ（新しいバージョン）

### メールが届かない（mailto運用時）
- 一部環境（特にiPhone）でmailtoが標準メーラーを呼ばないことがある
- GAS方式への切替を推奨

---

## ファイル構成

```
tt-form-generator/
├── src/
│   ├── App.jsx              # ウィザードUI
│   ├── config.js            # ★ あなたが編集する設定ファイル
│   ├── data/tournaments.js  # 16大会のメタデータ
│   └── lib/submit.js        # 送信ロジック
├── gas/Code.gs              # ★ GASに貼り付けるコード
├── docs/SETUP.md            # このファイル
└── README.md
```
