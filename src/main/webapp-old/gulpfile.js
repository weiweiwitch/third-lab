'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'app',
  dist: 'dist',
  tmp: '.tmp'
};

require('require-dir')('gulp');

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
