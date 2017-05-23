import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import path from "path";

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
    colors: true
  },
  proxy: {
    '/api/*': {
      target: 'http://localhost:' + apiPort,
      ws: true
    }
  },
});

server.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Webpack development server listening on port %s', port);
  }
});