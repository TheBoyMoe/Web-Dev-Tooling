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
const maps = require('gulp-sourcemaps');

// concat js files - order matters!
gulp.task('concat-scripts', () => {
	return gulp.src([
		'js/jquery.js',
		'js/sticky/jquery.sticky.js',
		'js/main.js'])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('js'));
});

// minify js
// tasks are run in parallel, however some tasks depend upon others completing 1st.
// making concat-scripts a dependency of minify-scripts and adding the 'return' keyword
// ensures that minify-scripts will not start until concat-scripts has returned
gulp.task('minify-scripts', ['concat-scripts'], () => {
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

// compile sass
gulp.task('compile-sass', () => {
	// application.scss imports all other required scss files
	return gulp.src('scss/application.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(rename('app.css'))
		.pipe(maps.write('./')) // path relative to that specified to gulp.dest()
		.pipe(gulp.dest('css'))
});


gulp.task('build', ['minify-scripts', 'compile-sass']);

gulp.task('default', ['build'], () => {
	console.log('... all tasks have been completed!');
});