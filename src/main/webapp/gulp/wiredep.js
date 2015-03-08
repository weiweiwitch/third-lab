'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var wiredep = require('wiredep').stream;

// 注入依赖
gulp.task('wiredep', function() {

  var target = gulp.src(paths.src + '/index.html');

  return target.pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'));
});
