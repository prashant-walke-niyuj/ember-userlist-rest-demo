define('ember-cp-validations/-private/result', ['exports', 'ember-cp-validations/validations/result-collection', 'ember-cp-validations/validations/warning-result-collection', 'ember-cp-validations/-private/internal-result-object'], function (exports, _resultCollection, _warningResultCollection, _internalResultObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var get = Ember.get,
      set = Ember.set,
      isNone = Ember.isNone,
      isArray = Ember.isArray,
      computed = Ember.computed,
      setProperties = Ember.setProperties,
      getProperties = Ember.getProperties;
  var readOnly = computed.readOnly;


  /**
   * __PRIVATE__
   *
   * @module Validations
   * @class Result
   * @private
   */

  var Result = Ember.Object.extend({

    /**
     * @property model
     * @type {Object}
     */
    model: null,

    /**
     * @property attribute
     * @type {String}
     */
    attribute: '',

    /**
     * @property _promise
     * @async
     * @private
     * @type {Promise}
     */
    _promise: null,

    /**
     * The validator that returned this result
     * @property _validator
     * @private
     * @type {Validator}
     */
    _validator: null,

    /**
     * Determines if the _result object is readOnly.
     *
     * This is needed because ResultCollections and global validation objects control their own
     * state via CPs
     *
     * @property _isReadOnly
     * @private
     * @readOnly
     * @type {Boolean}
     */
    _isReadOnly: computed('_result', function () {
      var validations = get(this, '_result');
      return validations instanceof _resultCollection.default || get(validations, 'isValidations');
    }).readOnly(),

    /**
     * @property isWarning
     * @readOnly
     * @type {Boolean}
     */
    isWarning: readOnly('_validator.isWarning'),

    /**
     * @property isValid
     * @readOnly
     * @type {Boolean}
     */
    isValid: readOnly('_result.isValid'),

    /**
     * @property isInvalid
     * @readOnly
     * @type {Boolean}
     */
    isInvalid: readOnly('_result.isInvalid'),

    /**
     * @property isValidating
     * @readOnly
     * @type {Boolean}
     */
    isValidating: readOnly('_result.isValidating'),

    /**
     * @property isTruelyValid
     * @readOnly
     * @type {Boolean}
     */
    isTruelyValid: readOnly('_result.isTruelyValid'),

    /**
     * @property isTruelyInvalid
     * @readOnly
     * @type {Boolean}
     */
    isTruelyInvalid: readOnly('_result.isTruelyInvalid'),

    /**
     * @property isAsync
     * @readOnly
     * @type {Boolean}
     */
    isAsync: readOnly('_result.isAsync'),

    /**
     * @property isDirty
     * @readOnly
     * @type {Boolean}
     */
    isDirty: readOnly('_result.isDirty'),

    /**
     * @property message
     * @readOnly
     * @type {String}
     */
    message: readOnly('_result.message'),

    /**
     * @property messages
     * @readOnly
     * @type {Array}
     */
    messages: readOnly('_result.messages'),

    /**
     * @property error
     * @readOnly
     * @type {Object}
     */
    error: readOnly('_result.error'),

    /**
     * @property errors
     * @readOnly
     * @type {Array}
     */
    errors: readOnly('_result.errors'),

    /**
     * @property warningMessage
     * @readOnly
     * @type {String}
     */
    warningMessage: readOnly('_result.warningMessage'),

    /**
     * @property warningMessages
     * @readOnly
     * @type {Array}
     */
    warningMessages: readOnly('_result.warningMessages'),

    /**
     * @property warning
     * @readOnly
     * @type {Object}
     */
    warning: readOnly('_result.warning'),

    /**
     * @property warnings
     * @readOnly
     * @type {Array}
     */
    warnings: readOnly('_result.warnings'),

    /**
     * This hold all the logic for the above CPs. We do this so we can easily switch this object out with a different validations object
     * @property _result
     * @private
     * @type {Result}
     */
    _result: computed('model', 'attribute', '_promise', '_validator', function () {
      return _internalResultObject.default.create(getProperties(this, ['model', 'attribute', '_promise', '_validator']));
    }),

    init: function init() {
      this._super.apply(this, arguments);

      if (get(this, 'isAsync') && !get(this, '_isReadOnly')) {
        this._handlePromise();
      }
    },
    update: function update(value) {
      var result = get(this, '_result');
      var attribute = get(this, 'attribute');
      var isWarning = get(this, 'isWarning');
      var Collection = isWarning ? _warningResultCollection.default : _resultCollection.default;

      if (isNone(value)) {
        return this.update(false);
      } else if (get(value, 'isValidations')) {
        set(this, '_result', Collection.create({ attribute: attribute, content: [value] }));
      } else if (isArray(value)) {
        set(this, '_result', Collection.create({ attribute: attribute, content: value }));
      } else if (!get(this, '_isReadOnly')) {
        if (typeof value === 'string') {
          var _setProperties;

          setProperties(get(this, '_result'), (_setProperties = {}, _defineProperty(_setProperties, isWarning ? 'warningMessage' : 'message', value), _defineProperty(_setProperties, 'isValid', isWarning ? true : false), _setProperties));
        } else if (typeof value === 'boolean') {
          set(result, 'isValid', value);
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          setProperties(result, value);
        }
      }
    },
    _handlePromise: function _handlePromise() {
      var _this = this;

      get(this, '_promise').then(function (value) {
        return _this.update(value);
      }, function (value) {
        return _this.update(value);
      }).catch(function (reason) {
        // TODO: send into error state
        throw reason;
      });
    }
  });

  exports.default = Result;
});