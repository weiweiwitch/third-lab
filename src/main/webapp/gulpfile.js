var gulp = require('gulp');
var runSequence = require('run-sequence');
var autoRegisterTasks = require('./tools/tasks-tools').autoRegisterTasks;
var task = require('./tools/tasks-tools').task;

autoRegisterTasks();

gulp.task('clean-all', task('clean', 'all'));

gulp.task('build.dev', runSequence('clean-all',
  'tslint',
  'build.ts.dev',
  'build.tslib.dev',
  'build.sass.dev',
  'build.cssconcat.dev',
  'build.csslib.dev',
  'build.html.dev',
  'build.index.dev'));

gulp.task('watch-dev', task('watch.dev', 'build-dev'));

gulp.task('default', ['watch-dev']);
