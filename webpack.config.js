const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('style-loader/lib/addStyles');
require('css-loader/lib/css-base');

const extractCSS = new ExtractTextPlugin({
  filename: '[name].fonts.css',
  allChunks: true
}
  );
const extractSCSS = new ExtractTextPlugin({
  filename: '[name].styles.css',
  allChunks: true
});

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env = {}) => {
  const env_var = dotenv.config().parsed;
  const envKeys = Object.keys(env_var).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env_var[next]);
    return prev;
  }, {});
  return {
    entry: {
      index: [SRC_DIR + '/index.js']
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js'
    },
    // watch: true,
    devtool: env.prod ? 'source-map' : 'cheap-module-source-map',
    devServer: {
      contentBase: BUILD_DIR,
      //   port: 9001,
      compress: true,
      hot: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-react", "@babel/preset-env"]
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(scss)$/,
          use: ['css-hot-loader'].concat(extractSCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {alias: {'../img': '../public/img'}}
              },
              {
                loader: 'sass-loader'
              }
            ]
          }))
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              // loader: 'url-loader'
              loader: 'file-loader',
              options: {
                name: './img/[name].[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[hash].[ext]'
          }
        },
        {
          test: /.js$/,
          loader: 'source-map-loader',
          enforce: 'pre',
        }
]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
      new webpack.NamedModulesPlugin(),
      extractCSS,
      extractSCSS,
      new HtmlWebpackPlugin(
        {
          inject: true,
          template: './public/index.html'
        }
      ),
      new CopyWebpackPlugin([
          {from: './public/img', to: 'img'}
        ],
        {copyUnmodified: false}
      ),
      new webpack.DefinePlugin(envKeys)
    ]
  }
};