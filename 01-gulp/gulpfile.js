/*
	Gulp tasks
 */
let gulp = require('gulp');

// styles
gulp.task('styles', function () {
	console.log(`starting with styles...`);
});

// js
gulp.task('scripts', function () {
	console.log('executing scripts tasks...');
});

// images
gulp.task('imgs', function () {
	console.log('finishing off with images tasks!');
});

// default task
gulp.task('default', function () {
	console.log(`Running gulp tasks...`)
});