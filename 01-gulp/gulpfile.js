/*
	Gulp tasks
	
	References:
	[1] https://www.npmjs.com/package/gulp-uglify
	[2] https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md#why-use-pump
	[3] https://github.com/terinjokes/gulp-uglify/issues/243
	[4] https://github.com/mafintosh/pump
	[5] https://css-tricks.com/gulp-for-beginners/
	[6] http://www.mead.io/yarn/ (yarn package manager)
	
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
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let babel = require('gulp-babel');

const JS_SRC_PATH = 'src/js/**/*.js';
const CSS_SRC_PATH = 'src/css/**/*.css';

// CSS styles task - using the scss task instead
/*
gulp.task('styles', function (cb) {
	// impl sourcemaps to enable debugging of css propbles in dev tools
	// prefix, concat & minify the css files, starting with normalize and output to public folder
	pump([
		gulp.src(['src/css/normalize.css', CSS_SRC_PATH]),
		sourcemaps.init(),
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		concat('app.css'),
		minifycss(),
		sourcemaps.write(),
		gulp.dest('public/css'),
		livereload()
	], cb);
	
});
*/

// sass/scss styles task
gulp.task('sass-styles', function (cb) {
	// impl sourcemaps to enable debugging of css propbles in dev tools
	// prefix, concat & minify the css files, starting with normalize and output to public folder
	pump([
		gulp.src('src/scss/app.scss'), // import all other scss files through app.scss
		sourcemaps.init(),
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		sass({
			outputStyle: 'compressed'
		}),
		sourcemaps.write(),
		gulp.dest('public/css'),
		livereload()
	], cb);
	
});

// js gulp task
gulp.task('scripts', function (cb) {
	
	// compile, minify & concat all js files found in src and output to public
	// uglify can't handle es6, call to babel needs to come first
	pump([
		gulp.src(JS_SRC_PATH),
		sourcemaps.init(),
		babel({
			presets: ['es2015']
		}),
		uglify(),
		concat('app.js'),
		sourcemaps.write(),
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
	
	// start static-server
	require('./server.js');
	
	// launch livereload to refresh the browser
	livereload.listen();
	
	// watch for any changes to js & css files
	gulp.watch(JS_SRC_PATH, ['scripts']);
	//gulp.watch(CSS_SRC_PATH, ['styles']);
	gulp.watch('src/scss/**/*.scss', ['sass-styles']);
	
});

// default task
gulp.task('default', function () {
	console.log(`Running gulp tasks...`)
});