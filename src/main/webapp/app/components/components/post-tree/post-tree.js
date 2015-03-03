'use strict';

angular.module('mylabApp.post-tree', [])
  .directive('collection', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        collection: '='
      },
      templateUrl: 'components/components/post-tree/collection-tpl.html'
    };
  })
  .directive('member', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        member: '=member'
      },
      templateUrl: 'components/components/post-tree/exp-member.html',
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
  });
