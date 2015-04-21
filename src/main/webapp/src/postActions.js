'use strict';

var Reflux = require('reflux');

var postActions = Reflux.createActions([
  'postFetch',
  'postFetchCompleted',
  'postFetchFailed',
  'postDelete',
  'postDeleteCompleted',
  'postDeleteFailed',
  'postUpdate',
  'postUpdateCompleted',
  'postUpdateFailed'
]);

module.exports = postActions;
