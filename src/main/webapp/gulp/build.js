'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// 编译scss
// 这个任务会先关联依赖，然后执行cssd的预处理
gulp.task('styles', ['wiredep', 'injector:css:preprocessor'], function() {
  var target = gulp.src(['app/index.scss', 'app/vendor.scss']);

  return target.pipe($.sass({
      style: 'expanded'
    }))
    .on('error', function handleError(err) {
      this.emit('end');
    })
    .pipe($.autoprefixer())
    .pipe(gulp.dest('.tmp'));
});

// scss的预处理
gulp.task('injector:css:preprocessor', function() {
  var target = gulp.src('app/index.scss');
  var sources = gulp.src([
    'app/components/**/*.scss',
    '!app/index.scss',
    '!app/vendor.scss'
  ]);

  // 这里将需要的scss子文件注入到index.scss，并写回app目录。
  return target.pipe($.inject(sources, {
      transform: function(filePath) {
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    }))
    .pipe(gulp.dest('app'));
});

// 将生成的css 文件注入到index.html中
gulp.task('injector:css', ['styles'], function() {
  var target = gulp.src('app/index.html');
  var sources = gulp.src([
    '.tmp/**/*.css',
    '!.tmp/vendor.css'
  ], {
    read: false
  });

  return target.pipe($.inject(sources, {
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(gulp.dest('app'));
});

// 检测js
gulp.task('scripts', function() {
  var sources = gulp.src('app/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// 注入js 到index.html
gulp.task('injector:js', ['scripts', 'injector:css'], function() {
  var target = gulp.src('app/index.html');
  var sources = gulp.src(['app/**/*.js']);

  var sorted = sources.pipe($.angularFilesort());

  return target.pipe($.inject(sorted, {
      addRootPath: false
    }))
    .pipe(gulp.dest('app'));
});

// 合并html 模板
gulp.task('partials', function() {
  return gulp.src(['app/{app,components}/**/*.html', '.tmp/{app,components/**/*.html}'])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'mylabApp'
    }))
    .pipe(gulp.dest('.tmp/inject/'));
});

gulp.task('html', ['wiredep', 'injector:css', 'injector:js', 'partials', 'fonts'], function() {
  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*/css');
  var assets;

  var target = gulp.src(['app/*.html', '.tmp/*.html']);
  var sources = gulp.src('.tmp/inject/templateCacheHtml.js', {
    read: false
  });
  return target
    .pipe($.inject(sources, {
      starttag: '<!-- inject:partials -->',
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({
      preserveComments: $.uglifySaveLicense
    }))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist/'))
    .pipe($.size({
      title: 'dist/',
      showFiles: true
    }));
});

gulp.task('images', function() {
  return gulp.src('app/assets/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('misc', function() {
  return gulp.src('app/**/*.ico')
    .pipe(gulp.dest('dist/'));
});

// 清理构建文件
gulp.task('clean', function(done) {
  $.del(['dist/', '.tmp/'], done);
});

gulp.task('build', ['html']);
