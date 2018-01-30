define('ember-cp-validations/validators/base', ['exports', 'ember-cp-validations/validators/messages', 'ember-cp-validations/-private/options', 'ember-cp-validations/utils/utils'], function (exports, _messages, _options, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      set = Ember.set,
      isNone = Ember.isNone,
      computed = Ember.computed,
      getOwner = Ember.getOwner;


  /**
   * @class Base
   * @module Validators
   */
  var Base = Ember.Object.extend({

    /**
     * Options passed in to the validator when defined in the model
     * @property options
     * @type {Object}
     */
    options: null,

    /**
     * Default validation options for this specific attribute
     * @property defaultOptions
     * @type {Object}
     */
    defaultOptions: null,

    /**
     * Global validation options for this model
     * @property globalOptions
     * @type {Object}
     */
    globalOptions: null,

    /**
     * Model instance
     * @property model
     * @type {Model}
     */
    model: null,

    /**
     * Attributed name of the model this validator is attached to
     * @property attribute
     * @type {String}
     */
    attribute: null,

    /**
     * Error message object. Populated by validators/messages
     * @property errorMessages
     * @type {Object}
     */
    errorMessages: null,

    /**
     * @property isWarning
     * @type {Boolean}
     */
    isWarning: computed.bool('options.isWarning').readOnly(),

    /**
     * Validator type
     * @property _type
     * @private
     * @type {String}
     */
    _type: null,

    init: function init() {
      this._super.apply(this, arguments);
      var globalOptions = get(this, 'globalOptions');
      var defaultOptions = get(this, 'defaultOptions');
      var options = get(this, 'options');
      var owner = getOwner(this);
      var errorMessages = void 0;

      if (!isNone(owner)) {
        // Since default error messages are stored in app/validators/messages, we have to look it up via the owner
        errorMessages = owner.factoryFor('validator:messages');
      }

      // If for some reason, we can't find the messages object (i.e. unit tests), use default
      errorMessages = errorMessages || _messages.default;

      set(this, 'options', this.buildOptions(options || {}, defaultOptions || {}, globalOptions || {}));
      set(this, 'errorMessages', errorMessages.create());
    },
    buildOptions: function buildOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var globalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var builtOptions = (0, _utils.mergeOptions)(options, defaultOptions, globalOptions);

      // Overwrite the validator's value method if it exists in the options and remove it since
      // there is no need for it to be passed around
      this.value = builtOptions.value || this.value;
      delete builtOptions.value;

      return _options.default.create({
        model: get(this, 'model'),
        attribute: get(this, 'attribute'),
        __options__: builtOptions
      });
    },
    value: function value(model, attribute) {
      return get(model, attribute);
    },
    getValue: function getValue() {
      var value = this.value(get(this, 'model'), get(this, 'attribute'));
      return (0, _utils.getValidatableValue)(value);
    },
    validate: function validate() {
      return true;
    },
    createErrorMessage: function createErrorMessage(type, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var messages = this.get('errorMessages');
      var message = (0, _utils.unwrapString)(get(options, 'message'));

      set(options, 'description', messages.getDescriptionFor(get(this, 'attribute'), options));

      if (message) {
        if (typeof message === 'string') {
          message = messages.formatMessage(message, options);
        } else if (typeof message === 'function') {
          message = message.apply(this, arguments);
          message = isNone(message) ? messages.getMessageFor(type, options) : messages.formatMessage(message, options);
        }
      } else {
        message = messages.getMessageFor(type, options);
      }

      return message.trim();
    }
  });

  Base.reopenClass({
    getDependentsFor: function getDependentsFor() {
      return [];
    }
  });

  exports.default = Base;
});