define('ember-cp-validations/validators/alias', ['exports', 'ember-cp-validations/validators/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      assert = Ember.assert,
      isPresent = Ember.isPresent,
      getProperties = Ember.getProperties;


  /**
   *  <i class="fa fa-hand-o-right" aria-hidden="true"></i> [See All Options](#method_validate)
   *
   *  Creates an alias between a single attribute's validations to another.
   *  This copies all messages, errors, etc., to the current attribute as well as
   *  its validation state (isValid, isValidating, etc.)
   *
   *  ## Examples
   *
   *  ```javascript
   *  validator('alias', 'attribute')
   *  validator('alias', {
   *    alias: 'attribute',
   *    firstMessageOnly: true
   *  })
   *  ```
   *
   *  @class Alias
   *  @module Validators
   *  @extends Base
   */
  var Alias = _base.default.extend({
    buildOptions: function buildOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var globalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var opts = options;

      if (typeof options === 'string') {
        opts = {
          alias: options
        };
      }
      return this._super(opts, defaultOptions, globalOptions);
    },
    validate: function validate(value, options, model, attribute) {
      var _getProperties = getProperties(options, ['alias', 'firstMessageOnly']),
          alias = _getProperties.alias,
          firstMessageOnly = _getProperties.firstMessageOnly;

      assert('[validator:alias] [' + attribute + '] option \'alias\' is required', isPresent(alias));

      var aliasValidation = get(model, 'validations.attrs.' + alias);

      return firstMessageOnly ? get(aliasValidation, 'message') : get(aliasValidation, 'content');
    }
  });

  Alias.reopenClass({
    getDependentsFor: function getDependentsFor(attribute, options) {
      var alias = typeof options === 'string' ? options : get(options, 'alias');

      assert('[validator:alias] [' + attribute + '] \'alias\' must be a string', typeof alias === 'string');

      return [alias + '.messages.[]', alias + '.isTruelyValid'];
    }
  });

  exports.default = Alias;
});