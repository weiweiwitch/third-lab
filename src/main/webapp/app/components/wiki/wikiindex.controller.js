'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('wiki', {
          url: '/wiki',
          templateUrl: 'components/wiki/wikiindex.html',
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
