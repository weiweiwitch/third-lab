var join = require('path').join;
var APP_SRC = require('../config').APP_SRC;

function watchDev(gulp, plugins, option) {
  return function() {
    plugins.watch(join(APP_SRC, '**', '*'), function() {
      gulp.start(option);
    });
  };
}

module.exports = watchDev;
