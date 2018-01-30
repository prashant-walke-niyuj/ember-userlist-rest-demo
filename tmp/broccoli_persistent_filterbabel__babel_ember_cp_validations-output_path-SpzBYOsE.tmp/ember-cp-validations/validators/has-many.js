define('ember-cp-validations/validators/has-many', ['exports', 'ember-cp-validations/validators/base', 'ember-cp-validations/utils/utils'], function (exports, _base, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  /**
   *  <i class="fa fa-hand-o-right" aria-hidden="true"></i> [See All Options](#method_validate)
   *
   *  Identifies a `has-many` relationship in an Ember Data Model or Ember.Object.
   *  This is used to create a validation collection of the `has-many` validations.
   *
   *  _**Note:** Validations must exist on **all** models/objects_
   *
   *  ### Ember Models
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    friends: validator('has-many')
   *  });
   *
   *  export default DS.Model.extend(Validations, {
   *    friends: DS.hasMany('user')
   *  });
   *  ```
   *
   *  ### Ember Objects
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    friends: validator('has-many')
   *  });
   *
   *  export default Ember.Object.extend(Validations, {
   *    friends: null
   *  });
   *  ```
   *
   *  From our `user` model, we can now check validation properties on the `friends` attribute.
   *
   *  ```javascript
   *  get(model, 'validations.attrs.friends.isValid')
   *  get(model, 'validations.attrs.friends.messages')
   *  ```
   *
   *  @class Has Many
   *  @module Validators
   *  @extends Base
   */
  var HasMany = _base.default.extend({
    validate: function validate(value) {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (value) {
        if ((0, _utils.isPromise)(value)) {
          return value.then(function (models) {
            return _this.validate.apply(_this, [models].concat(_toConsumableArray(args)));
          });
        }

        return value.map(function (m) {
          return m.get('validations');
        });
      }

      return true;
    }
  });

  HasMany.reopenClass({
    getDependentsFor: function getDependentsFor(attribute) {
      /*
        The content.@each.isDeleted must be added for older ember-data versions
       */
      return ['model.' + attribute + '.[]', 'model.' + attribute + '.@each.isDeleted', 'model.' + attribute + '.content.@each.isDeleted', 'model.' + attribute + '.@each.validations', 'model.' + attribute + '.content.@each.validations'];
    }
  });

  exports.default = HasMany;
});