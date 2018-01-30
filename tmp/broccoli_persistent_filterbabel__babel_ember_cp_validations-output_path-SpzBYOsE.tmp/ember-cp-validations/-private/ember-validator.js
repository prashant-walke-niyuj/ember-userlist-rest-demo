define('ember-cp-validations/-private/ember-validator', ['exports', 'ember-cp-validations/validators/base', 'ember-validators'], function (exports, _base, _emberValidators) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  exports.default = _base.default.extend({
    validate: function validate() {
      var result = _emberValidators.validate.apply(undefined, [this.get('_evType')].concat(Array.prototype.slice.call(arguments)));

      if (result && (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
        return result.message ? result.message : this.createErrorMessage(result.type, result.value, result.context);
      }

      return result;
    }
  });
});