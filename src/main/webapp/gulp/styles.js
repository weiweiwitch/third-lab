'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var paths = gulp.paths;

// 编译scss
// 这个任务会先关联依赖，然后执行cssd的预处理
gulp.task('styles', function() {

  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    paths.src + '/components/**/*.scss',
    '!' + paths.src + '/index.scss',
    '!' + paths.src + '/vendor.scss'
  ], {
    read: false
  });

  var injectOptions = {
    transform: function(filePath) {
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('index.scss');

  var target = gulp.src([
    paths.src + '/index.scss',
    paths.src + '/vendor.scss'
  ]);

  return target
    .pipe(indexFilter) // 注入应用相关scss
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore())
    .pipe($.sass(sassOptions)) // 编译scss
    .pipe($.autoprefixer())
    .on('error', function handleError(err) {
      this.emit('end', err);
    })
    .pipe(gulp.dest(paths.tmp + '/serve/app/'));
});
