define('ember-validators/length', ['exports', 'ember-validators/utils/validation-error'], function (exports, _validationError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateLength;
  var get = Ember.get,
      isNone = Ember.isNone,
      isEmpty = Ember.isEmpty,
      getProperties = Ember.getProperties;


  /**
   *  @class Length
   *  @module Validators
   */

  /**
   * @method validate
   * @param {Any} value
   * @param {Object} options
   * @param {Boolean} options.allowNone If true, skips validation if the value is null or undefined. __Default: true__
   * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
   * @param {Boolean} options.useBetweenMessage If true, uses the between error message when `max` and `min` are both set
   * @param {Number} options.is The exact length the value can be
   * @param {Number} options.min The minimum length the value can be
   * @param {Number} options.max The maximum length the value can be
   * @param {Object} model
   * @param {String} attribute
   */
  function validateLength(value, options) {
    var _getProperties = getProperties(options, ['allowNone', 'allowBlank', 'useBetweenMessage', 'is', 'min', 'max']),
        _getProperties$allowN = _getProperties.allowNone,
        allowNone = _getProperties$allowN === undefined ? true : _getProperties$allowN,
        allowBlank = _getProperties.allowBlank,
        useBetweenMessage = _getProperties.useBetweenMessage,
        is = _getProperties.is,
        min = _getProperties.min,
        max = _getProperties.max;

    if (isNone(value)) {
      return allowNone ? true : (0, _validationError.default)('invalid', value, options);
    }

    if (allowBlank && isEmpty(value)) {
      return true;
    }

    var length = get(value, 'length');

    if (!isNone(is) && is !== length) {
      return (0, _validationError.default)('wrongLength', value, options);
    }

    if (useBetweenMessage && !isNone(min) && !isNone(max) && (length < min || length > max)) {
      return (0, _validationError.default)('between', value, options);
    }

    if (!isNone(min) && min > length) {
      return (0, _validationError.default)('tooShort', value, options);
    }

    if (!isNone(max) && max < length) {
      return (0, _validationError.default)('tooLong', value, options);
    }

    return true;
  }
});