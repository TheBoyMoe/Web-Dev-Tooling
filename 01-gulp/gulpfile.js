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
let livereload = require('gulp-livereload');
let concat = require('gulp-concat');
let minifycss = require('gulp-minify-css');

const JS_SRC_PATH = 'src/js/**/*.js';
const CSS_SRC_PATH = 'src/css/**/*.css';

// styles
gulp.task('styles', function (cb) {
	console.log(`starting with styles...`);
	
	// concat & minify the css files, starting with normalize and output to public folder
	pump([
		gulp.src(['src/css/normalize.css', CSS_SRC_PATH]),
		concat('app.css'),
		minifycss(),
		gulp.dest('public/css'),
		livereload()
	], cb);
	
});

// js
gulp.task('js', function (cb) {
	console.log('executing js tasks...');
	
	// minify all js files found in src and output to public
	pump([
		gulp.src(JS_SRC_PATH),
		uglify(),
		gulp.dest('public/js'),
		livereload()
	], cb);
	
});

// images
gulp.task('imgs', function () {
	console.log('finishing off with images tasks!');
});

// watch task
gulp.task('watch', function (cb) {
	console.log('starting watch task');
	// start static-server
	require('./server.js');
	// launch livereload to refresh the browser
	livereload.listen();
	// watch for any changes to js files
	gulp.watch(JS_SRC_PATH, ['js']);
});

// default task
gulp.task('default', function () {
	console.log(`Running gulp tasks...`)
});