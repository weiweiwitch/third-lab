const path = require('path');

const tslintConfig = require('../tslint.json');

const projectRootPath = path.join(__dirname, '..');
const sourcePath = path.join(projectRootPath, 'src');

module.exports = {
    target: 'electron-main',

    // 构建时输出多少信息
    stats: {
        errorDetails: true,
        colors: true,
    },

    devtool: 'source-map',

    context: projectRootPath,

    entry: {
        main: [
            './src/main.ts',
        ],
    },

    module: {
        rules: [
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
            }, {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                include: [
                    sourcePath,
                ],
            }
        ],
    },

    resolve: {
        modules: [
            sourcePath,
            'node_modules',
        ],
        extensions: ['.json', '.js', '.jsx', '.scss', '.ts', '.tsx', '.scss'],
    },

    plugins: [],
};
