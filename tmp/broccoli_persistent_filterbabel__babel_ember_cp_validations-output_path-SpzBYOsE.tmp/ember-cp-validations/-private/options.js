define('ember-cp-validations/-private/options', ['exports', 'ember-cp-validations/utils/utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      set = Ember.set,
      defineProperty = Ember.defineProperty;


  var Options = Ember.Object.extend({
    model: null,
    attribute: null,

    // Private
    __options__: null,

    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);

      var options = this.get('__options__');

      Object.keys(options).forEach(function (key) {
        var value = options[key];

        if ((0, _utils.isDescriptor)(value)) {
          defineProperty(_this, key, value);
        } else {
          set(_this, key, value);
        }
      });
    },
    copy: function copy(deep) {
      var _this2 = this;

      var options = this.get('__options__');

      if (deep) {
        return Options.create({
          model: get(this, 'model'),
          attribute: get(this, 'attribute'),
          __options__: options
        });
      }

      return Ember.Object.create(Object.keys(options).reduce(function (obj, o) {
        obj[o] = get(_this2, o);
        return obj;
      }, {}));
    }
  });

  exports.default = Options;
});