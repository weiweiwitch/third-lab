'use strict';

angular.module('mylabApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'account/login/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'account/signup/signup.html',
          controller: 'SignupCtrl'
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'account/settings/settings.html',
          controller: 'SettingsCtrl',
          authenticate: true
        });
    }
  ]);
