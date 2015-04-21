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
  'postUpdateFailed',
  'postCreate',
  'postCreateCompleted',
  'postCreateFailed'
]);

module.exports = postActions;
