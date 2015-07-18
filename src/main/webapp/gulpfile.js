var gulp = require('gulp');
var del = require('del');
var traceur = require('gulp-traceur');
var size = require('gulp-size');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var PATHS = {
  src: {
    html: 'src/**/*.html',
    ts: 'src/**/*.ts',
    scss: 'src/**/*.scss'
  },
  clientDist: 'dist',
  lib: [
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/es6-module-loader/dist/es6-module-loader.js',
    'node_modules/es6-module-loader/dist/es6-module-loader.js.map',
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/system.js.map',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/reflect-metadata/Reflect.js.map',
    'node_modules/d3/d3.js',
    'node_modules/highlight.js/styles/solarized_light.css',
    'lib/bootstrap.min.css',
    'lib/highlight.pack.js',
    'lib/angular2.dev.js',
    'lib/router.dev.js',
    'lib/router.dev.js.map'
  ],
  otherlib: [
    'node_modules/marked/lib/marked.js'
  ]
};

// 清理
gulp.task('clean', function (done) {
  del([PATHS.clientDist], done);
});

// 检测ts文件
gulp.task('ts-lint', function () {
  return gulp.src(PATHS.src.ts).pipe(tslint()).pipe(tslint.report('prose'));
});

// 编译客户端ts
var tss = require('typescript');
var clientTsProject = tsc.createProject({
  "target": "es5",
  "module": "commonjs",
  "declaration": false,
  "noImplicitAny": false,
  "removeComments": true,
  "noLib": false,
  "listFiles": true,
  "emitDecoratorMetadata": true,
  "sourceMap": true,
  "outDir": "dist/static",
  "typescript": tss
});
gulp.task('compile-ts', ['ts-lint'], function () {
  var tsResult = gulp.src(PATHS.src.ts)
    .pipe(sourcemaps.init())
    .pipe(tsc(clientTsProject));

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.clientDist));
});

var serverTsProject = tsc.createProject({
  "target": "es5",
  "module": "commonjs",
  "declaration": false,
  "sourceMap": true,
  "removeComments": true,
  "noLib": false,
  "outDir": "dist",
  "typescript": tss
});

// 编译scss
gulp.task('styles', function () {
  var target = gulp.src(PATHS.src.scss);

  var d = target
    .pipe(sass({
      style: 'expanded'
    }))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end'); // 触发结束事件
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest(PATHS.clientDist));

  return d;
});

// 复制html
gulp.task('html', function () {
  return gulp.src(PATHS.src.html)
    .pipe(gulp.dest(PATHS.clientDist));
});

// 复制libs
gulp.task('libs', function () {
  return gulp.src(PATHS.lib)
    .pipe(size({
      showFiles: true, gzip: true
    }))
    .pipe(gulp.dest(PATHS.clientDist + '/lib'));
});

gulp.task('otherlib', function () {
  return gulp.src(PATHS.otherlib)
    .pipe(size({
      showFiles: true, gzip: true
    }))
    .pipe(gulp.dest(PATHS.clientDist));
});

// 执行默认任务并监视
gulp.task('play', ['default'], function () {
  gulp.watch(PATHS.src.html, ['html']);
  gulp.watch(PATHS.src.ts, ['compile-ts']);
});

// 构建
gulp.task('build', ['compile-ts', 'styles', 'html', 'libs', 'otherlib']);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
