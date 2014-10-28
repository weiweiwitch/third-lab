'use strict';

angular.module('mylabApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'ui.ace',
    'hc.marked',
    'restangular'
  ])
  .config(function($locationProvider, $httpProvider) {
    // 使用html5模式
    // $locationProvider.html5Mode(true);

    // 添加认证拦截器
    // $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function($stateProvider, $urlRouterProvider) {
    // 配置默认路由
    $urlRouterProvider.otherwise('/wiki');
  })
  .config(['markedProvider', function(markedProvider) {
    markedProvider.setOptions({
      gfm: true,
      tables: true,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  }])
  .factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    // 返回认证拦截器
    console.log('authInterceptor');
    return {

      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          console.log('login');
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    // 路由变化时，如果没有认证，就跳转到登陆页
    // $rootScope.$on('$routeChangeStart', function(event, next) {
    // if (next.authenticate && !Auth.isLoggedIn()) {
    //   console.log('to login');
    //   $location.path('/login');
    // }
    // });
  });

'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'account/login/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'account/signup/signup.html',
          controller: 'SignupCtrl'
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'account/settings/settings.html',
          controller: 'SettingsCtrl',
          authenticate: true
        });
    }
  ]);

'use strict';

angular.module('mylabApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });

'use strict';

angular.module('mylabApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });

'use strict';

angular.module('mylabApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
'use strict';

angular.module('mylabApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User) {

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
    });

    $scope.delete = function(user) {
      User.remove({
        id: user._id
      });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });

'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'admin/admin.html',
          controller: 'AdminCtrl'
        });
    }
  ]);

'use strict';

angular.module('mylabApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = User.get();
    }

    console.log('Auth init');
    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        })
          .success(function(data) {
            // 成功，在cookie中保存token信息
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            deferred.resolve(data);
            return cb();
          })
          .error(function(err) {
              this.logout();
              deferred.reject(err);
              return cb(err);
            }
            .bind(this)); // 这里的bind方法将匿名方法绑定到auth服务对象，这样里面的logout才能正常执行！

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        // 从cookie中移除token，并清空当前用户
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        // 调用保存用户的请求
        return User.save(user, function(data) {
              // 成功
              $cookieStore.put('token', data.token);
              currentUser = User.get();
              return cb(user);

            }, function(err) {
              this.logout();
              return cb(err);
            }
            .bind(this)) // 这里的bind方法将匿名方法绑定到auth服务对象，这样里面的logout才能正常执行！
          .$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });

'use strict';

angular.module('mylabApp')
  .factory('User', function($resource) {
    console.log('User init');
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  });

'use strict';

console.log('post service');
angular.module('mylabApp')
  .factory('PostRes', function($resource) {
    console.log('PostRes init');
    return $resource('/api/posts/:id', {
      id: '@_id', // 动态参数
    }, {
      update: {
        method: 'PUT'
      }
    });
  });

'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('mylabApp')
    .directive('mongooseError', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.on('keydown', function() {
                    return ngModel.$setValidity('mongoose', true);
                });
            }
        };
    });

'use strict';

// 下面这个是导航栏的controller。
// 在这个app里面，通过ng-include，导航栏被嵌入到各个视图的view中。
angular.module('mylabApp')
  .controller('NavbarCtrl', function($scope, $location, Auth, $state) {
    // 菜单
    $scope.menu = [{
      'title': 'Wiki',
      'link': 'wiki'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn; // 是否已经登录
    $scope.isAdmin = Auth.isAdmin; // 是否是管理员
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });

'use strict';

angular.module('mylabApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });

'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('m', {
          url: '/main',
          templateUrl: 'main/main.html',
          controller: 'MainCtrl'
        });
    }
  ]);

'use strict';

angular.module('mylabApp')
  .filter('toMark', function($sce) {
    return function(data) {
      var t = marked(data);
      var ht = $sce.trustAsHtml(t);
      var rrr = ht.$$unwrapTrustedValue();
      return rrr;
    };
  })
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('wiki.editid', {
          url: '/edit/:id',
          templateUrl: 'modules/wiki/wikiedit.html',
          controller: 'WikiPostEditCtrl',
          resolve: {
            post: ['$stateParams', 'PostRes',
              function($stateParams, PostRes) {
                return PostRes.get({
                  id: $stateParams.id
                }).$promise;
              }
            ]
          }
        })
        .state('wiki.new', {
          url: '/new',
          templateUrl: 'modules/wiki/wikiedit.html',
          controller: 'WikiPostNewCtrl'
        });
    }
  ])
  .controller('WikiPostEditCtrl', ['$scope', '$location', '$filter', 'PostRes', 'post',
    function($scope, $location, $filter, PostRes, post) {
      $scope.text = '这是文章的编辑页';

      $scope.post = post;
      if (post.post !== '') {
        $scope.markedPost = $filter('toMark')(post.post);
      }

      $scope.isNew = function() {
        return false;
      };

      $scope.saveUpdate = function() {
        console.log('测试保存更新 ' + $scope.post.post);
        PostRes.update(post, function() {
          console.log('successful');

          // 刷新树
          $scope.$emit('wikipostchg');

          // 跳转到指定页面
          $location.path('/wiki/post/' + post.id);

        }, function() {
          console.log('failed');
          $location.path('/wiki/post/' + post.id);
        });

      };
    }
  ])
  .controller('WikiPostNewCtrl', ['$scope', '$location', 'LabShareData', 'PostRes',
    function($scope, $location, LabShareData, PostRes) {

      $scope.post = {
        user: 'aaa',
        title: '',
        post: '',
        parantId: 0
      };

      if (LabShareData.parantId !== undefined) {
        $scope.post.parantId = LabShareData.parantId;
      }

      $scope.isNew = function() {
        return true;
      };

      $scope.saveNew = function() {
        console.log('测试保存 ' + $scope.post.post);
        PostRes.save($scope.post, function() {
          console.log('successful');

          // 刷新树
          $scope.$emit('wikipostchg');

          // 跳转到首页
          $location.path('/wiki');

        }, function() {
          console.log('failed');
          $location.path('/wiki');
        });
      };
    }
  ]);

'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('wiki', {
          url: '/wiki',
          templateUrl: 'modules/wiki/wikiindex.html',
          controller: 'WikiIndexCtrl',
          resolve: {
            posts: ['PostRes',
              function(PostRes) {
                console.log('查询列表');
                var p = PostRes.query().then(function(datas) {
                  console.log('datas ');
                  console.log(datas);
                });
                return p;
              }
            ]
          }
        });
    }
  ])
  .directive('collection', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        collection: '='
      },
      templateUrl: 'modules/wiki/collection-tpl.html'
    };
  })
  .directive('member', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        member: '=member'
      },
      templateUrl: 'modules/wiki/exp-member.html',
      controller: function($scope) {
        $scope.collapsed = false;
        $scope.showThisPost = function(post) {
          console.log(post);
        };
      },

      link: function(scope, element) {
        scope.toggle = function() {
          scope.member.collapsed = !scope.member.collapsed;
          scope.collapsed = scope.member.collapsed;
        };

        scope.collapsed = scope.member.collapsed;

        if (angular.isArray(scope.member.nodes)) {
          var st = '<div ng-show="!collapsed"><collection collection="member.nodes"></collection></div>';

          var ddd = $compile(st); // 这里返回的是的link function

          ddd(scope, function(cloned) {
            element.append(cloned);
          }); // 手动触发link！

        }
      }
    };
  })
  .factory('LabShareData', function() {
    console.log('factory LabShareData');
    return {};
  })
  .controller('WikiIndexCtrl', ['$scope', '$location', 'LabShareData', 'PostRes', 'posts',
    function($scope, $location, LabShareData, PostRes, posts) {
      console.log('WikiIndexCtrl');
      console.log(posts);
      $scope.addNewPost = function() {
        delete LabShareData.parantId;
        $location.path('/wiki/new');
      };

      $scope.$on('wikipostchg', function() {
        console.log('监听到保存');

        // 临时保存树的展开状态。
        var oldPosts = $scope.posts;
        var oldList = [];
        var oldMap = {};

        // 生成原文章的列表
        var generatePostList = function(pList, pMap, ps) {
          console.log(ps);
          for (var i in ps) {
            var eachP = ps[i];
            console.log('eTitle: ' + eachP.title);
            eachP.collapsed = true;

            pList.push(eachP);
            pMap[eachP.id] = eachP;
            if (eachP.nodes !== undefined && eachP.nodes !== null) {
              generatePostList(pList, pMap, eachP.nodes);
            }
          }
        };

        generatePostList(oldList, oldMap, oldPosts);

        // 请求新的数据
        PostRes.query({}, function(updatedPosts) {
          $scope.posts = updatedPosts;

          // 重新设置树的展开状态
          var newList = [];
          var newMap = {};
          generatePostList(newList, newMap, $scope.posts);

          for (var eachIndex in newList) {
            var eachNewPost = newList[eachIndex];
            var samePost = oldMap[eachNewPost.id];
            if (samePost !== undefined && samePost.collapsed === false) {
              eachNewPost.collapsed = samePost.collapsed;
            } else {
              eachNewPost.collapsed = true;
            }
          }
        });
      });

      $scope.posts = posts;
    }
  ]);

'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('wiki.id', {
          url: '/post/:id',
          templateUrl: 'modules/wiki/wikipost.html',
          controller: 'WikiPostCtrl',
          resolve: {
            post: ['$stateParams', 'PostRes',
              function($stateParams, PostRes) {
                console.log($stateParams.id);
                return PostRes.get({
                  id: $stateParams.id
                }).$promise;
              }
            ]
          }
        });
    }
  ])
  .controller('WikiPostCtrl', ['$scope', '$sce', '$location', 'LabShareData', 'PostRes', 'post',
    function($scope, $sce, $location, LabShareData, PostRes, post) {
      $scope.post = post;

      var t = post.mkPost;

      $scope.ppp = $sce.trustAsHtml(t);

      $scope.delete = function() {

        PostRes.delete({}, post, function() {
          console.log('successful');

          // 刷新树
          $scope.$emit('wikipostchg');

          $location.path('/wiki');

        }, function() {
          console.log('failed');
          $location.path('/wiki');
        });
      };

      $scope.createSubPost = function() {
        LabShareData.parantId = post.id;
        $location.path('/wiki/new');
      };
    }
  ]);
