define('ember-cp-validations/validators/dependent', ['exports', 'ember-cp-validations/validators/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var A = Ember.A,
      get = Ember.get,
      getWithDefault = Ember.getWithDefault,
      getProperties = Ember.getProperties,
      assert = Ember.assert,
      isNone = Ember.isNone,
      isEmpty = Ember.isEmpty,
      isPresent = Ember.isPresent,
      isArray = Ember.isArray;


  /**
   *  <i class="fa fa-hand-o-right" aria-hidden="true"></i> [See All Options](#method_validate)
   *
   *  Defines an attribute as valid only if its dependents are valid.
   *
   *  ## Example
   *
   *  ```javascript
   *  // Full name will only be valid if firstName and lastName are filled in
   *  validator('dependent', {
   *    on: ['firstName', 'lastName']
   *  })
   *  ```
   *
   *  @class Dependent
   *  @module Validators
   *  @extends Base
   */
  var Dependent = _base.default.extend({
    validate: function validate(value, options, model, attribute) {
      var _getProperties = getProperties(options, ['on', 'allowBlank']),
          on = _getProperties.on,
          allowBlank = _getProperties.allowBlank;

      assert('[validator:dependent] [' + attribute + '] option \'on\' is required', isPresent(on));

      if (isNone(model)) {
        return true;
      }

      if (allowBlank && isEmpty(value)) {
        return true;
      }

      var dependentValidations = getWithDefault(options, 'on', A()).map(function (dependent) {
        return get(model, 'validations.attrs.' + dependent);
      });

      if (!isEmpty(dependentValidations.filter(function (v) {
        return get(v, 'isTruelyInvalid');
      }))) {
        return this.createErrorMessage('invalid', value, options);
      }

      return true;
    }
  });

  Dependent.reopenClass({
    getDependentsFor: function getDependentsFor(attribute, options) {
      var dependents = get(options, 'on');

      assert('[validator:dependent] [' + attribute + '] \'on\' must be an array', isArray(dependents));

      if (!isEmpty(dependents)) {
        return dependents.map(function (dependent) {
          return dependent + '.isTruelyValid';
        });
      }

      return [];
    }
  });

  exports.default = Dependent;
});