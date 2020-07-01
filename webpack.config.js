let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  devServer: {
    port: "8082",
    progress: true,
    contentBase: "./dist",
    compress: true
  },
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist") //绝对路径
  },
  module: {
    rules: [
      // 规则，css-loader处理@import语法
      //style-loader把css插入head中
      //loader默认顺序是从右到左执行
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "main.css"
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        safe: true,
        discardComments: { removeAll: true }
      },
      canPrint: true
    })
  ]
};
