'use strict';

angular.module('mylabApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ui.bootstrap',
    'ui.router',
    'ui.ace',
    'hc.marked',
    'restangular',
    'mylabApp.post-tree'
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
