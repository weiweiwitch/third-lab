'use strict';

var Reflux = require('reflux');
var postActions = require('./postActions');
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
    console.log(data);
    this.trigger(data);
  },
  onPostFetchFailed: function(error) {
    console.log(error);
  }
  });

  module.exports = postStore;
