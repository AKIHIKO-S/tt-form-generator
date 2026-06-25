# Content Ops — SNS・Web発信の運用チーム

オーナー（あなた）の **X / Instagram / Webサイト・ブログ** 発信と、その収益化（**note導線・販売設計**）を、
6人のAI担当からなる「運用チーム」で回すための一式です。
**あなたの仕事は最終判断だけ。** 企画・調査・執筆・導線設計・進行管理はチームが担います。

## チーム構成（6担当）

| 担当 | 役割 | 呼び出すエージェント |
|---|---|---|
| 戦略責任者 | 発信方針・方向性の設計 | `strategy-lead` |
| リサーチ担当 | 競合分析・市場調査 | `researcher` |
| 企画担当 | 投稿企画・ネタ出し | `planner` |
| 編集担当 | 投稿作成・改善提案 | `editor` |
| マーケティング担当 | note導線・販売設計 | `marketer` |
| 秘書担当 | タスク管理・進行管理 | `secretary` |

## ディレクトリ構成

```
content-ops/
├── README.md                 ← このファイル
├── agents-source/            ← エージェント定義の原本（Git管理対象）
│   ├── strategy-lead.md
│   ├── researcher.md
│   ├── planner.md
│   ├── editor.md
│   ├── marketer.md
│   └── secretary.md
├── playbook/                 ← 役割詳細・運用フロー・カレンダー・傾向分析
│   ├── 00-overview.md
│   ├── 01-strategy.md
│   ├── 02-research.md
│   ├── 03-planning.md
│   ├── 04-editing.md
│   ├── 05-marketing.md
│   ├── 06-secretary.md
│   ├── weekly-workflow.md
│   ├── content-calendar.md
│   └── tendency-analysis.md  ← あなたの投稿傾向の分析（要サンプル投入）
└── templates/                ← 媒体別の投稿テンプレ
    ├── post-x.md
    ├── post-instagram.md
    └── post-note.md
```

## セットアップ（エージェントを有効化する）

このリポジトリでは `.claude/` が `.gitignore` 対象のため、エージェント定義の**原本は `agents-source/` にコミット**し、
利用時に `.claude/agents/` へコピーして有効化します。

```bash
# リポジトリ直下で実行
mkdir -p .claude/agents
cp content-ops/agents-source/*.md .claude/agents/
```

コピー後、Claude Code で `/agents` を実行すると6体が一覧に表示されます。
（原本を更新したら、再度コピーしてください。）

## 使い方

### パターンA: 秘書にお任せ（推奨）
```
@secretary 今週のサイクルを回して。決裁パケットを出して。
```
秘書が strategy→research→planning→editing→marketing を順に動かし、
あなたが数分で判断できる「決裁パケット」にまとめて提示します。

### パターンB: 担当を個別に呼ぶ
```
@strategy-lead 今四半期の発信方針を設計して
@researcher 競合の伸びている投稿の型を調べて
@planner 今週のX用ネタを10本出して
@editor この企画をX用に2案書いて
@marketer このnoteの販売導線を設計して
```

## 現状（2026-06-25）
- **投稿傾向の分析: 完了**（サンプル5件 → `playbook/tendency-analysis.md`）。軸足は「写真作品」。
- **発信方針: 初稿ドラフトあり**（`playbook/01-strategy.md`）。柱4本＋収益3本立て。要オーナー承認。
- **収益ファネル: 初稿あり**（`playbook/05-marketing.md`）。撮影術note / プリント販売 / 法人撮影依頼。
- 卓球（釧路卓球協会）の発信は**対象外（別運用）**。

## 次にやること
1. 上記セットアップでエージェントを有効化（`cp content-ops/agents-source/*.md .claude/agents/`）。
2. `@strategy-lead この方針を詰めて` で発信方針を確定。
3. `@secretary 今週のサイクルを回して` で初回サイクル → 決裁パケットを受け取る。

> **原則**: 公開・予約投稿は必ずあなたの承認後。チームは勝手に発信しません。
