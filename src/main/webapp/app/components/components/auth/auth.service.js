'use strict';

angular.module('mylabApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = User.get();
    }

    console.log('Auth init');
    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        })
          .success(function(data) {
            // 成功，在cookie中保存token信息
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            deferred.resolve(data);
            return cb();
          })
          .error(function(err) {
              this.logout();
              deferred.reject(err);
              return cb(err);
            }
            .bind(this)); // 这里的bind方法将匿名方法绑定到auth服务对象，这样里面的logout才能正常执行！

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        // 从cookie中移除token，并清空当前用户
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        // 调用保存用户的请求
        return User.save(user, function(data) {
              // 成功
              $cookieStore.put('token', data.token);
              currentUser = User.get();
              return cb(user);

            }, function(err) {
              this.logout();
              return cb(err);
            }
            .bind(this)) // 这里的bind方法将匿名方法绑定到auth服务对象，这样里面的logout才能正常执行！
          .$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });