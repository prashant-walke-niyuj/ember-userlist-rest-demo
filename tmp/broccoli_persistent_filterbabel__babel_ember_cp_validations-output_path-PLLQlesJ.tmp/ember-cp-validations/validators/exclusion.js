define('ember-cp-validations/validators/exclusion', ['exports', 'ember-cp-validations/-private/ember-validator'], function (exports, _emberValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberValidator.default.extend({
    _evType: 'exclusion'
  });
});