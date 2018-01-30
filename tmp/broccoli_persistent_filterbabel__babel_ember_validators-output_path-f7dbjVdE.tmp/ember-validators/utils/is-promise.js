define('ember-validators/utils/is-promise', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isPromise;
  var canInvoke = Ember.canInvoke;
  function isPromise(p) {
    return !!(p && canInvoke(p, 'then'));
  }
});