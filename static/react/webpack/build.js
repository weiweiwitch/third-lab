const webpack = require('webpack');
const webpackProConfig = require('./prod.config');

// webpack --verbose --colors --display-error-details --config webpack/prod.config.js

function build() {
  webpack(webpackProConfig)
    .run((err, stats) => {
      if (err) {
        console.error('执行webpack出错 ' + err);
      }

      console.log(stats.toString(webpackProConfig.stats));
    });
}

build();

module.exports = build;