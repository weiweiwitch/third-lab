'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

// 检测js
gulp.task('scripts', function() {
  var sources = gulp.src(paths.src + '/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// 将生成的css 文件注入到index.html中
gulp.task('inject', ['styles'], function() {
  var target = gulp.src(paths.src + '/index.html');

  var injectStyles = gulp.src([
    paths.tmp + '/serve/app/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], {
    read: false
  });

  var injectScripts = gulp.src([paths.src + '/**/*.js'])
    .pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: 'bower_components', // 依赖目录
    exclude: [/bootstrap-sass-official/, /bootstrap\.css/, /bootstrap\.css/, /foundation\.css/]
      //ignorePath: '../bower_components/'
  };

  return target
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'));
});
