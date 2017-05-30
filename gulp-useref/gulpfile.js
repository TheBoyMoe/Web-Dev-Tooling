/*
	References:
	[1] https://github.com/hdngr/treehouse-gulp-basics/tree/master (workshop repo)
	[2] https://www.npmjs.com/package/gulp-useref (used to concat and rename files on the fly)
	[3] https://github.com/jonkemp/gulp-useref/issues/163 (version 3 and using assets)

 */
"use strict";

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const del = require('del');
const useref = require('gulp-useref');
const iff = require('gulp-if');
const csso = require('gulp-csso');

const options = {
	src: 'src',
	dist: 'dist'
};

gulp.task('compileSass', function() {
	return gulp.src(options.src + "/scss/application.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.src + '/css'));
});

gulp.task('watchFiles', function() {
	gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
	del([
		options.dist,
		options.src + '/css/application.css*']);
});

gulp.task('html', ['compileSass'], () => {
	let assets = useref.assets();
	return gulp.src(options.src + '/index.html') // useref will use the css & js paths in the index.html file to know what files to process
		.pipe(assets)
		.pipe(iff('*.js', uglify())) // selectively minimise js files
		.pipe(iff('*.css', csso())) // selectively minimise css files
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(options.dist));
});


gulp.task('build', ['html'], () => {
	return gulp.src([
		options.src + '/img/**',
		options.src + '/fonts/**'], { base: options.src})
		.pipe(gulp.dest(options.dist));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], () => {
	gulp.start('build');
});
