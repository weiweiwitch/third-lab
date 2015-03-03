'use strict';

var gulp = require('gulp');

gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;
  var target = gulp.src('app/index.html');

  return target.pipe(wiredep({
    directory: 'bower_components', // 依赖目录
    exclude: [/bootstrap-sass-official/, /bootstrap\.css/, /bootstrap\.css/, /foundation\.css/]
    //ignorePath: '../bower_components/'
  }))
  .pipe(gulp.dest('app'));
});
