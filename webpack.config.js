const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pkg = require('./package.json')

const APP_NAME = pkg.name
const APP_VERSION = pkg.version
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8080
const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const EXTERNALS = path.resolve(__dirname, 'externals')
const STORAGE = path.resolve(__dirname, '__storage__')
const EXCLUDE_DEFAULT = [NODE_MODULES, EXTERNALS, STORAGE]
const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'build/public')
const { NODE_ENV } = process.env
const MODE = NODE_ENV !== 'development' ? 'production' : 'development'

const config = {
    mode: MODE,
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
    },
    entry: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        'whatwg-fetch',
        `${SRC}`,
    ],
    output: {
        path: DIST,
        publicPath: '/',
    },
    devtool: 'source-map',
    performance: {
        maxEntrypointSize: MODE === 'production' ? 1000000 : 5000000,
        maxAssetSize: MODE === 'production' ? 1000000 : 5000000,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: [
                    MODE === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.tsx?$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
    plugins: [
        new webpack.WatchIgnorePlugin({ paths: EXCLUDE_DEFAULT }),
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(APP_NAME),
            APP_VERSION: JSON.stringify(APP_VERSION),
            MODE: JSON.stringify(MODE),
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            filename: `${DIST}/index.html`,
            template: `${SRC}/index.ejs`,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:4].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${SRC}/assets/img/favicon.png`,
                    to: `${DIST}/favicon.png`,
                    globOptions: {
                        ignore: ['.DS_Store'],
                    },
                },
                {
                    from: `${SRC}/assets/img`,
                    to: `${DIST}/img`,
                    globOptions: {
                        ignore: ['.DS_Store'],
                    },
                },
            ],
        }),
    ],
}

if (MODE === 'production') {
    config.output.chunkFilename = '[name].[chunkhash:4].js'
    config.output.filename = '[name].[chunkhash:4].js'
    config.optimization = {
        splitChunks: {
            chunks: 'initial',
        },
        runtimeChunk: {
            name: 'manifest',
        },
    }
}

if (MODE === 'development') {
    config.devServer = {
        host: HOST,
        port: PORT,
        publicPath: '/',
        historyApiFallback: {
            index: '/index.html',
        },
        disableHostCheck: true,
        stats: 'errors-only',
        overlay: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: EXCLUDE_DEFAULT,
        },
    }
}

module.exports = config
