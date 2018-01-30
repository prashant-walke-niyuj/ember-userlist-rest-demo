define('ember-cp-validations/validations/result-collection', ['exports', 'ember-cp-validations/utils/cycle-breaker', 'ember-cp-validations/utils/array'], function (exports, _cycleBreaker, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      set = Ember.set,
      RSVP = Ember.RSVP,
      computed = Ember.computed,
      isArray = Ember.isArray,
      isNone = Ember.isNone,
      emberArray = Ember.A;


  /*
    CP Macros
   */
  function isAny(collection, key, value, defaultValue) {
    return computed(collection + '.@each.' + key, (0, _cycleBreaker.default)(function () {
      return get(this, collection).isAny(key, value);
    }, defaultValue));
  }

  function isEvery(collection, key, value, defaultValue) {
    return computed(collection + '.@each.' + key, (0, _cycleBreaker.default)(function () {
      return get(this, collection).isEvery(key, value);
    }, defaultValue));
  }

  /**
   * @module Validations
   * @class ResultCollection
   */
  exports.default = Ember.ArrayProxy.extend({
    init: function init() {
      set(this, 'content', emberArray((0, _array.compact)(get(this, 'content'))));
      this._super.apply(this, arguments);
    },


    /**
     * The attribute that this collection belongs to
     *
     * @property attribute
     * @type {String}
     */
    attribute: null,

    /**
     * ```javascript
     * // Examples
     * get(user, 'validations.isInvalid')
     * get(user, 'validations.attrs.username.isInvalid')
     * ```
     *
     * @property isInvalid
     * @default false
     * @readOnly
     * @type {Boolean}
     */
    isInvalid: computed.not('isValid').readOnly(),

    /**
     * ```javascript
     * // Examples
     * get(user, 'validations.isValid')
     * get(user, 'validations.attrs.username.isValid')
     * ```
     *
     * @property isValid
     * @default true
     * @readOnly
     * @type {Boolean}
     */
    isValid: isEvery('content', 'isValid', true, true).readOnly(),

    /**
     * This property is toggled only if there is an async validation
     *
     * ```javascript
     * // Examples
     * get(user, 'validations.isValidating')
     * get(user, 'validations.attrs.username.isValidating')
     * ```
     *
     * @property isValidating
     * @default false
     * @readOnly
     * @type {Boolean}
     */
    isValidating: isAny('content', 'isValidating', true, false).readOnly(),

    /**
     * Will be true only if isValid is `true` and isValidating is `false`
     *
     * ```javascript
     * // Examples
     * get(user, 'validations.isTruelyValid')
     * get(user, 'validations.attrs.username.isTruelyValid')
     * ```
     *
     * @property isTruelyValid
     * @default true
     * @readOnly
     * @type {Boolean}
     */
    isTruelyValid: isEvery('content', 'isTruelyValid', true, true).readOnly(),

    /**
     * Will be true only if isValid is `false` and isValidating is `false`
     *
     * ```javascript
     * // Examples
     * get(user, 'validations.isTruelyInvalid')
     * get(user, 'validations.attrs.username.isTruelyInvalid')
     * ```
     *
     * @property isTruelyInvalid
     * @default false
     * @readOnly
     * @type {Boolean}
     */
    isTruelyInvalid: isAny('content', 'isTruelyInvalid', true, false).readOnly(),

    /**
     * Will be true is the attribute in question is not `null` or `undefined`. If the object being
     * validated is an Ember Data Model and you have a `defaultValue` specified, then it will use that for comparison.
     *
     * ```javascript
     * // Examples
     * // 'username' : DS.attr('string', { defaultValue: 'johndoe' })
     * get(user, 'validations.isDirty')
     * get(user, 'validations.attrs.username.isDirty')
     * ```
     *
     * @property isDirty
     * @default false
     * @readOnly
     * @type {Boolean}
     */
    isDirty: isAny('content', 'isDirty', true, false).readOnly(),

    /**
     * Will be `true` only if a validation returns a promise
     *
     * ```javascript
     * // Examples
     * get(user, 'validations.isAsync')
     * get(user, 'validations.attrs.username.isAsync')
     * ```
     *
     * @property isAsync
     * @default false
     * @readOnly
     * @type {Boolean}
     */
    isAsync: isAny('content', 'isAsync', true, false).readOnly(),

    /**
     * A collection of all error messages on the object in question
     *
     * ```javascript
     * // Examples
     * get(user, 'validations.messages')
     * get(user, 'validations.attrs.username.messages')
     * ```
     *
     * @property messages
     * @readOnly
     * @type {Array}
     */
    messages: computed('content.@each.messages', (0, _cycleBreaker.default)(function () {
      return (0, _array.uniq)((0, _array.compact)((0, _array.flatten)(this.getEach('messages'))));
    })).readOnly(),

    /**
     * An alias to the first message in the messages collection.
     *
     * ```javascript
     * // Example
     * get(user, 'validations.message')
     * get(user, 'validations.attrs.username.message')
     * ```
     *
     * @property message
     * @readOnly
     * @type {String}
     */
    message: computed.readOnly('messages.firstObject'),

    /**
     * Will be `true` if there are warnings in the collection.
     *
     * ```javascript
     * // Example
     * get(user, 'validations.hasWarnings')
     * get(user, 'validations.attrs.username.hasWarnings')
     * ```
     *
     * @property hasWarnings
     * @readOnly
     * @type {String}
     */
    hasWarnings: computed.notEmpty('warningMessages').readOnly(),

    /**
     * A collection of all warning messages on the object in question
     *
     * ```javascript
     * // Examples
     * get(user, 'validations.warningMessages')
     * get(user, 'validations.attrs.username.warningMessages')
     * ```
     *
     * @property warningMessages
     * @readOnly
     * @type {Array}
     */
    warningMessages: computed('content.@each.warningMessages', (0, _cycleBreaker.default)(function () {
      return (0, _array.uniq)((0, _array.compact)((0, _array.flatten)(this.getEach('warningMessages'))));
    })).readOnly(),

    /**
     * An alias to the first message in the warningMessages collection.
     *
     * ```javascript
     * // Example
     * get(user, 'validations.warningMessage')
     * get(user, 'validations.attrs.username.warningMessage')
     * ```
     *
     * @property warningMessage
     * @readOnly
     * @type {String}
     */
    warningMessage: computed.readOnly('warningMessages.firstObject'),

    /**
     * A collection of all {{#crossLink "Error"}}Warnings{{/crossLink}} on the object in question.
     * Each warning object includes the warning message and it's associated attribute name.
     *
     * ```javascript
     * // Example
     * get(user, 'validations.warnings')
     * get(user, 'validations.attrs.username.warnings')
     * ```
     *
     * @property warnings
     * @readOnly
     * @type {Array}
     */
    warnings: computed('attribute', 'content.@each.warnings', (0, _cycleBreaker.default)(function () {
      return this._computeErrorCollection(this.getEach('warnings'));
    })).readOnly(),

    /**
     * An alias to the first {{#crossLink "Warning"}}{{/crossLink}} in the warnings collection.
     *
     * ```javascript
     * // Example
     * get(user, 'validations.warning')
     * get(user, 'validations.attrs.username.warning')
     * ```
     *
     * @property warning
     * @readOnly
     * @type {Error}
     */
    warning: computed.readOnly('warnings.firstObject'),

    /**
     * A collection of all {{#crossLink "Error"}}Errors{{/crossLink}} on the object in question.
     * Each error object includes the error message and it's associated attribute name.
     *
     * ```javascript
     * // Example
     * get(user, 'validations.errors')
     * get(user, 'validations.attrs.username.errors')
     * ```
     *
     * @property errors
     * @readOnly
     * @type {Array}
     */
    errors: computed('attribute', 'content.@each.errors', (0, _cycleBreaker.default)(function () {
      return this._computeErrorCollection(this.getEach('errors'));
    })).readOnly(),

    /**
     * An alias to the first {{#crossLink "Error"}}{{/crossLink}} in the errors collection.
     *
     * ```javascript
     * // Example
     * get(user, 'validations.error')
     * get(user, 'validations.attrs.username.error')
     * ```
     *
     * @property error
     * @readOnly
     * @type {Error}
     */
    error: computed.readOnly('errors.firstObject'),

    /**
     * All built options of the validators associated with the results in this collection grouped by validator type
     *
     * ```javascript
     * // Given the following validators
     * {
     *   username: [
     *     validator('presence', true),
     *     validator('length', { max: 15 }),
     *     validator('format', { regex: /foo/ }),
     *     validator('format', { regex: /bar/ }),
     *   ]
     * }
     * ```
     *
     * ```js
     * get(user, 'validations.attrs.username.options')
     * ```
     *
     * The above will return the following
     * ```js
     * {
     *   'presence': { presence: true},
     *   'length': { max: 15 },
     *   'regex': [{ regex: /foo/ }, { regex: /bar/ }]
     * }
     * ```
     *
     * @property options
     * @readOnly
     * @type {Object}
     */
    options: computed('_contentValidators.@each.options', function () {
      return this._groupValidatorOptions(get(this, '_contentValidators'));
    }).readOnly(),

    /**
     * @property _promise
     * @async
     * @private
     * @type {Promise}
     */
    _promise: computed('content.@each._promise', '_contentResults.@each._promise', (0, _cycleBreaker.default)(function () {
      return RSVP.allSettled((0, _array.compact)((0, _array.flatten)([this.get('_contentResults').getEach('_promise'), this.getEach('_promise')])));
    })).readOnly(),

    /**
    * @property _contentResults
    * @type {Array}
    * @private
    */
    _contentResults: computed('content.@each._result', function () {
      return emberArray((0, _array.compact)(this.getEach('_result')));
    }).readOnly(),

    /**
     * @property _contentValidators
     * @type {Array}
     * @private
     */
    _contentValidators: computed.mapBy('content', '_validator').readOnly(),

    _computeErrorCollection: function _computeErrorCollection() {
      var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var attribute = get(this, 'attribute');
      var errors = (0, _array.uniq)((0, _array.compact)((0, _array.flatten)(collection)));

      errors.forEach(function (e) {
        if (attribute && e.get('attribute') !== attribute) {
          e.set('parentAttribute', attribute);
        }
      });

      return errors;
    },


    /**
     * Used by the `options` property to create a hash from the `content` that is grouped by validator type.
     * If there is more than 1 of a type, it groups it into an array of option objects.
     */
    _groupValidatorOptions: function _groupValidatorOptions() {
      var validators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return validators.reduce(function (options, v) {
        if (isNone(v) || isNone(get(v, '_type'))) {
          return options;
        }

        var type = get(v, '_type');
        var vOpts = get(v, 'options').copy();

        if (options[type]) {
          if (isArray(options[type])) {
            options[type].push(vOpts);
          } else {
            options[type] = [options[type], vOpts];
          }
        } else {
          options[type] = vOpts;
        }
        return options;
      }, {});
    }
  });
});