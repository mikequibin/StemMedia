'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var watch        = require('gulp-watch');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var uglifycss    = require('gulp-uglifycss');
var rename       = require('gulp-rename');
var gutil        = require('gulp-util');

//--------------------
// css:min
//--------------------

gulp.task('css:min', ['sass'], function() {
  setTimeout(function() {
    return gulp.src('assets/src/css/*.css')
      .pipe(uglifycss({
        'max-line-len': 80
      }))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('assets/css'));
  }, 1400);
});

//--------------------
// sass
//--------------------

gulp.task('sass', function() {
  return gulp.src('assets/src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed', includePaths: ['assets/src/sass']})
    .on('error', sass.logError))
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('assets/src/css'));
});

//--------------------
// js:min
//--------------------

gulp.task('js:min', function() {
  return gulp.src('assets/src/js/*.js')
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('assets/js'));
});

//--------------------
// watch
//--------------------

gulp.task('watch', function() {
  gulp
  .watch('assets/src/scss/**/*.scss', ['css:min', 'sass'])
    .on('change', function(event) {
      var fullPath = event.path;
      var filename = fullPath.replace(/^.*[\\\/]/, '');
      gutil.log(gutil.colors.green(event.type) + ': ' +
      gutil.colors.magenta(filename));
    });
  gulp
  .watch('assets/src/js/*.js', ['js:min'])
    .on('change', function(event) {
      var fullPath = event.path;
      var filename = fullPath.replace(/^.*[\\\/]/, '');
      gutil.log(gutil.colors.green(event.type) + ': ' +
      gutil.colors.magenta(filename));
    });
});

//--------------------
// build
//--------------------

gulp.task('build', ['css:min', 'js:min'], function(){

});

gulp.task('default', ['sass', 'css:min', 'js:min']);
