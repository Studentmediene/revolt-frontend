// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    'whatwg-fetch', // fetch polyfill
    path.join(process.cwd(), 'src/index.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
  },

  // We use ExtractTextPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag

  cssRules: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: true,
        localIdentName: '[hash:base64:6]',
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
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
      inject: true,
    }),

    // Extract the CSS into a seperate file
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['js/*.chunk.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,

      AppCache: false,
      // Allows automatic updating
      ServiceWorker: {
        events: true,
        minify: true,
      },
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['NB_no'],
    }),
  ],
});
