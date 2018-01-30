define('ember-validators/confirmation', ['exports', 'ember-validators/utils/validation-error'], function (exports, _validationError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateConfirmation;
  var get = Ember.get,
      assert = Ember.assert,
      isEqual = Ember.isEqual,
      isEmpty = Ember.isEmpty,
      isPresent = Ember.isPresent;


  /**
   *  @class Confirmation
   *  @module Validators
   */

  /**
   * @method validate
   * @param {Any} value
   * @param {Object} options
   * @param {String} options.on The attribute to confirm against
   * @param {String} options.allowBlank If true, skips validation if the value is empty
   * @param {Object} model
   * @param {String} attribute
   */
  function validateConfirmation(value, options, model, attribute) {
    var on = get(options, 'on');
    var allowBlank = get(options, 'allowBlank');

    assert('[validator:confirmation] [' + attribute + '] option \'on\' is required', isPresent(on));

    if (allowBlank && isEmpty(value)) {
      return true;
    }

    if (!isEqual(value, get(model, on))) {
      return (0, _validationError.default)('confirmation', value, options);
    }

    return true;
  }
});