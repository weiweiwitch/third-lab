'use strict';

var Reflux = require('reflux');
var titlesActions = require('./actions');
var request = require('superagent');

var titleStore = Reflux.createStore({
  listenables: titlesActions,
  onTitlesInit: function() {
    request.get('api/posts').end(function(error, response) {
      if (response) {
        titlesActions.titlesInitCompleted(response.body);
      } else {
        titlesActions.titlesInitFailed(response.error);
      }
    });
  },
  onTitlesInitCompleted: function(data) {
    console.log(data);
    this.trigger(data);
  },
  onTitlesInitFailed: function(error) {
    console.log(error);
  }
});

module.exports = titleStore;
