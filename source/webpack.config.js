const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'none',
  devtool: 'eval-cheap-source-map',
  entry: __dirname + '/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },
  resolve: {
    alias: {
      app: path.resolve(process.env.ENTRY),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /js(x)?$/,
        loader: path.resolve(__dirname, '../node_modules/babel-loader'),
        options: {
          presets: [
            path.resolve(__dirname, '../node_modules/@babel/preset-react'),
          ]
        },
      }
    ],
  },
  devServer: {
    hot: true,
    liveReload: true,
    port: process.env.PORT || 9000,
    open: true,
    static: {
      directory: process.env.CWD,
    },
  },
}
