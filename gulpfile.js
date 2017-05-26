/*
	References:
	[1] https://github.com/hdngr/treehouse-gulp-basics (course github repo)
	[2] https://github.com/contra/gulp-concat
	[3] https://github.com/dlmanning/gulp-sass

	
	To run the http-server
	1. install globally
		$ npm i http-server -g
	2. run the server - specifying a port - default is 8080
		$ http-server -p 3000
 */
'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');


// concat js files
gulp.task('concat-scripts', () => {
	gulp.src([
		'js/jquery.js',
		'js/sticky/jquery.sticky.js',
		'js/main.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('js'));
});


gulp.task('hello', () => {
	console.log('Hello from me ...');
});

gulp.task('goodbye', () => {
	console.log('... and it\'s goodbye from him!')
});

gulp.task('default', ['hello', 'concat-scripts', 'goodbye'], () => {
	console.log('... all tasks have been completed!');
});