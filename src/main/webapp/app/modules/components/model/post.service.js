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
