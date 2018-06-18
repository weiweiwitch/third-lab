// Webpack config for creating the production bundle.
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const contextPath = path.resolve(__dirname, '..');
const assetsPath = path.resolve(contextPath, 'static', 'dist');
const sourcePath = path.resolve(contextPath, 'src');

module.exports = {
  mode: 'production',

  // 构建时输出多少信息
  stats: {
    errorDetails: true,
    colors: true
  },

  devtool: 'source-map',

  context: contextPath,

  entry: {
    main: [
      './src/client.tsx'
    ]
  },

  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: ''
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        include: [
          sourcePath,
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true,
              }
            },
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            },
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
    ]
  },

  resolve: {
    modules: [
      sourcePath,
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx']
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },

  plugins: [
    new CleanPlugin([assetsPath], {
      root: contextPath
    }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),

    new HtmlWebpackPlugin({
      title: 'third-lab',
      basename: '',
      template: 'src/index.html', // Load a custom template
      inject: false // Inject all scripts into the body
    }),
  ]
};
