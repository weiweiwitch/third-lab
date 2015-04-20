'use strict';

var Reflux = require('reflux');

var postActions = Reflux.createActions([
  'postFetch',
  'postFetchCompleted',
  'postFetchFailed'
]);

module.exports = postActions;
