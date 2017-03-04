import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const assetsPath = path.resolve(__dirname, '../static/dev');
console.info('output path: ', assetsPath);

const sources = path.resolve('./src');

const port = process.env.PORT;

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'third-lab',
  // basename: '',
  template: 'src/index.html', // Load a custom template
  inject: false // Inject all scripts into the body
});

module.exports = {
  // 内联调试信息
  devtool: 'source-map',

  context: path.resolve(__dirname, '..'),

  // 入口
  entry: {
    'main': [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:' + port,
      './src/index.js'
    ],
    'vendor': [
      'history',
      'isomorphic-fetch',
      'moment',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },

  // 输出
  output: {
    path: assetsPath,
    filename: '[name].js', // 输出文件名
    chunkFilename: '[name]-[chunkhash].js', // 非entry的文件名
    publicPath: '' // 指定公共URL地址
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy',
            'react-hot-loader/babel',
            'transform-react-jsx-source',
            ['import', {
              "libraryName": "antd",
              "style": true,   // or 'css'
            }]]
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [
          sources,
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }]
  },

  progress: true,

  // 哪些后缀的文件会被解析为模块文件
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    // 热加载
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/), // 忽略匹配的文件
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
    }),
    htmlWebpackPlugin,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};