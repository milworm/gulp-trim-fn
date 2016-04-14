"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esprima = require("esprima");
var estraverse = require("estraverse");
var escodegen = require("escodegen");
var fs = require("fs");

var _default = (function () {
    function _default(file) {
        _classCallCheck(this, _default);

        this._replacements = {};
        this._sourceCode = fs.readFileSync(file.path, "utf8");
    }

    _createClass(_default, [{
        key: "minify",
        value: function minify() {
            this._generateAst();
            this._findAndReplace();
            return this._generate();
        }
    }, {
        key: "_generate",
        value: function _generate() {
            return escodegen.generate(this._ast);
        }
    }, {
        key: "_findAndReplace",
        value: function _findAndReplace() {
            var _this = this;

            var lastKey = 'a0';

            estraverse.traverse(this._ast, {
                enter: function enter(node, parent) {
                    var property = undefined;

                    switch (node.type) {
                        case 'Literal':
                            {
                                property = 'value';
                                break;
                            }

                        case 'Identifier':
                            {
                                property = 'name';
                                break;
                            }

                        default:
                            {
                                return;
                            }
                    }

                    if (typeof node[property] != 'string') return;

                    if (node[property].indexOf('_') !== 0) return;

                    var name = node[property];
                    var key = _this._replacements[name];

                    if (!key) {
                        key = _this._succ(lastKey);
                        _this._replacements[name] = key;
                        lastKey = key;
                    }

                    node[property] = key;
                }
            });
        }
    }, {
        key: "_succ",
        value: function _succ(input) {
            var alphabet = 'abcdefghijklmnopqrstuvwxyz',
                length = alphabet.length,
                result = input,
                i = input.length,
                index;

            while (i >= 0) {
                var last = input.charAt(--i),
                    next = '',
                    carry = false;

                if (isNaN(last)) {
                    index = alphabet.indexOf(last.toLowerCase());

                    if (index === -1) {
                        next = last;
                        carry = true;
                    } else {
                        var isUpperCase = last === last.toUpperCase();
                        next = alphabet.charAt((index + 1) % length);
                        if (isUpperCase) {
                            next = next.toUpperCase();
                        }

                        carry = index + 1 >= length;
                        if (carry && i === 0) {
                            var added = isUpperCase ? 'A' : 'a';
                            result = added + next + result.slice(1);
                            break;
                        }
                    }
                } else {
                    next = +last + 1;
                    if (next > 9) {
                        next = 0;
                        carry = true;
                    }

                    if (carry && i === 0) {
                        result = '1' + next + result.slice(1);
                        break;
                    }
                }

                result = result.slice(0, i) + next + result.slice(i + 1);
                if (!carry) {
                    break;
                }
            }

            return result;
        }
    }, {
        key: "_generateAst",
        value: function _generateAst() {
            this._ast = esprima.parse(this._sourceCode);
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];