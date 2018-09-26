const webpack = require('webpack');
const webpackRendererProdConfig = require('./webpack.renderer.prod.config');
const webpackMainProdConfig = require('./webpack.main.prod.config');

function buildRenderer() {
    webpack(webpackRendererProdConfig)
        .run((err, stats) => {
            if (err) {
                console.error(`执行 webpack renderer 出错 ${err}`);
            }

            console.log(stats.toString(webpackRendererProdConfig.stats));
        });
}

function buildMain() {
    webpack(webpackMainProdConfig)
        .run((err, stats) => {
            if (err) {
                console.error(`执行 webpack main 出错 ${err}`);
            }

            console.log(stats.toString(webpackMainProdConfig.stats));
        });
}

function build() {
    buildRenderer();
    buildMain();
}

build();

module.exports = build;
