'use strict';

var Reflux = require('reflux');
var titlesActions = require('./titlesActions');
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
    this.data = data;
    this.trigger(data);
  },
  onTitlesInitFailed: function(error) {
    console.log(error);
  },
  onTitleCollapse: function() {
    this.trigger(this.data);
  }
});

module.exports = titleStore;
