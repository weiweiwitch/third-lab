// Webpack config for creating the production bundle.
import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import strip from 'strip-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

let extractCSS = new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true});

module.exports = {
  // 构建时输出多少信息
  stats: {
    errorDetails: true,
    verbose: true,
    colors: true
  },

  devtool: 'source-map',

  context: projectRootPath,

  entry: {
    'main': [
      'bootstrap-loader',
      // 'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
      // 'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [strip.loader('debug'), 'babel']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },
      {
        test: /\.scss$/,
        // loaders: ["style", "css", "sass"]
        loader: extractCSS.extract(['css', 'sass'])
        // loader: ExtractTextPlugin.extract(['style', 'css', 'sass'])
        // loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new CleanPlugin([assetsPath], {root: projectRootPath}),

    // css files from the extract-text-plugin loader
    // new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'ns-mgr',
      basename: '/api/p/',
      template: 'src/index.html', // Load a custom template
      inject: false // Inject all scripts into the body
    })
  ]
};
