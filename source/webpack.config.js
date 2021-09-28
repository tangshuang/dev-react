const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

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
      react: resolve('react'),
      'react-dom': resolve('react-dom'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      checkSyntacticErrors: true,
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
        test: /\.ts(x)?$/,
        use: [
          {
            loader: resolve('babel-loader'),
            options: {
              presets: [
                resolve('@babel/preset-react'),
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: process.env.TS_CONFIG ? path.resolve(process.env.CWD, process.env.TS_CONFIG) : path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
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
