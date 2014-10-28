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
