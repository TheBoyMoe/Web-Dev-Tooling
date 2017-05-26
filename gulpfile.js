/*
	References:
	[1] https://github.com/hdngr/treehouse-gulp-basics (course github repo)
	[2] https://github.com/contra/gulp-concat
	[3] https://github.com/dlmanning/gulp-sass
	[4] https://github.com/hparra/gulp-rename
	[5] https://github.com/terinjokes/gulp-uglify
	[6] https://alistapart.com/article/better-javascript-minification
	[7] http://thesassway.com/intermediate/using-source-maps-with-sass
	[8] https://github.com/gulp-sourcemaps/gulp-sourcemaps
	[9] http://blog.teamtreehouse.com/introduction-source-maps
	
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
const sass = require('gulp-sass');

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

// compile sass
gulp.task('compile-sass', () => {
	// application.scss imports all other required scss files
	gulp.src('scss/application.scss')
		.pipe(sass())
		.pipe(rename('app.css'))
		.pipe(gulp.dest('css'))
});

gulp.task('hello', () => {
	console.log('Hello from me ...');
});

gulp.task('goodbye', () => {
	console.log('... and it\'s goodbye from him!')
});

gulp.task('default', ['concat-scripts', 'minify-scripts', 'compile-sass'], () => {
	console.log('... all tasks have been completed!');
});