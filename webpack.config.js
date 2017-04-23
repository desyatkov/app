/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: ['react-hot-loader','babel-loader'], exclude: /node_modules/ },
      { test: /\.jsx$/, loader: ['react-hot-loader','babel-loader'], exclude: /node_modules/ },
      { test: /\.(sass|scss)$/, loader: ['style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/ },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000', exclude: /node_modules/ }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
}