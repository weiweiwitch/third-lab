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
