const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const projectRootPath = path.join(__dirname, '..');
const assetsPath = path.join(projectRootPath, 'static', 'dev');

const baseConfig = require('./webpack.main.config');

module.exports = merge.smart(baseConfig, {
    mode: 'development',

    output: {
        path: assetsPath, // 保存到文件系统的哪里
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/static/',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },

            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true,
        }),
    ],
});
