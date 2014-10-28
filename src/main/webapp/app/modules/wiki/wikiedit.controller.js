'use strict';

angular.module('mylabApp')
  .filter('toMark', function($sce) {
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
