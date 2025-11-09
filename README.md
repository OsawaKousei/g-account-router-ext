# Google Account Router

_[English version](README_EN.md)_

Google サービス(Gmail、YouTube 等)へのアクセス時に、あらかじめ設定したルールに基づいて自動的に指定の Google アカウントに切り替えるブラウザ拡張機能です。

## 🌟 特徴

- **自動アカウント切り替え**: Gmail、YouTube等のGoogleサービスへアクセス時、設定したルールに基づいて自動的に指定アカウントに切り替え
- **直感的なGUI設定画面**: Reactベースの使いやすい設定画面でルールを簡単に管理
- **サポート対象サービス**: 
  - Gmail
  - Google Calendar
  - Google Drive
  - YouTube
  - Google Keep
  - Google Photos
  - Google Meet
  - Google Docs/Sheets/Slides
- **サービス固有の処理**: 各サービスに最適化されたリダイレクト処理
- **ルールの有効/無効切り替え**: 必要に応じてルールを一時的に無効化可能
- **軽量**: シンプルで高速な動作

## 📋 動作環境

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## 🚀 インストール方法

### 開発版（ビルドが必要）

1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/g-account-router-ext.git
cd g-account-router-ext
```

2. 依存関係をインストール

```bash
npm install
```

3. ビルド

```bash
# Chrome/Edge用
npm run build:chrome

# Firefox用
npm run build:firefox
```

4. ブラウザで拡張機能を読み込み

**Chrome/Edge の場合:**

- `chrome://extensions/` または `edge://extensions/` にアクセス
- 「デベロッパーモード」を有効化
- 「パッケージ化されていない拡張機能を読み込む」をクリック
- `dist` フォルダを選択

**Firefox の場合:**

- `about:debugging#/runtime/this-firefox` にアクセス
- 「一時的なアドオンを読み込む」をクリック
- `dist` フォルダ内の `manifest.json` を選択

## 📖 使用方法

### 1. 設定画面を開く

- ブラウザのツールバーで拡張機能アイコンを右クリック
- 「オプション」または「拡張機能のオプション」を選択

### 2. ルールを追加

1. 「新しいルールを追加」ボタンをクリック
2. 以下の情報を入力:
   - **サービス**: 自動切り替えを適用するGoogleサービスを選択（Gmail、Calendar、Drive、YouTube等）
   - **アカウントメールアドレス**: 切り替え先のGoogleアカウントのメールアドレス（例: `user@example.com`）
   - **ラベル（任意）**: ルールの説明（例: 「仕事用Gmail」）
3. 「保存」をクリック

### 3. ルールの管理

- **編集**: 「編集」ボタンをクリックして内容を変更
- **削除**: 「削除」ボタンをクリックしてルールを削除
- **有効/無効切り替え**: 「有効化」/「無効化」ボタンでルールの適用を切り替え

### 4. 自動切り替えを体験

設定した Google サービスにアクセスすると、自動的に指定したアカウントに切り替わります。

## 💡 使用例

### 例1: 仕事用Gmailを常に指定アカウントで開く

- **サービス**: `Gmail`
- **アカウントメールアドレス**: `work@company.com`
- **ラベル**: `仕事用Gmail`

### 例2: YouTubeを個人用アカウントで開く

- **サービス**: `YouTube`
- **アカウントメールアドレス**: `personal@gmail.com`
- **ラベル**: `個人用YouTube`

### 例3: Google Driveを複数のアカウントで使い分ける

- **サービス**: `Google Drive`
- **アカウントメールアドレス**: `work@company.com`
- **ラベル**: `仕事用Drive`

## ❗ 制限事項

- Google アカウントに事前にログインしている必要があります
- 指定したメールアドレスのアカウントでログインしていない場合、リダイレクトが正しく動作しない可能性があります
- 一部の特殊な Google サービスでは動作しない場合があります

## 🐛 トラブルシューティング

### ルールが適用されない場合

1. 設定画面でルールが「有効」になっているか確認
2. サービスが正しく選択されているか確認
3. アカウントメールアドレスが正しいか確認（ログイン済みのアカウントのメールアドレスを使用）
4. ブラウザを再起動してみる

### 設定が保存されない場合

1. ブラウザのストレージ権限が許可されているか確認
2. ブラウザのプライベートモードでは設定が保存されない場合があります

## 📝 開発

### 開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/g-account-router-ext.git
cd g-account-router-ext

# 依存関係をインストール
npm install

# 開発モードでビルド（ファイル変更を監視）
npm run watch

# 本番用ビルド
npm run build

# Chrome/Edge用ビルド
npm run build:chrome

# Firefox用ビルド
npm run build:firefox

# 拡張機能パッケージの作成
npm run package:chrome  # Chrome/Edge用
npm run package:firefox # Firefox用
```

### 技術スタック

- **TypeScript**: 型安全な開発
- **React**: GUIの構築
- **Webpack**: バンドリングとビルド
- **WebExtension Polyfill**: クロスブラウザ対応
- **browser.storage.sync**: ルールの同期ストレージ
- **browser.webNavigation**: ナビゲーションイベントの監視
- **サービス固有処理**: 各Googleサービスに最適化されたURL処理

### ディレクトリ構成

```
g-account-router-ext/
├── dist/                   # ビルド生成物
├── public/
│   ├── manifest.chrome.json  # Chrome用マニフェスト
│   ├── manifest.firefox.json # Firefox用マニフェスト
│   ├── options.html          # 設定画面HTML
│   └── icons/                # アイコン画像
├── src/
│   ├── background.ts         # Service Worker (ルール適用)
│   ├── options.tsx           # 設定画面 (React)
│   ├── logic/
│   │   ├── services.ts       # サポート対象サービス定義
│   │   ├── router-rules.ts   # ルール判定ロジック
│   │   └── storage.ts        # ストレージ操作
│   └── components/
│       └── RuleEditor.tsx    # ルール編集コンポーネント
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## 📄 ライセンス

ISC License

## 🙏 謝辞

- [React](https://react.dev/) - UI ライブラリ
- [WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill) - クロスブラウザ対応

---
