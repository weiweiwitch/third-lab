var argv = require('yargs').argv;
var join = require('path').join;
var readFileSync = require('fs').readFileSync;

var resolve = require.resolve;

// 变量的定义
var ENV = argv['env'] || 'dev';
var DEBUG = argv['debug'] || false;
var APP_BASE = argv['base'] || '/';

var APP_SRC = 'src';
var APP_DEST = 'dist';
var ANGULAR_BUNDLES = './node_modules/angular2/bundles';
var VERSION = version();

function version() {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}

var PATH = {
  tools: 'tools',
  dest: {
    all: APP_DEST,
    dev: {
      all: APP_DEST + '/' + ENV,
      lib: APP_DEST + '/' + ENV + '/' + 'lib',
      css: APP_DEST + '/' + ENV + '/' + 'css',
      fonts: APP_DEST + '/' + ENV + '/' + 'fonts'
    },
    test: 'test',
    tmp: '.tmp'
  },
  src: {
    all: APP_SRC,
    html: 'src/**/*.html',
    ts: [
      join(APP_SRC, '**', '*.ts'),
      '!' + join(APP_SRC, '**', '*_spec.ts')
    ],
    jslib_inject: [
      // Order is quite important here for the HTML tag injection.
      // resolve('es6-shim/es6-shim.min.js'),
      // resolve('es6-shim/es6-shim.map'),
      resolve('es6-module-loader/dist/es6-module-loader-dev.src.js'),
      resolve('reflect-metadata/Reflect.js'),
      resolve('reflect-metadata/Reflect.js.map'),
      resolve('systemjs/dist/system.src.js'),
      APP_SRC + '/system.config.js',
      ANGULAR_BUNDLES + '/angular2.dev.js',
      ANGULAR_BUNDLES + '/router.dev.js',
      ANGULAR_BUNDLES + '/http.dev.js',
      'lib/highlight.pack.js'
    ],
    jslib_copy_only: [
      // resolve('systemjs/dist/system-polyfills.js'),
      // resolve('systemjs/dist/system-polyfills.js.map')
      resolve('marked/lib/marked.js')
    ],
    scss: 'src/**/*.scss',
    csslib: [
      resolve('bootstrap/dist/css/bootstrap.css'),
      resolve('bootstrap/dist/css/bootstrap.css.map'),
      resolve('highlight.js/styles/solarized_light.css'),
      'css/main.css'
    ],
    lib: [
      // 'node_modules/es6-module-loader/dist/es6-module-loader-dev.src.js',
      // 'node_modules/systemjs/dist/system.src.js',
      // 'node_modules/reflect-metadata/Reflect.js',
      // 'node_modules/reflect-metadata/Reflect.js.map',
      // 'node_modules/zone.js/dist/zone.js',
      'node_modules/d3/d3.js',
      'node_modules/highlight.js/styles/solarized_light.css',
      // 'lib/bootstrap.min.css',
      // 'lib/highlight.pack.js'
    ],
    otherlib: [
      'node_modules/marked/lib/marked.js'
    ]
  },

};

module.exports = {
  PATH: PATH,
  APP_SRC: APP_SRC,
  APP_BASE: APP_BASE,
  VERSION: VERSION
}
