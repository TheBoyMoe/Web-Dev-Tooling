/*
	References:
	[1] https://github.com/hdngr/treehouse-gulp-basics (course github repo)
	[2] https://github.com/contra/gulp-concat
	[3] https://github.com/dlmanning/gulp-sass
	[4] https://github.com/hparra/gulp-rename
	[5] https://github.com/terinjokes/gulp-uglify
	[6] https://alistapart.com/article/better-javascript-minification
	
	
	To run the http-server
	1. install globally
		$ npm i http-server -g
	2. run the server - specifying a port - default is 8080
		$ http-server -p 3000
 */
'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// concat js files - order matters!
gulp.task('concat-scripts', () => {
	gulp.src([
		'js/jquery.js',
		'js/sticky/jquery.sticky.js',
		'js/main.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('js'));
});

// minify js
gulp.task('minify-scripts', () => {
	gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('hello', () => {
	console.log('Hello from me ...');
});

gulp.task('goodbye', () => {
	console.log('... and it\'s goodbye from him!')
});

gulp.task('default', ['concat-scripts', 'minify-scripts'], () => {
	console.log('... all tasks have been completed!');
});