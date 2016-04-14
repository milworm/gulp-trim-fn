## Gulp module to trim private methods/properties in JS files.
gulp-trim-fn

### Introduction
gulp-trim-fn is a small gulp module that obfuscates private functions/properties (with "_"-prefix in their names) in js files (babel-generated code is supported) in order to protect your code.

[![Support](https://supporterhq.com/api/b/399936c021d5111d90001de85283a4b5/gulp-trim-fn)](https://supporterhq.com/support/399936c021d5111d90001de85283a4b5/gulp-trim-fn)

### Installation
    npm install gulp-trim-fn --save-dev

### Usage
```javascript
const gulp = require('gulp');
const trimFn = require('gulp-trim-fn');

gulp.task('trim-fn', () => {
	return gulp.src('./src/**/*.js')
  	.pipe(trimFn())
    .pipe(gulp.dest('./lib/'));
});
```

### Example
Before:
```javascript
function SideBar() {}
SideBar.prototype = {
	render: function() {
		var data = this._getRenderData();
		document.body.innerHTML = this._getTpl().apply(data);
	},
	_getTpl: function() {},
	_getRenderData: function() {},
	_getElement: function() {}
}
```

After:
```javascript
function SideBar() {}
SideBar.prototype = {
	render: function() {
		var data = this.a1();
		document.body.innerHTML = this.a2().apply(data);
	},
	a2: function() {},
	a1: function() {},
	a3: function() {}
}
```

### Authors and Contributors
Created in 2016 by Ruslan Prytula (@milworm).
