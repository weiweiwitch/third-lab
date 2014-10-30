'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically, when needed
  // require('jit-grunt')(grunt, {
  //   useminPrepare: 'grunt-usemin',
  //   ngtemplates: 'grunt-angular-templates',
  //   cdnify: 'grunt-google-cdn',
  //   protractor: 'grunt-protractor-runner',
  //   injector: 'grunt-asset-injector'
  // });

  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var appConfig = {
    // configurable paths
    client: require('./bower.json').appPath || 'app',
    project: '.',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // 工程配置
    yeoman: appConfig,

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= yeoman.project %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.client %>/modules/**/*.js',
        '!<%= yeoman.client %>/modules/**/*.spec.js',
        '!<%= yeoman.client %>/modules/**/*.mock.js'
      ],
      test: {
        src: [
          '<%= yeoman.client %>/modules/**/*.spec.js',
          '<%= yeoman.client %>/modules/**/*.mock.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/.openshift',
            '!<%= yeoman.dist %>/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    wiredep: {
      task: {
        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          '<%= yeoman.client %>/index.html'
        ],
        // ignorePath: '<%= yeoman.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      },
      sass: {
        src: ['<%= yeoman.client %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    uglify: {
      options: {
        mangle: false // 这个参数用于在压缩时不转化变量和函数名。目前有个bug，会导致转换后出现问题
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.client %>/index.html']
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '*/**.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'mylabApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: '.tmp/concat/app.js'
      },
      main: {
        cwd: '<%= yeoman.client %>',
        src: ['modules/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['modules/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // 复制文件，供其他任务使用
    copy: {
      // 最终复制
      dist: {
        // 文件复制分为3块
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.client %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'modules/**/*.html'
            //'bower_components/**/*',
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= yeoman.client %>',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>/fonts'
        }, {
          expand: true,
          cwd: '<%= yeoman.client %>/bower_components/components-font-awesome/fonts/',
          src: '*',
          dest: '<%= yeoman.dist %>/fonts'
        }]
      },

      // 风格
      styles: {
        expand: true,
        cwd: '<%= yeoman.client %>',
        dest: '.tmp/',
        src: ['modules/**/*.css']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [],
      test: [],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.client %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.client %>/images',
        javascriptsDir: '<%= yeoman.client %>/scripts',
        fontsDir: '<%= yeoman.client %>/styles/fonts',
        importPath: './app/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },

    // 注入文件的引入到特定文件中，需要注释支持，一般是注入js、cssd 引用到html 中
    injector: {
      options: {

      },

      // 注入js到 index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
            ['{.tmp,<%= yeoman.client %>}/modules/**/*.js',
              '!{.tmp,<%= yeoman.client %>}/app.js',
              '!{.tmp,<%= yeoman.client %>}/modules/**/*.spec.js',
              '!{.tmp,<%= yeoman.client %>}/modules/**/*.mock.js'
            ]
          ]
        }
      },

      // 注入css到 index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
            '<%= yeoman.client %>/modules/**/*.css'
          ]
        }
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/assets/fonts/*'
        ]
      }
    }
  });

  // 构建
  grunt.registerTask('build', [
    'clean:dist', // 清理
    'wiredep', // 注入bower 依赖到index.html
    'injector', // 注入文件的引用到index.html中。
    'useminPrepare',
    'concurrent:dist', // 并行运行任务
    'autoprefixer', // 自动添加前缀
    //'ngtemplates', // 将angularjs依赖的模板合并成一个js文件
    'concat', // 合并
    'ngAnnotate', // 修正angularjs的注入依赖注解
    'copy:dist', // 复制文件
    'cdnify',
    'cssmin',
    'uglify', // 压缩
    'filerev',
    'usemin'
  ]);

  // 默认任务
  grunt.registerTask('default', [
    'newer:jshint',
    //'test',
    'build'
  ]);

  grunt.registerTask('d', 'debug', function() {
    //var p = require('./bower.json').appPath;
    var dddd = appConfig.project;

    var s = '';
    for (var property in dddd) {
      s = s + '\n' + property + ': ' + dddd[property];
    }
    grunt.log.debug(s);
  });
};
