var PATH = require('../config').PATH;

var libs = [];

function buildJsLibDev(gulp) {
  return function() {
    // var src = libs.concat(PATH.src.jslib_inject, PATH.src.jslib_copy_only);
    var srcInject = PATH.src.jslib_inject;
    var srcCopy = PATH.src.jslib_copy_only;
    gulp.src(srcInject)
      .pipe(gulp.dest(PATH.dest.dev.lib));
    return gulp.src(srcCopy)
      .pipe(gulp.dest(PATH.dest.dev.all));
  }
}

module.exports = buildJsLibDev;
