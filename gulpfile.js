const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const trimFn = require('./lib/main.js').default;
 
gulp.task('default', () => {
    return watch('src/*.js', (file) => {
        return gulp.src(file.path)
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('lib'));
    });
});

gulp.task('trim-fn', () => {
	return gulp.src('./examples/src/**/*.js')
		.pipe(trimFn())
		.pipe(gulp.dest('./examples/lib/'));
});