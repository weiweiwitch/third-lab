const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');

process.env.APIPORT = 8080;
process.env.PORT = 3000;
process.env.NODE_ENV = 'development';

const config = require('./dev.config.js');

const apiPort = process.env.APIPORT;
const port = process.env.PORT;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: [path.resolve(__dirname, '..', 'src')], // 使用绝对路径
  watchContentBase: true,
  hot: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  proxy: {
    '/api/*': {
      target: `http://localhost:${apiPort}`,
      // ws: true,
    },
  },
});

server.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Webpack development server listening on port %s', port);
  }
});