var join = require('path').join;
var PATH = require('../config').PATH;

function tslint(gulp, plugins, option) {
  return function() {
    return gulp.src(PATH.src.ts)
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
}

module.exports = tslint;
