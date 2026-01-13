# 翌日納品オーダーポータル

撮影の翌日に写真を納品するための、クライアント専用発注ポータルサイトです。

## 機能
- **簡単発注**: 撮影IDと連絡先を入力するだけで発注完了。
- **スプレッドシート連携**: 全ての発注データは Google Apps Script (GAS) を通じてスプレッドシートへ自動記録。
- **自動返信メール**: 発注完了後、クライアントへ確認メールを自動送信。
- **モダンなUI**: Tailwind CSS を使用した清潔感のあるプロフェッショナルなデザイン。

## デプロイ方法 (Cloudflare Pages)

1. GitHub にこのリポジトリをプッシュします。
2. Cloudflare Pages でプロジェクトを作成し、リポジトリを連携します。
3. ビルド設定で「フレームワークプリセット」に **Vite** を選択してデプロイします。

## スプレッドシート & GAS 設定
データは以下のスプレッドシートに蓄積されます：
`https://docs.google.com/spreadsheets/d/1pWRJBH21s0uLqXL9OkZH7KpAUZvz_JNB-_VJpvRELNM/`

連携用GAS URL:
`https://script.google.com/macros/s/AKfycbyMYLVLOxJGNIT8t5rWXK_0qYsOQsgBznVqgBip2tA6SjOP604C9DneKzVBBnQ_3Jeg2g/exec`

※GASをデプロイする際は、アクセス権限を「全員（Anyone）」に設定してください。