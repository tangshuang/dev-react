const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')

const resolve = (pkg) => {
  return path.resolve(__dirname, '../node_modules', pkg)
}

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
        test: /\.js(x)?$/,
        loader: resolve('babel-loader'),
        options: {
          presets: [
            resolve('@babel/preset-react'),
          ]
        },
      },
      {
        test: /\.css$/,
        use: [
          resolve('style-loader'),
          resolve('css-loader'),
        ],
      },
      {
        test: /\.less$/,
        use: [
          resolve('style-loader'),
          resolve('css-loader'),
          resolve('less-loader'),
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2)$/,
        loader: 'file-loader',
      },
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
