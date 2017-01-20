const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TARGET = process.env.npm_lifecycle_event || 'build'

const developmentConfig = require('./webpack/development')

//Hack to make it work with Karma
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
});

commonChunkPlugin.__KARMA_IGNORE__ = true

//CSS LOADER IS ON 0.14.5 FOR PERF SAKE

let common = {
    entry: {
        app: path.resolve(__dirname, "src"),
    },
    output: {
        path: path.resolve(__dirname, "build/dist"),
        filename:'[name].bundle.js',
        chunkFilename: "[name].bundle.js",
        publicPath: "/build/dist/",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],//happypack/loader?id=html'],
                options: {
                    modules: true
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],//happypack/loader?id=babel'],
                options: {
                    modules: true
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: ['style-loader'],
                    loader:[
                        {
                            loader:"css-loader",
                        },
                        {
                            loader: "postcss-loader"
                        }
                    ],
                    publicPath: "/build/dist" // Overrides output.publicPath
                })
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ],
        alias: {
            "lodash": "lodash/lodash.min",
        }
    },
    externals: {
        "React": "react"
    },
    stats: {
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
           options:{
               postcss: [
                   autoprefixer({ browsers: ['last 2 versions'] })
               ],
           }
        }),
        new ExtractTextPlugin({
            filename:'[name].bundle.css',
            disable:false,
            allChunks:true
        }),
        new CopyWebpackPlugin([
            {from: 'src/assets', to: '../assets'},
            {from: 'src/index.html', to: '../index.html'}
        ])
    ]
};

let config = common

if (TARGET === 'build') {
    config = merge.smart(common, {
        plugins: [
            new webpack.DefinePlugin({
              'process.env': {
                'NODE_ENV': JSON.stringify('production')
              }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false
                },
            }),
            commonChunkPlugin //Bug with karma-webpack
        ]
    })
}



if ((TARGET === 'start') || (TARGET === undefined)) {
    config = merge(common, {
        debug: true,
        plugins: [
          new ProgressBarPlugin({
              format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
              width:200,
              clear: false,
          }),
        ],
        devtool: 'eval'
    })

    config = merge(common, developmentConfig.devServer())
}

module.exports = config
