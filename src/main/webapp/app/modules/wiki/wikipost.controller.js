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

        var textPrefix = '';
        for (var d = 0; d < t.depth; d++) {
          console.log(t.depth);
          textPrefix += '*';
        }
        var headingData = {
          depth: t.depth,
          text: textPrefix + t.text,
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
