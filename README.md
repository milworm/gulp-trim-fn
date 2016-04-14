# A gulp module to obfuscate JS private functions.

![Demo](https://raw.githubusercontent.com/milworm/gulp-trim-fn/master/demo.gif)

[![Support](https://supporter.60devs.com/api/b/399936c021d5111d90001de85283a4b5/gulp-trim-fn)](https://supporter.60devs.com/support/399936c021d5111d90001de85283a4b5/gulp-trim-fn)

## Introduction
gulp-trim-fn is a gulp module that obfuscates your js files in order to protect your code.

## Installation
    npm install gulp-trim-fn --save-dev

## Usage
```javascript
const gulp = require('gulp');
const trimFn = require('gulp-trim-fn');

gulp.task('trim-fn', () => {
    return gulp.src('./src/**/*.js')
            .pipe(trimFn())
            .pipe(gulp.dest('./lib/'));
});
```

## Authors and Contributors
Created in 2016 by Ruslan Prytula (@milworm).
