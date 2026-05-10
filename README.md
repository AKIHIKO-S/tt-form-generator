# 🏓 卓球大会 申込フォーム

釧路卓球協会の年間16大会（2025年度版）の **申込フォーム** をブラウザで完結させるツールです。

団体管理者はスマートフォンで一問一答形式のウィザードに回答するだけで、申込が主催者のGoogleスプレッドシートへ自動集計されます。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 公開URL

👉 **[https://akihiko-s.github.io/tt-form-generator/](https://akihiko-s.github.io/tt-form-generator/)**

各大会の直接URL: `?t=<大会ID>` を末尾に付与
（例: `?t=yasaka` = ヤサカ杯）

主催者向け管理画面: `?admin=1`

---

## 📦 内蔵大会テンプレート（16大会）

| 大会 | ID |
|---|---|
| 第6回まりもオープン IN Akan（ラージボール） | `marimo` |
| 会長杯／高校釧根支部オープン | `kaichohai` |
| 国スポ予選（少年の部） | `kokusupo` |
| 第51回ヤサカ杯 | `yasaka` |
| 第54回くしろリーグ | `league54` |
| 釧路選手権（ニッタク杯） | `nittaku` |
| 北海道選手権（カデットの部） | `hokkaido_cadet` |
| 釧路ジュニア選手権 | `junior` |
| 第18回なごやか亭杯 | `nagoyaka` |
| 第4回タンチョウオープン（ラージ） | `tancho` |
| 中学選抜（団体戦） | `chugaku_senbatsu` |
| 中学新人戦（個人戦） | `chugaku_shinjin` |
| 第55回くしろリーグ | `league55` |
| 第45回湿原の風オープン | `shitsugen` |
| ダブルスチームカップ | `doubles_team` |
| ホープス・カブ・バンビ | `hopes` |

各大会ごとに 種目・区分・参加料 が定義済み。

---

## 🚀 機能

- **ウィザード形式の申込フォーム**（スマホ最適化）
- **URLで大会指定可能**（`?t=<id>`）
- **iframe埋め込み対応**（既存サイトに貼り付け可）
- **Google Apps Script → Googleスプレッドシート自動集計**
- **GAS未設定時はメーラー起動（mailto）にフォールバック**
- **主催者向け管理画面**（埋め込みコード一覧）

---

## ⚙️ セットアップ

詳しくは [docs/SETUP.md](docs/SETUP.md) を参照。

ざっくり3ステップ:

1. **Google Apps Script を1回だけデプロイ**
   - `gas/Code.gs` をGoogleスプレッドシートに貼り付け → ウェブアプリとしてデプロイ → URLを取得
2. **`src/config.js` の `GAS_ENDPOINT` にURLを貼り付け**
3. **`npm run build` → `git push`** → GitHub Pagesに反映

GASを使わない場合は、`src/config.js` の `FALLBACK_EMAIL` だけ設定すればメーラー経由で受信できます。

---

## 🛠 ローカル開発

```bash
npm install
npm run dev
```

http://localhost:5173 で開発サーバが起動。

ビルド:
```bash
npm run build      # dist/ に成果物
npm run preview    # ビルド結果をローカルで確認
```

---

## 📝 ライセンス

MIT
