define('ember-cp-validations/validators/format', ['exports', 'ember-cp-validations/-private/ember-validator', 'ember-validators/format'], function (exports, _emberValidator, _format) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberValidator.default.extend({
    _evType: 'format',
    regularExpressions: _format.regularExpressions
  });
});