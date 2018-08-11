const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
      new CleanWebpackPlugin(['./server/public']),
      new HtmlWebpackPlugin({
          title: '账号分发',
          filename: 'index.html',
          template: 'index.html',
          inject: 'body'
      })
    ],
    output: {
        filename: '[name]-[chunkhash].bundle.js',
        path: path.resolve(__dirname,'server/public')
    }
};