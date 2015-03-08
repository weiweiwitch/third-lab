'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// 合并html 模板
gulp.task('partials', function() {
  var partialsFiles = gulp.src([
    paths.src + '/{app,components}/**/*.html',
    paths.tmp + '/{app,components}/**/*.html'
  ]);

  return partialsFiles
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'mylabApp'
    }))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials', 'fonts'], function() {
  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*/css');
  var assets;

  var target = gulp.src([paths.tmp + '/serve/*.html']);

  var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', {
    read: false
  });

  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.tmp + '/partials',
    addRootSlash: false
  };

  return target
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter) // 处理js
    .pipe($.ngAnnotate())
    .pipe($.uglify({
      preserveComments: $.uglifySaveLicense
    }))
    .pipe(jsFilter.restore())
    .pipe(cssFilter) // 处理css
    .pipe($.replace('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter) // 处理html
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist/'))
    .pipe($.size({
      title: 'dist/',
      showFiles: true
    }));
});

gulp.task('images', function() {
  return gulp.src('app/assets/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('misc', function() {
  return gulp.src('app/**/*.ico')
    .pipe(gulp.dest('dist/'));
});

// 清理构建文件
gulp.task('clean', function(done) {
  $.del(['dist/', '.tmp/'], done);
});

gulp.task('build', ['html']);
