const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');
const Dotenv = require('dotenv-webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';
const buildPath = path.join(__dirname, '/build');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './js/bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@routes': path.resolve(__dirname, './src/routes/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@route-controller': path.resolve(__dirname, './src/route-controller/'),
      '@localization': path.resolve(__dirname, './src/localization/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@actions': path.resolve(__dirname, './src/redux/actions/'),
      '@types': path.resolve(__dirname, './src/redux/actions/types/'),
      '@reducers': path.resolve(__dirname, './src/redux/reducers/'),
      '@sagas': path.resolve(__dirname, './src/redux/sagas/'),
      '@store': path.resolve(__dirname, './src/redux/store/'),
      '@app-config': path.resolve(__dirname, './src/app-config/'),
    },
  },
  mode: NODE_ENV,
  watch: isDev,
  devtool: isDev && 'source-map',
  devServer: {
    contentBase: buildPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: 'Google Chrome',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [['@babel/plugin-transform-runtime', { 'regenerator': true }], '@babel/plugin-proposal-export-default-from'],
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jp(e)?g|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      _isDev_: isDev,
    }),
    new HtmlWebpackPlugin(
      ({
        inject: true,
        template: './src/index.html',
        ...(!isDev
          ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
          : undefined),
        templateParameters(compilation, assets, options) {
          return {
            compilation: compilation,
            webpack: compilation.getStats().toJson(),
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              files: assets,
              options: options
            },
            process,
          };
        },
      }),
    ),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/assets/'),
        to: path.resolve(__dirname, 'build'),
      }],
    }),
  ],
};
