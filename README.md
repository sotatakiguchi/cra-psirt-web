# CRA PSIRT Web

Angular ベースの管理ダッシュボードアプリケーションです。システム、サーバー、ミドルウェア、アプリケーションの詳細を一覧表示・編集・保存できます。

## Overview

このプロジェクトは、システムと関連リソースの管理を支援するダッシュボードです。Angular と Material Design を使用し、ローカル JSON からデータを読み込み、一覧・詳細・編集を行います。

## Features

- システム一覧の表示
- サーバー、ミドルウェア、アプリケーションの管理
- 詳細ダイアログによる更新・作成
- 編集時の変更箇所ハイライト表示
- ローカルストレージへの保存
- レスポンシブ UI

## Prerequisites

- Node.js (v14 以上)
- npm (v6 以上)

## Installation

1. リポジトリをクローンします:
```bash
git clone <repository-url>
```

2. プロジェクトディレクトリに移動します:
```bash
cd cra-psirt-web
```

3. 依存関係をインストールします:
```bash
npm install
```

## Development

開発用サーバーを起動します:
```bash
ng serve
```

ブラウザで `http://localhost:4200/` にアクセスしてください。ソースを変更すると自動的にリロードされます。

## Building

本番ビルドを作成します:
```bash
ng build
```

生成物は `dist/` に出力されます。

## Testing

### Unit Tests

ユニットテストを実行します:
```bash
ng test
```

### End-to-End Tests

E2E テストを実行します:
```bash
ng e2e
```

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── features/
│   │   │   ├── systems/
│   │   │   │   ├── system-detail.page.ts
│   │   │   │   ├── system-detail-dialog.component.ts
│   │   │   │   └── system-detail-dialog.component.html
│   │   │   └── ...
│   ├── shared/
│   └── assets/
├── assets/
│   └── data/
├── index.html
└── styles.scss
```

## Components

### System Detail Component
システムに紐づくサーバー / ミドルウェア / アプリケーションを編集するための詳細画面です。

### System Detail Dialog Component
行単位での更新・作成が可能で、編集したフィールドを青色でハイライト表示します。

## Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -m 'Add your feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

## License

このプロジェクトのライセンス情報は LICENSE ファイルを参照してください。

## Support

問題や質問がある場合は、リポジトリの issue を作成してください。
