define('ember-cp-validations/validators/collection', ['exports', 'ember-cp-validations/-private/ember-validator'], function (exports, _emberValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get;


  /**
   *  <i class="fa fa-hand-o-right" aria-hidden="true"></i> [See All Options](#method_validate)
   *
   *  If `true` validates that the given value is a valid collection and will add `<ATTRIBUTE>.[]` as a dependent key to the CP.
   *  If `false`, validates that the given value is singular. Use this validator if you want validation to occur when the content of your collection changes.
   *
   *  ## Examples
   *
   *  ```javascript
   *  validator('collection', true)
   *  validator('collection', false)
   *  validator('collection', {
   *    collection: true,
   *    message: 'must be a collection'
   *  })
   *  ```
   *
   *  @class Collection
   *  @module Validators
   *  @extends Base
   */
  var Collection = _emberValidator.default.extend({
    _evType: 'collection',

    buildOptions: function buildOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var globalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var opts = options;

      if (typeof options === 'boolean') {
        opts = {
          collection: options
        };
      }
      return this._super(opts, defaultOptions, globalOptions);
    }
  });

  Collection.reopenClass({
    getDependentsFor: function getDependentsFor(attribute, options) {
      return options === true || get(options, 'collection') === true ? ['model.' + attribute + '.[]'] : [];
    }
  });

  exports.default = Collection;
});