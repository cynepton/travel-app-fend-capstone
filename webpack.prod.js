const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    output:{
        libraryTarget : 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test:/\.scss$/,
                use: [MiniCSSExtractPlugin.loader , 'css-loader', 'sass-loader',
                {
                    //https://www.npmjs.com/package/sass-resources-loader
                    loader: 'sass-resources-loader',
                    options: {
                      // Provide path to the file with resources
                      resources: './src/client/styles/sass/partials/_variables.scss',
           
                      // Or array of paths
                      //resources: ['./path/to/vars.scss', './path/to/mixins.scss']
                    },
                  },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCSSExtractPlugin({filename: '[name].css'}),
        new WorkboxPlugin.GenerateSW()
    ]
}