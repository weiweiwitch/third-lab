"use strict";

// var tsc = require('gulp-typescript');
// var sourcemaps = require('gulp-sourcemaps');
var join = require('path').join;
var PATH = require('../config').PATH;

function buildTsDev(gulp, plugins, option) {
  var tsProject = plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });

  return function () {
    var tsResult = gulp.src(PATH.src.ts)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return tsResult.js
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
}

class MyClass {

}

module.exports = buildTsDev;
