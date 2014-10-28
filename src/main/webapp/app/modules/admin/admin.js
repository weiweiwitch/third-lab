'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'admin/admin.html',
          controller: 'AdminCtrl'
        });
    }
  ]);
