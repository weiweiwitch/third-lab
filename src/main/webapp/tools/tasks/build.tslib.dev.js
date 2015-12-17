var PATH = require('../config').PATH;

var libs = [];

function buildJsLibDev(gulp) {
  return function() {
    // var src = libs.concat(PATH.src.jslib_inject, PATH.src.jslib_copy_only);
    var srcInject = PATH.src.jslib_inject;
    var srcCopy = PATH.src.jslib_copy_only;
    var libsCopy = PATH.src.jslib_all_copy_only;
    libsCopy.forEach((eachLib) => {
      gulp.src(eachLib.src)
        .pipe(gulp.dest(eachLib.dest));
    });

    gulp.src(srcInject)
      .pipe(gulp.dest(PATH.dest.dev.lib));
    return gulp.src(srcCopy)
      .pipe(gulp.dest(PATH.dest.dev.lib));
  }
}

module.exports = buildJsLibDev;
