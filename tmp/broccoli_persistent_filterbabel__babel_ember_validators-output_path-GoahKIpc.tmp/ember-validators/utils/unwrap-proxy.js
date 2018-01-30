define('ember-validators/utils/unwrap-proxy', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = unwrapProxy;
  exports.isProxy = isProxy;
  var get = Ember.get;
  function unwrapProxy(o) {
    return isProxy(o) ? unwrapProxy(get(o, 'content')) : o;
  }

  function isProxy(o) {
    return !!(o && (o instanceof Ember.ObjectProxy || o instanceof Ember.ArrayProxy));
  }
});