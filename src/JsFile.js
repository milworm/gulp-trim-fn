const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");
const fs = require("fs");

export default class {
    constructor(file) {
        this._replacements = {};
        this._sourceCode = fs.readFileSync(file.path, "utf8");
    }

    minify() {
        this._generateAst();
        this._findAndReplace();
        return this._generate();
    }

    _generate() {
        return escodegen.generate(this._ast);
    }

    _findAndReplace() {
        let lastKey = 'a0';

        estraverse.traverse(this._ast, {
            enter: (node, parent) => {
                let property;

                switch(node.type) {
                    case 'Literal': {
                        property = 'value';
                        break;
                    }

                    case 'Identifier': {
                        property = 'name';
                        break;
                    }

                    default: {
                        return ;
                    }
                }

                if(node[property].indexOf('_') !== 0)
                    return ;

                let name = node[property];
                let key = this._replacements[name];

                if(!key) {
                    key = this._succ(lastKey);
                    this._replacements[name] = key;
                    lastKey = key;
                }

                node[property] = key;
            }
        });
    }

    _succ(input) {
        var alphabet = 'abcdefghijklmnopqrstuvwxyz',
            length = alphabet.length,
            result = input,
            i = input.length,
            index;
            
        while(i >= 0) {
            var last = input.charAt(--i),
                next = '',
                carry = false;
            
            if (isNaN(last)) {
                index = alphabet.indexOf(last.toLowerCase());
                
                if (index === -1) {
                    next = last;
                    carry = true;
                }
                else {
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
            }
            else {
                next = +last + 1;
                if(next > 9) {
                    next = 0;
                    carry = true
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

    _generateAst() {
        this._ast = esprima.parse(this._sourceCode);
    }
}