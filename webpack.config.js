const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: "babel-loader",
        options: {
          plugins: ["react-refresh/babel"],
        },
      },
    ],
  },

  plugins: [
    new HtmlwebpackPlugin({
      template: "./public/index.html",
    }),
    new RefreshWebpackPlugin(),
  ],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    hot: true,
  },
};
