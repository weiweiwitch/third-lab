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
                return PostRes.get($stateParams.id);
              }
            ]
          }
        });
    }
  ])
  .controller('WikiPostCtrl', ['$scope', '$sce', '$location', 'LabShareData', 'PostRes', 'post', 'marked',
    function($scope, $sce, $location, LabShareData, PostRes, post, marked) {
      $scope.post = post;

      var t = post.mkPost;

      // $scope.ppp = $sce.trustAsHtml(t);
      $scope.ppp = marked(post.postText);
      
      $scope.delete = function() {

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

      $scope.createSubPost = function() {
        LabShareData.parantId = post.id;
        $location.path('/wiki/new');
      };
    }
  ]);
