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
  .factory('PostRes', function(Restangular) {
    console.log('PostRes init');
    var PostRest = Restangular.all('api/posts');
    return PostRest;
    // return $resource('/api/posts/:id', {
    //   id: '@_id', // 动态参数
    // }, {
    //   update: {
    //     method: 'PUT'
    //   }
    // });
  });

'use strict';

// 下面这个是导航栏的controller。
// 在这个app里面，通过ng-include，导航栏被嵌入到各个视图的view中。
angular.module('mylabApp')
  .controller('NavbarCtrl', function($scope, $location, Auth) {
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
  .filter('toMark', function() {
    return function(data) {
      return data;
      // var t = marked(data);
      // var ht = $sce.trustAsHtml(t);
      // var rrr = ht.$$unwrapTrustedValue();
      // return rrr;
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
                return PostRes.get($stateParams.id);
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
  .controller('WikiPostEditCtrl', ['$scope', '$location', '$filter', 'PostRes', 'post', 'Restangular',
    function($scope, $location, $filter, PostRes, post, Restangular) {
      $scope.text = '这是文章的编辑页';

      $scope.post = Restangular.copy(post);
      // if (post.post !== '') {
      //   $scope.markedPost = $filter('toMark')(post.post);
      // }

      $scope.isNew = function() {
        return false;
      };

      $scope.aceChanged = function(e) {
        console.log(e);
      };

      $scope.saveUpdate = function() {
        console.log('测试保存更新 ' + $scope.post.postText);
        console.log($scope.post);
        $scope.post.ddd = 'sfsfsdfsdfsdfsdfsdfsdfsfdsfsfsdf';
        $scope.post.put().then(function() {
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
        postText: '',
        parantId: 0
      };

      if (LabShareData.parantId !== undefined) {
        $scope.post.parantId = LabShareData.parantId;
      }

      $scope.aceChanged = function(e) {
        console.log(e);
      };

      $scope.isNew = function() {
        return true;
      };

      $scope.saveNew = function() {
        console.log('测试保存 ' + $scope.post.postText);
        $scope.post.postText = 'sd';
        PostRes.post($scope.post).then(function() {
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
                var p = PostRes.getList();
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
      $scope.addNewPost = function() {
        delete LabShareData.parantId;
        $location.path('/wiki/new');
      };

      // 初始化列表
      var initPostList = function(posts) {
        for (var j = 0; j < posts.length; j++) {
          var eachP = posts[j];

          eachP.collapsed = true;

          if (eachP.nodes !== undefined && eachP.nodes !== null) {
            initPostList(eachP.nodes);
          }
        }
      };
      initPostList(posts);

      $scope.$on('wikipostchg', function() {
        console.log('监听到保存');

        // 临时保存树的展开状态。
        var oldPosts = $scope.posts;
        var oldList = [];
        var oldMap = {};

        // 生成原文章的列表
        var generatePostList = function(pList, pMap, ps) {

          for (var j = 0; j < ps.length; j++) {
            var eachP = ps[j];

            pList.push(eachP);
            pMap[eachP.id] = eachP;
            if (eachP.nodes !== undefined && eachP.nodes !== null) {
              generatePostList(pList, pMap, eachP.nodes);
            }
          }
        };
        generatePostList(oldList, oldMap, oldPosts);

        // 请求新的数据
        PostRes.getList().then(function(updatedPosts) {
          // 设置scope中的post 列表
          $scope.posts = updatedPosts;

          var newList = [];
          var newMap = {};
          generatePostList(newList, newMap, updatedPosts);

          // 初始化树
          initPostList(newList);

          // 更新节点状态
          for (var eachIndex = 0; eachIndex < newList.length; eachIndex++) {
            var eachNewPost = newList[eachIndex];
            var samePost = oldMap[eachNewPost.id];
            if (samePost !== undefined && samePost.collapsed === false) {
              eachNewPost.collapsed = samePost.collapsed;
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
                return PostRes.get($stateParams.id);
              }
            ]
          }
        });
    }
  ])
  .controller('WikiPostCtrl', ['$scope', '$location', 'LabShareData', 'PostRes', 'post', 'marked',
    function($scope, $location, LabShareData, PostRes, post, marked) {
      $scope.post = post;

      // 生成章节信息
      $scope.headingList = [];
      var tokens = marked.lexer(post.postText);
      console.log(tokens);
      for (var i = 0; i < tokens.length; i++) {
        var t = tokens[i];
        console.log(t.type);
        if (t === undefined || t.type !== 'heading') {
          continue;
        }

        var headingData = {
          depth: t.depth,
          text: t.text,
          type: t.type
        };

        $scope.headingList.push(headingData);
      }
      console.log($scope.headingList);

      // 解析文本
      $scope.ppp = marked(post.postText);

      // 删除方法
      $scope.delete = function() {
        // 请求删除
        $scope.post.remove().then(function() {
          console.log('successful');

          // 刷新树
          $scope.$emit('wikipostchg');

          $location.path('/wiki');

        }, function() {
          console.log('failed');
          $location.path('/wiki');
        });
      };

      // 创建子post 的方法
      $scope.createSubPost = function() {
        LabShareData.parantId = post.id;
        $location.path('/wiki/new');
      };
    }
  ]);
