const { join, resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const globule = require('globule')
const ejsConfig = require('./src/markup/page.config.js')

/*
 * paths
 */
const srcPath = resolve(__dirname, 'src')
const tempPath = resolve(__dirname, '.tmp')
const buildPath = resolve(__dirname, 'dist')

const isProduction = process.env.NODE_ENV === 'production'

// 開発用サーバーのドキュメントルートとなる一時フォルダ
const targetDir = isProduction ? buildPath : tempPath

// ejs のコンパイル設定
function getHtmlEntries() {
  const pattern = ['**/*.ejs', '!**/_*.ejs']
  const options = { cwd: srcPath }
  return globule.find(pattern, options).map((subPath) => {
    return new HtmlWebpackPlugin({
      filename: `${subPath.replace(/\.ejs$/i, '.html')}`,
      template: join(srcPath, subPath),
      minify: false,
      alwaysWriteToDisk: true,
      data: ejsConfig.data, // ← データ
    })
  })
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [join(srcPath, '/assets/javascripts/main.js')],
  output: {
    path: targetDir,
    filename: '[name].[contenthash].bundle.js',
  },
  devtool: isProduction ? false : 'inline-source-map',
  resolve: {
    modules: [join(srcPath, '/assets/javascripts'), 'node_modules'],
    extensions: ['.js'],
    alias: {
      '@': join(srcPath, '/assets/javascripts'),
      '@assets': join(srcPath, '/assets'),
    },
  },
  plugins: [new CleanWebpackPlugin(), ...getHtmlEntries()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-compiled-loader',
            options: {
              htmlmin: false,
              htmlminOptions: {
                removeComments: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    inline: true,
    contentBase: targetDir,
    port: 8080,
    watchContentBase: true,
    hot: true,
  },
}
