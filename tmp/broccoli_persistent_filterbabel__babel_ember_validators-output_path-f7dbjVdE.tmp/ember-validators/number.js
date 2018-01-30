define('ember-validators/number', ['exports', 'ember-validators/utils/validation-error'], function (exports, _validationError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateNumber;
  var get = Ember.get,
      isNone = Ember.isNone,
      isEmpty = Ember.isEmpty,
      getProperties = Ember.getProperties;


  /**
   *  @class Number
   *  @module Validators
   */

  /**
   * @method validate
   * @param {Any} value
   * @param {Object} options
   * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
   * @param {Boolean} options.allowNone If true, skips validation if the value is null or undefined. __Default: true__
   * @param {Boolean} options.allowString If true, validator will accept string representation of a number
   * @param {Boolean} options.integer Number must be an integer
   * @param {Boolean} options.positive Number must be greater than 0
   * @param {Boolean} options.odd Number must be odd
   * @param {Boolean} options.even Number must be even
   * @param {Number} options.is Number must be equal to this value
   * @param {Number} options.lt Number must be less than this value
   * @param {Number} options.lte Number must be less than or equal to this value
   * @param {Number} options.gt Number must be greater than this value
   * @param {Number} options.gte Number must be greater than or equal to this value
   * @param {Number} options.multipleOf Number must be a multiple of this value
   * @param {Object} model
   * @param {String} attribute
   */
  function validateNumber(value, options) {
    var numValue = Number(value);
    var optionKeys = Object.keys(options);

    var _getProperties = getProperties(options, ['allowBlank', 'allowNone', 'allowString', 'integer']),
        allowBlank = _getProperties.allowBlank,
        _getProperties$allowN = _getProperties.allowNone,
        allowNone = _getProperties$allowN === undefined ? true : _getProperties$allowN,
        allowString = _getProperties.allowString,
        integer = _getProperties.integer;

    if (!allowNone && isNone(value)) {
      return (0, _validationError.default)('notANumber', value, options);
    }

    if (allowBlank && isEmpty(value)) {
      return true;
    }

    if (typeof value === 'string' && (isEmpty(value) || !allowString)) {
      return (0, _validationError.default)('notANumber', value, options);
    }

    if (!isNumber(numValue)) {
      return (0, _validationError.default)('notANumber', value, options);
    }

    if (integer && !isInteger(numValue)) {
      return (0, _validationError.default)('notAnInteger', value, options);
    }

    for (var i = 0; i < optionKeys.length; i++) {
      var type = optionKeys[i];
      var returnValue = _validateType(type, options, numValue);

      if (typeof returnValue !== 'boolean') {
        return returnValue;
      }
    }

    return true;
  }

  function _validateType(type, options, value) {
    var expected = get(options, type);
    var actual = value;

    if (type === 'is' && actual !== expected) {
      return (0, _validationError.default)('equalTo', value, options);
    } else if (type === 'lt' && actual >= expected) {
      return (0, _validationError.default)('lessThan', value, options);
    } else if (type === 'lte' && actual > expected) {
      return (0, _validationError.default)('lessThanOrEqualTo', value, options);
    } else if (type === 'gt' && actual <= expected) {
      return (0, _validationError.default)('greaterThan', value, options);
    } else if (type === 'gte' && actual < expected) {
      return (0, _validationError.default)('greaterThanOrEqualTo', value, options);
    } else if (type === 'positive' && actual < 0) {
      return (0, _validationError.default)('positive', value, options);
    } else if (type === 'odd' && actual % 2 === 0) {
      return (0, _validationError.default)('odd', value, options);
    } else if (type === 'even' && actual % 2 !== 0) {
      return (0, _validationError.default)('even', value, options);
    } else if (type === 'multipleOf' && !isInteger(actual / expected)) {
      return (0, _validationError.default)('multipleOf', value, options);
    }

    return true;
  }

  /*
    Use polyfills instead of Number.isNaN or Number.isInteger to support IE & Safari
   */

  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  }
});