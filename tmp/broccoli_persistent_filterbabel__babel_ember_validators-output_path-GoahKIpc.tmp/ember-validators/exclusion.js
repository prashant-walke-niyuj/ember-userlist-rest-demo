define('ember-validators/exclusion', ['exports', 'ember-validators/utils/validation-error'], function (exports, _validationError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateExclusion;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var get = Ember.get,
      typeOf = Ember.typeOf,
      isEmpty = Ember.isEmpty,
      assert = Ember.assert,
      getProperties = Ember.getProperties;


  /**
   *  @class Exclusion
   *  @module Validators
   */

  /**
   * @method validate
   * @param {Any} value
   * @param {Object} options
   * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
   * @param {Array} options.in The list of values this attribute should not be
   * @param {Array} options.range The range in which the attribute's value should not reside in
   * @param {Object} model
   * @param {String} attribute
   */
  function validateExclusion(value, options, model, attribute) {
    var array = get(options, 'in');

    var _getProperties = getProperties(options, ['range', 'allowBlank']),
        range = _getProperties.range,
        allowBlank = _getProperties.allowBlank;

    assert('[validator:exclusion] [' + attribute + '] no options were passed in', !isEmpty(Object.keys(options)));

    if (allowBlank && isEmpty(value)) {
      return true;
    }

    if (array && array.indexOf(value) !== -1) {
      return (0, _validationError.default)('exclusion', value, options);
    }

    if (range && range.length === 2) {
      var _range = _slicedToArray(range, 2),
          min = _range[0],
          max = _range[1];

      var equalType = typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);

      if (equalType && min <= value && value <= max) {
        return (0, _validationError.default)('exclusion', value, options);
      }
    }

    return true;
  }
});