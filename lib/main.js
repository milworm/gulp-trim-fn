"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var through = require("through2");
var JsFile = require("./JsFile").default;

exports.default = function (config) {
    return through.obj(function (file, encoding, callback) {
        var jsFile = new JsFile(file);
        var code = jsFile.minify();

        file.contents = new Buffer(code);
        this.push(file);
        callback();
    });
};