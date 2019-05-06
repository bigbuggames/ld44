module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          "@babel/plugin-transform-computed-properties",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ["file-loader"]
  },
  {
    test: /\.(mp3)$/,
    use: ["file-loader"]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ["file-loader"]
  }
];
