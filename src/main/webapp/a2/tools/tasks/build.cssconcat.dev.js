var join = require('path').join;
var PATH = require('../config').PATH;

function buildCssConcatDev(gulp, plugins, option) {
  return function() {
    return gulp.src(join(PATH.dest.tmp, '**', '*.css'))
      .pipe(plugins.concat('main.css'))
      .pipe(gulp.dest(PATH.dest.dev.css))
  }
}

module.exports = buildCssConcatDev;
