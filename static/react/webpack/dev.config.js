import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const contextPath = path.resolve(__dirname, '..');
const assetsPath = path.resolve(contextPath, 'static', 'dev');
const sourcePath = path.resolve(contextPath, 'src');

const port = process.env.PORT;

const tslintConfig = require('../tslint.json');

module.exports = {
  // 内联调试信息
  devtool: 'source-map',

  context: contextPath,

  // 入口
  entry: {
    'main': [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:' + port,
      './src/index.js'
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
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: [
              ['import', {
                "libraryName": "antd",
                "style": true,   // or 'css'
              }]]
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        include: [
          sourcePath,
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'tslint-loader',
          options: {
            failOnHint: true,
            configuration: tslintConfig
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader"
          },
        ]
      },
    ]
  },

  // 哪些后缀的文件会被解析为模块文件
  resolve: {
    modules: [
      sourcePath,
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx']
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
    new HtmlWebpackPlugin({
      title: 'third-lab',
      template: 'src/index.html', // Load a custom template
      inject: false // Inject all scripts into the body
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // 该配置假定你引入的 vendor 存在于 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
  ]
};