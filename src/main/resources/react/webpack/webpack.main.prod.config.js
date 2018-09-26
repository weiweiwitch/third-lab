const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const tslintConfig = require('../tslint.json');

const projectRootPath = path.join(__dirname, '..');
const assetsPath = path.join(projectRootPath, 'static', 'dist');

const baseConfig = require('./webpack.main.config');

console.info('__dirname ', __dirname);

module.exports = merge.smart(baseConfig, {
    mode: 'production',

    node: {
        __dirname: false
    },

    output: {
        path: assetsPath, // 保存到文件系统的哪里
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },

            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false,
        }),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    ],
});
