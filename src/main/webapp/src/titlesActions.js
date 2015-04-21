'use strict';

var Reflux = require('reflux');

var titlesActions = Reflux.createActions([
  'titlesInit',
  'titlesInitCompleted',
  'titlesInitFailed',
  'titleCollapse'
]);

module.exports = titlesActions;
