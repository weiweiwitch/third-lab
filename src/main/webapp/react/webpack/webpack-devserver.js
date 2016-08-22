import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";

var config = require("./devserver.config.js");

var port = process.env.PORT;
config.entry.main.unshift("webpack-dev-server/client?http://localhost:" + port + "/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  quiet: false,
  noInfo: false,
  lazy: false,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  proxy: {
    '/api/*': {
      target: 'http://localhost:8080',
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