define('ember-validators/collection', ['exports', 'ember-validators/utils/validation-error'], function (exports, _validationError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateCollection;
  var get = Ember.get,
      assert = Ember.assert,
      isArray = Ember.isArray,
      isPresent = Ember.isPresent;


  /**
   *  @class Collection
   *  @module Validators
   */

  /**
    * @method validate
    * @param {Any} value
    * @param {Object} options
    * @param {Boolean} options.collection
    * @param {Object} model
    * @param {String} attribute
    */
  function validateCollection(value, options, model, attribute) {
    var collection = get(options, 'collection');

    assert('[validator:collection] [' + attribute + '] option \'collection\' is required', isPresent(collection));

    if (collection === true && !isArray(value)) {
      return (0, _validationError.default)('collection', value, options);
    }

    if (collection === false && isArray(value)) {
      return (0, _validationError.default)('singular', value, options);
    }

    return true;
  }
});