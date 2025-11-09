const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production", // 開発時は "development" に変更
  entry: {
    background: "./src/background.ts",
    options: "./src/options.tsx", // Optionsページ用エントリーポイントを追加
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true, // ビルド前にdistフォルダをクリア
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // .tsx を追加
    fallback: {
      url: false,
      util: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts と .tsx 両方に対応
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
  // 開発時のデバッグ用にソースマップを有効化
  devtool: "cheap-module-source-map",
};
