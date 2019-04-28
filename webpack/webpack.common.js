const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const rules = require("./webpack.rules");

module.exports = {
  entry: [
    "core-js/modules/es6.promise",
    "core-js/modules/es6.array.iterator",
    "./src/Game/Game.js"
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: "src/**/*.png", to: "images", flatten: true },
      { from: "src/**/*.mp3", to: "audio", flatten: true }
    ])
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: ""
  },
  resolve: {
    extensions: [".js"],
    alias: {
      Engine: path.resolve(__dirname, "../src/Engine"),
      Game: path.resolve(__dirname, "../src/Game"),
      assets: path.resolve(__dirname, "../assets"),
      constants: path.resolve(__dirname, "../src/Game/constants"),
      utils: path.resolve(__dirname, "../src/utils"),
      components: path.resolve(__dirname, "../src/components")
    },
    plugins: [new DirectoryNamedWebpackPlugin()]
  },
  module: {
    rules: rules
  }
};
