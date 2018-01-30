define('ember-validators/index', ['exports', 'ember-require-module'], function (exports, _emberRequireModule) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.validate = validate;
  var assert = Ember.assert,
      isPresent = Ember.isPresent;
  function validate(type) {
    var validator = (0, _emberRequireModule.default)('ember-validators/' + type);

    assert('Validator not found of type: ' + type + '.', isPresent(validator));

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return validator.apply(undefined, args);
  }
});