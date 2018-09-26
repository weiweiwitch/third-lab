const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const contextPath = path.resolve(__dirname, '..');
const assetsPath = path.resolve(contextPath, 'static', 'dev');
const sourcePath = path.resolve(contextPath, 'src');

const port = process.env.PORT;

const tslintConfig = require('../tslint.json');

module.exports = {
    mode: 'development',

    // 内联调试信息
    devtool: 'inline-source-map',

    context: contextPath,

    // 入口
    entry: {
        app: [
            'webpack/hot/dev-server',
            // 'webpack-dev-server/client?http://localhost:' + port,
            './src/client.tsx',
        ],
    },

    // 输出
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js', // 输出文件名
        chunkFilename: '[name]-[chunkhash].js', // 非entry的文件名
        publicPath: '', // 指定公共URL地址
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                include: [
                    sourcePath,
                ],
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'tslint-loader',
                    options: {
                        failOnHint: true,
                        configuration: tslintConfig,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },

    // 哪些后缀的文件会被解析为模块文件
    resolve: {
        modules: [
            sourcePath,
            'node_modules',
        ],
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
    },

    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
    },

    plugins: [
        // 热加载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/webpack-stats\.json$/), // 忽略匹配的文件
        new webpack.DefinePlugin({
            __SERVER_ADDR__: '""',
            __PUBLIC_PATH__: '"/"',
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
        }),
        new HtmlWebpackPlugin({
            title: 'third-lab',
            template: 'src/index.html', // Load a custom template
            inject: false, // Inject all scripts into the body
        }),
    ],
};