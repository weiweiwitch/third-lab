var PATH = require('../config').PATH;

function buildHtmlDev(gulp, plugins, option) {
  return function () {
    return gulp.src(PATH.src.html)
      .pipe(gulp.dest(PATH.dest.dev.all));
  }
}

module.exports = buildHtmlDev;
