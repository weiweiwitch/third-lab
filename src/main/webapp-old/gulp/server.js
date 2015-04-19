'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var browserSync = require('browser-sync');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'defauls' : browser;

  browserSync.instance = browserSync.init(files, {
    startPath: '/api/ap/index.html',
    proxy: 'localhost:8080'
  });
}

gulp.task('serve', ['watch'], function() {
  browserSyncInit([
    paths.tmp + '/serve',
    paths.src
  ], [
    paths.tmp + '/serve/{app,components}/**/*.css',
    paths.src + '/{app,components}/**/*.js',
    paths.src + 'src/assets/images/**/*',
    paths.tmp + '/serve/*.html',
    paths.tmp + '/serve/{app,components}/**/*.html',
    paths.src + '/{app,components}/**/*.html'
  ]);
});
