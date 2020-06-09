let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer:{
    port: '8082',
    progress: true,
    contentBase: './dist',
    compress: true
  },
  mode:'development',
  entry: './src/js/index.js',
  output:{
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname,'dist')  //绝对路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename:'index.html',
      minify:{
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash: true
    }),
  ]
}