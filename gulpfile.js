'use strict';
const gulp = require('gulp');

gulp.task('hello', () => {
	console.log('Hello from me ...');
});

gulp.task('goodbye', () => {
	console.log('... and it\'s goodbye from him!')
});

gulp.task('default', ['hello', 'goodbye'], () => {
	console.log('... all tasks have been completed!');
});