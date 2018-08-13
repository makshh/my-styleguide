'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync  = require('browser-sync');
var fileInclude = require('gulp-file-include');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('file-include', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'browser-sync']);
