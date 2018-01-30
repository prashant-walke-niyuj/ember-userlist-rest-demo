define('ember-validators/presence', ['exports', 'ember-validators/utils/validation-error', 'ember-validators/utils/unwrap-proxy'], function (exports, _validationError, _unwrapProxy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validatePresence;
  var assert = Ember.assert,
      isEmpty = Ember.isEmpty,
      isPresent = Ember.isPresent,
      getProperties = Ember.getProperties;


  /**
   *  @class Presence
   *  @module Validators
   */

  /**
   * @method validate
   * @param {Any} value
   * @param {Object} options
   * @param {Boolean} options.presence If true validates that the given value is not empty,
   *                                   if false, validates that the given value is empty.
   * @param {Boolean} options.ignoreBlank If true, treats an empty or whitespace string as not present
   * @param {Object} model
   * @param {String} attribute
   */
  function validatePresence(value, options, model, attribute) {
    var _getProperties = getProperties(options, ['presence', 'ignoreBlank']),
        presence = _getProperties.presence,
        ignoreBlank = _getProperties.ignoreBlank;

    var v = (0, _unwrapProxy.default)(value);
    var _isPresent = ignoreBlank ? isPresent(v) : !isEmpty(v);

    assert('[validator:presence] [' + attribute + '] option \'presence\' is required', isPresent(presence));

    if (presence === true && !_isPresent) {
      return (0, _validationError.default)('blank', value, options);
    }

    if (presence === false && _isPresent) {
      return (0, _validationError.default)('present', value, options);
    }

    return true;
  }
});