const through = require("through2");
const JsFile = require("./JsFile").default;

export default (config) => {
    return through.obj(function(file, encoding, callback) {
        var jsFile = new JsFile(file);
        var code = jsFile.minify();

        file.contents = new Buffer(code);
        this.push(file);
        callback();
    });
};