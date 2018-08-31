const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
var webpack = require('webpack');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/index.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel',
      query: {
        presets: ["react", "es2015"],
        plugins: ['transform-class-properties','transform-object-rest-spread','transform-decorators-legacy']
      }
    }],
  },
  plugins: [
    new Dotenv(),
  ],
  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
