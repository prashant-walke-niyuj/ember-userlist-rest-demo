define('ember-cp-validations/-private/internal-result-object', ['exports', 'ember-cp-validations/validations/error', 'ember-cp-validations/utils/utils'], function (exports, _error, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      set = Ember.set,
      isNone = Ember.isNone,
      computed = Ember.computed,
      canInvoke = Ember.canInvoke,
      makeArray = Ember.makeArray,
      defineProperty = Ember.defineProperty;
  var and = computed.and,
      not = computed.not,
      readOnly = computed.readOnly;
  exports.default = Ember.Object.extend({
    model: null,
    isValid: true,
    isValidating: false,
    message: null,
    warningMessage: null,
    attribute: '',

    attrValue: null,
    _promise: null,
    _validator: null,
    _type: readOnly('_validator._type'),

    init: function init() {
      this._super.apply(this, arguments);

      defineProperty(this, 'attrValue', computed.readOnly('model.' + get(this, 'attribute')));

      if (this.get('isAsync')) {
        this._handlePromise();
      }
    },


    isWarning: readOnly('_validator.isWarning'),
    isInvalid: not('isValid'),
    isNotValidating: not('isValidating'),
    isTruelyValid: and('isNotValidating', 'isValid'),
    isTruelyInvalid: and('isNotValidating', 'isInvalid'),

    isAsync: computed('_promise', function () {
      return (0, _utils.isPromise)(get(this, '_promise'));
    }),

    isDirty: computed('attrValue', function () {
      var model = get(this, 'model');
      var attribute = get(this, 'attribute');
      var attrValue = get(this, 'attrValue');

      // Check default model values
      if ((0, _utils.isDsModel)(model) && canInvoke(model, 'eachAttribute')) {
        var attrMeta = model.get('constructor.attributes').get(attribute);

        if (attrMeta) {
          var defaultValue = attrMeta.options.defaultValue;


          if (!isNone(defaultValue)) {
            return defaultValue !== attrValue;
          }
        }
      }
      return !isNone(attrValue);
    }),

    messages: computed('message', function () {
      return makeArray(get(this, 'message'));
    }),

    error: computed('isInvalid', 'type', 'message', 'attribute', function () {
      if (get(this, 'isInvalid')) {
        return _error.default.create({
          type: get(this, '_type'),
          message: get(this, 'message'),
          attribute: get(this, 'attribute')
        });
      }

      return null;
    }),

    errors: computed('error', function () {
      return makeArray(get(this, 'error'));
    }),

    warningMessages: computed('warningMessage', function () {
      return makeArray(get(this, 'warningMessage'));
    }),

    warning: computed('isWarning', 'type', 'warningMessage', 'attribute', function () {
      if (get(this, 'isWarning') && !isNone(get(this, 'warningMessage'))) {
        return _error.default.create({
          type: get(this, '_type'),
          message: get(this, 'warningMessage'),
          attribute: get(this, 'attribute')
        });
      }

      return null;
    }),

    warnings: computed('warning', function () {
      return makeArray(get(this, 'warning'));
    }),

    _handlePromise: function _handlePromise() {
      var _this = this;

      set(this, 'isValidating', true);

      get(this, '_promise').finally(function () {
        set(_this, 'isValidating', false);
      });
    }
  });
});