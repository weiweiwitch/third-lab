'use strict';

var Reflux = require('reflux');
var postActions = require('./postActions');
var titlesActions = require('./titlesActions');
var request = require('superagent');

var postStore = Reflux.createStore({
  listenables: postActions,
  onPostFetch: function(postId) {
    request.get('api/posts/' + postId).end(function(error, response) {
      if (response) {
        postActions.postFetchCompleted(response.body);
      } else {
        postActions.postFetchFailed(response.error);
      }
    });
  },
  onPostFetchCompleted: function(data) {
    console.log('onPostFetchCompleted');
    this.trigger(data);
    console.log('onPostFetchCompleted finish');
  },
  onPostFetchFailed: function(error) {
    console.log(error);
  },
  onPostDelete: function(postId) {
    request.del('api/posts/' + postId).end(function(error, response) {
      if (response) {
        titlesActions.titlesInit();
      } else {

      }
    });
  },

  onPostUpdate: function(post) {
    request.put('api/posts/' + post.id, post).end(function(error, response) {
      if (response) {
        postActions.postUpdateCompleted(response.body);
      } else {
        postActions.postUpdateFailed(response.error);
      }
    });
  },
  onPostUpdateCompleted: function(data) {
    console.log(data);

    this.trigger(data);
  },
  onPostUpdateFailed: function(error) {
    console.log(error);
  },

  onPostCreate: function(post) {
    request.post('api/posts', post).end(function(error, response) {
      if (response) {
        console.log('create success');
        postActions.postCreateCompleted(response.body);
      } else {
        console.log('create failed');
        postActions.postCreateFailed(response.error);
      }
    });
  },
  onPostCreateCompleted: function(data) {
    console.log(data);

    this.trigger(data);
  },
  onPostCreateFailed: function(error) {
    console.log(error);
  },
});

module.exports = postStore;
