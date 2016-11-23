"use strict";
var gulp = require("gulp");
var webpackConfig = require("./webpack.config");
var webpack = require("webpack");
var gutil = require("gulp-util");
var express = require("express");

gulp.task("webpack", () => {
    let app = express();
    let compiler = webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({}));
        } else {


        }
    })
    // app.use(require("webpack-dev-middleware")(compiler, {
    //     hot: true, inline: true,
    //     noInfo: true, publicPath: "./public"
    // }));
    // app.use(require("webpack-hot-middleware")(compiler, {
    //     log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    // }));
    app.use("/public", express.static("./public"));
    app.get("/", function (req, res) {
        res.sendFile(__dirname + "/index.html");
    });
    app.listen(3000, function () {
        var open = require('open');
        open("http://localhost:3000")
    })
});


gulp.task("default", () => {
    console.log("hello");
})