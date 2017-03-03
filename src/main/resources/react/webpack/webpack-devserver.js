import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";

var config = require("./dev.config.js");

const apiPort = process.env.APIPORT;
var port = process.env.PORT;

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: 'src/',
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