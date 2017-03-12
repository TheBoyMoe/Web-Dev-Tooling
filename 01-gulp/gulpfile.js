/*
	Gulp tasks
	
	References:
	[1] https://www.npmjs.com/package/gulp-uglify
	[2] https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md#why-use-pump
	[3] https://github.com/terinjokes/gulp-uglify/issues/243
	[4] https://github.com/mafintosh/pump
	
	
	Notes:
	1. using pump:
	
	When using pipe from the Node.js streams, errors are not propagated forward through the piped streams,
	and source streams aren’t closed if a destination stream closed. The pump module normalizes these problems
	and passes you the errors in a callback.
	
 */
let gulp = require('gulp');
let uglify = require('gulp-uglify');
let pump = require('pump');

// styles
gulp.task('styles', function () {
	console.log(`starting with styles...`);
});

// scripts
gulp.task('scripts', function (cb) {
	console.log('executing scripts tasks...');
	
	// minify all scripts files found in src and output to public
	pump([
		gulp.src('src/scripts/*.js'),
		uglify(),
		gulp.dest('public/js')
	], cb);
	
});

// images
gulp.task('imgs', function () {
	console.log('finishing off with images tasks!');
});

// default task
gulp.task('default', function () {
	console.log(`Running gulp tasks...`)
});