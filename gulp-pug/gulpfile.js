/*
	References:
	[1] https://medium.com/@antonioregadas/getting-started-with-pug-template-engine-e49cfa291e33 (compiling pug with gulp)
	[2] http://www.competa.com/blog/how-to-add-multiple-directories-in-one-gulp-task/
 */

'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const del = require('del');
const useref = require('gulp-useref');
const iff = require('gulp-if');
const csso = require('gulp-csso');
const livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const pngcompress = require('imagemin-pngquant');
const jpgcompress = require('imagemin-jpeg-recompress');
const zip = require('gulp-zip');

const options = {
	src: 'src',
	dist: 'dist',
	exp: 'exp'
};

const image_path = '/imgs/**/*.{png,jpeg,jpg,gif,svg}';


// watch for changes to scss
gulp.task('compileSass', () => {
	return gulp.src(options.src + '/scss/styles.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.src + '/css'))
		.pipe(livereload());
});


gulp.task('html', ['compileSass', 'pug'], () => {
	let assets = useref.assets();
	
	return gulp.src(options.src + '/index.html')
		.pipe(assets)
		.pipe(iff('*.js', babel({
			presets: ['es2015']
		})))
		.pipe(iff('*.js', uglify()))
		.pipe(iff('*.css', csso()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(options.dist));
});


// watch for changes to the app's js file
gulp.task('scripts', () => {
	return gulp.src([
		options.src + '/js/app.js',
		options.src + '/js/main.js'
	])
	.pipe(livereload());
});


// compile pug to html
gulp.task('pug', () => {
	return gulp.src(options.src + '/views/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(options.src))
		.pipe(livereload());
});


gulp.task('watchFiles', () => {
	require('./server'); // load server
	livereload.listen(); // load live-reload server
 	gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
	gulp.watch(options.src + '/js/*.js', ['scripts']);
	gulp.watch(options.src + '/views/**/*.pug', ['pug']);
});


// minify any project images
gulp.task('images', () => {
	return gulp.src(options.src + image_path)
		.pipe(imagemin([
			imagemin.gifsicle(),
			imagemin.jpegtran(),
			imagemin.optipng(),
			imagemin.svgo(),
			pngcompress(),
			jpgcompress()
		]))
		.pipe(gulp.dest(options.dist + '/imgs'));
});


gulp.task('assets', ['images'], () => {
	return gulp.src([
		options.src + '/fonts/**/*',
		options.src + '/font-awesome/**/*',
		options.src + '/mail/**/*'
	], {base: options.src})
		.pipe(gulp.dest(options.dist));
});


gulp.task('clean', () => {
	del([
		options.dist,
		options.src + '/css/styles.css*',
		options.src + '/index.html',
		options.exp
	]);
});

// load server and watch for any changes during dev
// ensure chrome LiveReload plugin is enabled
gulp.task('serve', ['watchFiles']);


// export dist version
gulp.task('export', ()=> {
	gulp.src(options.dist + '/**/*')
		.pipe(zip('app.zip'))
		.pipe(gulp.dest(options.exp));
});


// build the production app
// gulp.task('build', ['html']);
gulp.task('build', ['html', 'assets']);


gulp.task('default', ['clean'], () => {
	gulp.start('build');
});