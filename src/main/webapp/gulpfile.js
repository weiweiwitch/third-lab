var gulp = require('gulp');
var del = require('del');
var traceur = require('gulp-traceur');
var size = require('gulp-size');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var Builder = require('systemjs-builder');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

// 变量的定义
var PATHS = {
  src: {
    html: 'src/**/*.html',
    ts: 'src/**/*.ts',
    scss: 'src/**/*.scss'
  },
  clientDist: 'dist', // 客户端发布目录
  tempDir: '.tmp', // 中间文件目录
  lib: [
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js',
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/es6-module-loader/dist/es6-module-loader-dev.js',
    'node_modules/es6-module-loader/dist/es6-module-loader-dev.js.map',
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/system.js.map',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/reflect-metadata/Reflect.js.map',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/d3/d3.js',
    'node_modules/highlight.js/styles/solarized_light.css',
    'lib/bootstrap.min.css',
    'lib/highlight.pack.js'
  ],
  otherlib: [
    'node_modules/marked/lib/marked.js'
  ]
};

// 清理
gulp.task('clean', function(done) {
  del([PATHS.clientDist, PATHS.tempDir], done);
});

// 检测ts文件
gulp.task('ts-lint', function() {
  return gulp.src(PATHS.src.ts).pipe(tslint()).pipe(tslint.report('prose'));
});

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

// 编译客户端ts
var tss = require('typescript');

gulp.task('compile-ts', ['ts-lint'], function() {
  var tsResult = gulp.src(PATHS.src.ts)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.clientDist));
});

// 编译scss
gulp.task('styles', function() {
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
    .pipe(gulp.dest('.tmp'));

  return d;
});

// 合并css文件
gulp.task('css-concat', function() {
  gulp.src('.tmp/**/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest(PATHS.clientDist));
});

// 复制html
gulp.task('html', function() {
  return gulp.src(PATHS.src.html)
    .pipe(gulp.dest(PATHS.clientDist));
});

// 复制libs
gulp.task('libs', function() {
  return gulp.src(PATHS.lib)
    .pipe(size({
      showFiles: true,
      gzip: true
    }))
    .pipe(gulp.dest(PATHS.clientDist + '/lib'));
});

gulp.task('otherlib', function() {
  return gulp.src(PATHS.otherlib)
    .pipe(size({
      showFiles: true,
      gzip: true
    }))
    .pipe(gulp.dest(PATHS.clientDist));
});

// 执行默认任务并监视
gulp.task('play', ['default'], function() {
  gulp.watch(PATHS.src.html, ['html']);
  gulp.watch(PATHS.src.ts, ['compile-ts']);
});

// 构建
gulp.task('build', function(done) {
  runSequence('compile-ts', 'styles', 'css-concat', 'html', 'libs', 'otherlib', done);
});

gulp.task('rebuild', function() {
  runSequence('clean', 'build');
});

gulp.task('default', ['rebuild'], function() {
  watch(['src/**/*.ts', 'src/**/*.html', 'src/**/*.scss'], function() {
    gulp.start('rebuild');
  });
});
