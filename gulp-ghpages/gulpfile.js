/*
	References:
	[1] https://www.npmjs.com/package/gulp-gh-pages
	[2] https://github.com/indexzero/http-server
	[3] https://github.com/hdngr/treehouse-gulp-ghpages
	[4] https://www.npmjs.com/package/gulp-useref

 */
'use strict';

let gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
  useref = require('gulp-useref'),
     iff = require('gulp-if'),
    csso = require('gulp-csso'),
   pages = require('gulp-gh-pages');

var options = {
  src: './src/',
  dist: './dist/'
}


gulp.task('compileSass', function() {
  return gulp.src(options.src + 'scss/main.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.src + 'css/'));
});

gulp.task('html', ['compileSass'], function() {
  // var assets = useref.assets();
  
  // return gulp.src(options.src + 'index.html')
  //             .pipe(assets)
  //             .pipe(iff('*.js', uglify()))
  //             .pipe(iff('*.css', csso()))
  //             .pipe(assets.restore())
  //             .pipe(useref())
  //             .pipe(gulp.dest(options.dist));
	
	// ver 3.0 of userref: // FIXME downgrade to version 3 and use assets
	return gulp.src(options.src + 'index.html')
		.pipe(iff('*.js', uglify()))
		.pipe(iff('*.css', csso()))
		.pipe(useref())
		.pipe(gulp.dest(options.dist));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + 'scss/**/*.scss', ['compileSass']);
});

gulp.task('assets', function(){
  return gulp.src([options.src + 'img/**/*', 
                   options.src + 'fonts/**/*',
                   options.src + 'font-awesome/**/*',
                   options.src + 'mail/**/*'], {base: options.src})
          .pipe(gulp.dest(options.dist));
});

// watch sass
gulp.task('serve', ['compileSass', 'watchFiles']);

gulp.task('clean', function() {
  del([options.dist]);
  // delete compiles css and map
  del([options.src + 'css/main.css*']);
});

// deploy app the gh-pages
gulp.task('deploy', () => {
	return gulp.src(options.dist + '**/*')
		.pipe(pages());
});


gulp.task('build', ['html', 'assets']);

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});