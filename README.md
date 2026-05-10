# 🏓 卓球大会 申込フォーム生成ツール

エクセル集計表を、**Webフォーム + Googleスプレッドシート自動集計 + 領収書発行** に置き換える生成ツールです。

設問に答えるだけで、申込フォーム（HTML）と Google Apps Script（GAS）が一括生成されます。

[![Deploy](https://github.com/YOUR_USERNAME/tt-form-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/tt-form-generator/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 デモ・公開URL

👉 **[https://YOUR_USERNAME.github.io/tt-form-generator/](https://YOUR_USERNAME.github.io/tt-form-generator/)**

---

## ✨ 主な機能

### 🎯 3つの大会テンプレート内蔵

| テンプレート | 構成 |
|---|---|
| 🏆 **会長杯/高校釧根支部オープン** | 14カテゴリ（団体3部×男女＋シングルス4部×男女） |
| 🏃 **国スポ予選（少年の部）** | シングルス男女2区分・500円固定 |
| 🏓 **ヤサカ杯** | シングルス8区分＋ダブルス7区分（ミックス含む） |

### 📋 自動生成されるシステム

- **Webフォーム HTML** — Jimdo・WordPressなどに貼付け可能
- **Google Apps Script** — スプレッドシートに貼付けるだけで動作

### 🤖 GAS の自動運営機能

- 📥 **申込データ受信** — フォーム送信を自動保存
- 📊 **集計表自動生成** — エクセルの「団体名 × 種目」クロス集計を再現
- 📝 **選手名簿自動生成** — 全選手を一覧化
- 🔍 **重複チェック** — 同一選手の複数登録を検出
- 🧾 **領収書一括作成** — チームごとに自動集計して発行
- 📝 **任意領収書発行** — 金額・宛名を自由入力で発行
- ✉️ **確認メール送信** — 申込者へ自動返信

---

## 🚀 自分のGitHubで公開する手順

### Step 1: このリポジトリを Use this template

1. GitHubで `Use this template` をクリック
2. 自分のリポジトリ名を `tt-form-generator` で作成

### Step 2: GitHub Pages を有効化

1. リポジトリの **Settings** → **Pages**
2. **Source** を `GitHub Actions` に設定

### Step 3: 設定を書き換え

`vite.config.js` の `base` を、自分のリポジトリ名に変更：

```js
base: process.env.GITHUB_PAGES === 'true' ? '/your-repo-name/' : '/',
```

`package.json` の `homepage` も書き換え：

```json
"homepage": "https://your-username.github.io/your-repo-name/"
```

### Step 4: プッシュ

`main` ブランチに push すると、自動で GitHub Pages にデプロイされます。

---

## 💻 ローカル開発

```bash
# クローン
git clone https://github.com/YOUR_USERNAME/tt-form-generator.git
cd tt-form-generator

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
# → http://localhost:5173 でアクセス

# 本番ビルド
npm run build

# ビルドプレビュー
npm run preview
```

---

## 🛠️ 生成されたフォームの設置

1. **ツールでHTMLとGASコードを生成** → ダウンロード
2. **Googleスプレッドシート**を新規作成
3. **拡張機能 → Apps Script** に GASコードを貼付け
4. `initializeSystem()` を実行（初回のみ・権限承認が必要）
5. **デプロイ → ウェブアプリ** で URL を発行
6. ダウンロードした `form.html` の `YOUR_GAS_WEB_APP_URL_HERE` を発行URLに置換
7. WebサイトのHTMLウィジェットに `form.html` の内容を貼付け

詳細は生成ツール内の「設置手順」タブをご覧ください。

---

## 📂 プロジェクト構成

```
tt-form-generator/
├── src/
│   ├── App.jsx          # メインコンポーネント
│   ├── main.jsx
│   └── index.css
├── public/              # 静的ファイル
├── .github/workflows/
│   └── deploy.yml       # GitHub Pages 自動デプロイ
├── docs/                # ドキュメント
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🎨 カスタマイズ

### テンプレートを追加する

`src/App.jsx` の `TEMPLATES` オブジェクトに、新しいテンプレートを追加できます：

```jsx
const TEMPLATES = {
  // ...既存テンプレート

  myTemplate: {
    name: '自分の大会',
    description: '説明',
    config: {
      title: '大会名',
      organizer: '主催団体',
      // ...
    },
    categories: [
      { id: 1, type: 'singles', division: '一般', gender: 'male', fee: 1000, enabled: true },
      // ...
    ]
  }
};
```

### テーマカラーを追加する

`themes` オブジェクトにエントリを追加：

```jsx
const themes = {
  // ...
  myTheme: { primary: '...', secondary: '...', accent: '...', name: 'My Theme' }
};
```

---

## 🛡️ ライセンス

MIT License

---

## 🙏 謝辞

このツールは [釧路卓球協会](https://kushiro-tta.example.com/) の運営DXのために開発されました。

ご意見・改善要望は [Issues](https://github.com/YOUR_USERNAME/tt-form-generator/issues) へお願いします。

---

Made with ❤️ for tournament organizers in Japan.
