var join = require('path').join;
var slash = require('slash');
var VERSION = require('../config').VERSION;
var APP_BASE = require('../config').APP_BASE;
var PATH = require('../config').PATH;

var injectables = [];

function registerInjectableAssetsRef(paths, target) {
  injectables = injectables.concat(paths
    .filter(function(path) {
      var rt = !/(\.map)$/.test(path);
      return rt;
    })
    .map(function(path) {
      var rt = join(target, slash(path)
        .split('/')
        .pop());
      return rt;
    })
  );
}

registerInjectableAssetsRef(PATH.src.jslib_inject, PATH.dest.dev.lib);
registerInjectableAssetsRef(PATH.src.csslib, PATH.dest.dev.css);

function transformPath(plugins, env) {
  var v = '?v=' + VERSION;

  return function(filepath) {
    var filename = filepath.replace('/' + PATH.dest[env].all + '/', '') + v;

    arguments[0] = filename;// join(APP_BASE, filename);
    var p = plugins.inject.transform.apply(plugins.inject.transform, arguments);
    return p;
  }
}

function buildIndexDev(gulp, plugins, option) {
  return function() {
    var target = gulp.src(injectables, {
      read: false
    });

    return gulp.src(join(PATH.src.all, 'index.html'))
      .pipe(plugins.inject(target, {
        transform: transformPath(plugins, 'dev')
      }))
      // .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(PATH.dest.dev.all));
  }
}

module.exports = buildIndexDev;
