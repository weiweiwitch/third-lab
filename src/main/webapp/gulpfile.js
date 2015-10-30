var gulp = require('gulp');
var del = require('del');
var traceur = require('gulp-traceur');
var size = require('gulp-size');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var Builder = require('systemjs-builder');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var autoRegisterTasks = require('./tools/tasks-tools').autoRegisterTasks;
var task = require('./tools/tasks-tools').task;

autoRegisterTasks();

gulp.task('clean-all', task('clean', 'all'));

gulp.task('build.dev', runSequence('tslint',
  'build.ts.dev',
  'build.tslib.dev',
  'build.sass.dev',
  'build.cssconcat.dev',
  'build.csslib.dev',
  'build.html.dev',
  'build.index.dev'));

// 构建
gulp.task('rebuild-dev', function() {
  runSequence('clean-all', 'build.dev');
});

gulp.task('watch-dev', task('watch.dev', 'rebuild-dev'));

gulp.task('default', ['watch-dev']);
