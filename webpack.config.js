const { join, resolve } = require('path');

const srcPath = join(__dirname, 'src');
const distPath = join(__dirname, '_build');
const productionPath = join(__dirname, 'production');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const uglifySaveLicense = require('uglify-save-license');
const WebpackStrip = require('strip-loader');

const isProduction = (process.env.NODE_ENV === 'production');
const outputPath = isProduction ? resolve(__dirname, `${productionPath}/assets/scripts`) : resolve(__dirname, `${distPath}/assets/scripts`);

module.exports = {
  entry: [
    join(__dirname, 'src/assets/scripts/main.js'),
  ],
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  devtool: isProduction ? false : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '~': join(srcPath),
      assets: join(srcPath, 'assets'), // use in template with <img src="~assets/nuxt.png" />
      '~assets': join(srcPath, 'assets'),
    },
  },
  plugins: [
    new UglifyJSPlugin({
      beautify: !isProduction,
      mangle: false,
      compress: isProduction,
      sourceMap: !isProduction,
      uglifyOptions: {
        ie8: false,
        ecma: 7,
        output: {
          comments: isProduction ? uglifySaveLicense : true,
        },
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['eslint-loader'],
        enforce: 'pre',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: isProduction ? true : 'auto',
              comments: !isProduction,
            },
          },
        ],
      },
      isProduction ? {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: WebpackStrip.loader('debug', 'console.log', 'console.dir'),
          },
        ],
      } : {},
      {
        test: /\.json?$/,
        use: [
          'json-loader',
        ],
      },
    ],
  },
};
