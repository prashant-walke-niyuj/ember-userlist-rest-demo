define('ember-require-module/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = requireModule;
  /* globals requirejs, require */

  function requireModule(module) {
    var exportName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

    var rjs = requirejs;

    if (rjs.has && rjs.has(module) || !rjs.has && (rjs.entries[module] || rjs.entries[module + '/index'])) {
      return require(module)[exportName];
    }
  }
});