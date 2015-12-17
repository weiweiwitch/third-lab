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
    html: join(APP_SRC, '**', '*.html'),
    ts: [
      join(APP_SRC, '**', '*.ts'),
      '!' + join(APP_SRC, '**', '*_spec.ts')
    ],
    jslib_inject: [
      // Order is quite important here for the HTML tag injection.
      resolve('es6-shim/es6-shim.js'),
      resolve('es6-shim/es6-shim.map'),
      resolve('reflect-metadata/Reflect.js'),
      resolve('reflect-metadata/Reflect.js.map'),

      resolve('systemjs/dist/system.src.js'),
      join(APP_SRC, 'system.config.js'),
      resolve('rxjs/bundles/Rx.js'),
      ANGULAR_BUNDLES + '/angular2-polyfills.js',
      ANGULAR_BUNDLES + '/angular2.dev.js',
      ANGULAR_BUNDLES + '/router.dev.js',
      ANGULAR_BUNDLES + '/http.dev.js',
      'lib/highlight.pack.js'
    ],
    jslib_copy_only: [
      resolve('marked/lib/marked.js')
    ],
    jslib_all_copy_only: [{
      src: 'node_modules/rxjs/**/*', dest: APP_DEST + '/' + ENV + '/' + 'lib' + '/rxjs'
    }],
    scss: 'src/**/*.scss',
    csslib: [
      resolve('bootstrap/dist/css/bootstrap.css'),
      resolve('bootstrap/dist/css/bootstrap.css.map'),
      resolve('highlight.js/styles/solarized_light.css'),
      'css/main.css'
    ]
  }

};

module.exports = {
  PATH: PATH,
  APP_SRC: APP_SRC,
  APP_BASE: APP_BASE,
  VERSION: VERSION
}
