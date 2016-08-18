import fs from 'fs';
import path  from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

var assetsPath = path.resolve(__dirname, '../static/dev');
console.info('output path: ', assetsPath);

// 加载babel配置
var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error(err);
}

// 开发环境配置
var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};
console.info(babelrcObjectDevelopment);

// 组合babel全局和开发环境插件
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

// 合并对象的值
var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {
  plugins: combinedPlugins
});
delete babelLoaderQuery.env;

// 确保react-transform启用了
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {
    transforms: []
  }];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {
    transforms: []
  });
}

// 确保react-transform-hmr启用了
// reactTransform[1].transforms.push({
//   transform: 'react-transform-hmr',
//   imports: ['react'],
//   locals: ['module']
// });

module.exports = {
  // 内联调试信息
  devtool: 'inline-source-map',

  context: path.resolve(__dirname, '..'),

  // 入口
  entry: {
    'main': [
      'bootstrap-sass!./src/theme/bootstrap.config.js',
      './src/client.js'
    ]
  },

  // 输出
  output: {
    path: assetsPath,
    filename: '[name].js', // 输出文件名
    chunkFilename: '[name]-[chunkhash].js', // 非entry的文件名
    publicPath: '/' // 指定公共URL地址
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'
    }, {
      test: /\.scss$/,
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }]
  },

  progress: true,

  // 哪些后缀的文件会被解析为模块文件
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },

  plugins: [
    // 热加载
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/), // 忽略匹配的文件
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
    }),
    new HtmlWebpackPlugin({
      title: 'ns-mgr',
      basename: '',
      template: 'src/index.html', // Load a custom template
      inject: false // Inject all scripts into the body
    })
  ]
};
