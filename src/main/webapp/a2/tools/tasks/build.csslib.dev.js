var join = require('path').join;
var PATH = require('../config').PATH;

function buildCssLibDev(gulp, plugins, option) {
  return function() {
    return gulp.src(PATH.src.csslib)
      .pipe(gulp.dest(join(PATH.dest.dev.css)));
  }
}

module.exports = buildCssLibDev;
