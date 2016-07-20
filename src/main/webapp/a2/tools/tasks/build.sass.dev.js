var join = require('path').join;
var PATH = require('../config').PATH;

function buildSassDev(gulp, plugins, option) {
  return function() {
    return gulp.src(PATH.src.scss)
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer())
      .pipe(gulp.dest(PATH.dest.tmp));
  };
}

module.exports = buildSassDev;
