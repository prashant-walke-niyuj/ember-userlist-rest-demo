define('ember-cp-validations/validators/confirmation', ['exports', 'ember-cp-validations/-private/ember-validator'], function (exports, _emberValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      assert = Ember.assert;


  /**
   *  <i class="fa fa-hand-o-right" aria-hidden="true"></i> [See All Options](#method_validate)
   *
   *  Validates that the attribute has the same value as the one of the declared attribute.
   *
   *  ## Examples
   *
   *  ```javascript
   *  email: validator('format', {
   *    type: 'email'
   *  })
   *  verifiedEmail: validator('confirmation', {
   *    on: 'email',
   *    message: 'Email addresses do not match'
   *  })
   *  ```
   *
   *  @class Confirmation
   *  @module Validators
   *  @extends Base
   */
  var Confirmation = _emberValidator.default.extend({
    _evType: 'confirmation'
  });

  Confirmation.reopenClass({
    getDependentsFor: function getDependentsFor(attribute, options) {
      var on = get(options, 'on');

      assert('[validator:confirmation] [' + attribute + '] \'on\' must be a string', typeof on === 'string');

      return on ? ['model.' + on] : [];
    }
  });

  exports.default = Confirmation;
});