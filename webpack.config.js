const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  devServer: {
    hot: true,
  },
  entry: "./src/index.tsx",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          plugins: [
            isDevelopment && require.resolve("react-refresh/babel"),
          ].filter(Boolean),
        },
        test: /\.(ts|tsx)$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.[fullHash].js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },
  target: "web",
};
