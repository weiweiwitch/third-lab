'use strict';

var gulp = require('gulp');

var paths = gulp.paths;
console.log(paths);

gulp.task('watch', ['inject'], function() {
  gulp.watch([
    paths.src + '/components/**/*.html',
    paths.src + '/components/**/*.scss',
    paths.src + '/components/**/*.js',
    'bower.json'
  ], ['inject']);
});
