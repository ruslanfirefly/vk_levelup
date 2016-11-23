var path = require('path');
var fs = require('fs');
var webpack = require("webpack");



var minimizeOptions = JSON.stringify({
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    preserveLineBreaks: true,
    removeEmptyAttributes: false,
    keepClosingSlash: true
});

module.exports = {
        entry: {
            "public/app":"./app/app.js",
            "public/vendor":["angular", "angular-animate", "angular-ui-router", "angular-ui-bootstrap"]
        },
        output: {
            publicPath: "http://localhost:3000/public",
            path: __dirname,
            filename: "[name].min.js",
        },
        module: {
            // preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate-loader']},
                {
                    test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {
                    presets: ['latest'],
                    cacheDirectory: true
                }
                },
                {
                    test: /\.html$/,
                    loader: 'ng-cache?prefix=[dir]//&name=[name].html&minimizeOptions=' + minimizeOptions + '&conservativeCollapse&module=vk_pics',
                    // loader: 'ngtemplate?relativeTo=app/!html',
                    exclude: /index\.html/
                },

                {test: /\.png/, loader: "file?name=images/[name].[ext]"}

            ],
        },
        plugins: [

            new webpack.optimize.DedupePlugin(),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false,
            //     },
            //     output: {
            //         comments: false,
            //     },
            // }),
            new webpack.optimize.OccurrenceOrderPlugin(true),
        ]
    };

