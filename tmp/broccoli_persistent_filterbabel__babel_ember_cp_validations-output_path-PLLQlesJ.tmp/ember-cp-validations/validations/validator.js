define('ember-cp-validations/validations/validator', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (arg1, options) {
    var props = {
      options: isNone(options) ? {} : options
    };

    if (typeof arg1 === 'function') {
      props.validate = arg1;
      props._type = 'function';
    } else if (typeof arg1 === 'string') {
      props._type = arg1;
    } else {
      throw new TypeError('[ember-cp-validations] Unexpected type for first validator argument. It should either be a string or a function');
    }

    return props;
  };

  var isNone = Ember.isNone;
});