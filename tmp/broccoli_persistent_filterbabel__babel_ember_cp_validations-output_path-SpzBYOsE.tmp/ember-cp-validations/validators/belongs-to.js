define('ember-cp-validations/validators/belongs-to', ['exports', 'ember-cp-validations/validators/base', 'ember-cp-validations/utils/utils'], function (exports, _base, _utils) {
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

  var get = Ember.get;


  /**
   *  <i class="fa fa-hand-o-right" aria-hidden="true"></i> [See All Options](#method_validate)
   *
   *  Identifies a `belongs-to` relationship in an Ember Data Model or Ember.Object.
   *  This is used to create a link to the validations object of the child model.
   *
   *  _**Note:** Validations must exist on **both** models/objects_
   *
   *  ### Ember Model
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    details: validator('belongs-to')
   *  });
   *
   *  export default DS.Model.extend(Validations, {
   *    'details': DS.belongsTo('user-detail')
   *  });
   *  ```
   *
   *  ```javascript
   *  // model/user-details.js
   *
   *  const Validations = buildValidations({
   *    firstName: validator('presence', true),
   *    lastName: validator('presence', true)
   *  });
   *
   *  export default DS.Model.extend(Validations, {
   *    "firstName": attr('string'),
   *    "lastName": attr('string'),
   *  });
   *  ```
   *
   *  ### Ember Object
   *
   *  ```javascript
   *  // model/users.js
   *
   *  import UserDetails from '../user-details';
   *
   *  const Validations = buildValidations({
   *    details: validator('belongs-to')
   *  });
   *
   *  export default Ember.Object.extend(Validations, {
   *    details: null,
   *
   *    init() {
   *      this._super(...arguments);
   *      let owner = Ember.getOwner(this);
   *      this.set('details', UserDetails.create(owner.ownerInjection()));
   *    }
   *  });
   *  ```
   *
   *  From our `user` model, we can now check any validation property on the `user-details` model.
   *
   *  ```javascript
   *  get(model, 'validations.attrs.details.isValid')
   *  get(model, 'validations.attrs.details.messages')
   *  ```
   *
   *  @class Belongs To
   *  @module Validators
   *  @extends Base
   */
  var BelongsTo = _base.default.extend({
    validate: function validate(value) {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (value) {
        if ((0, _utils.isPromise)(value)) {
          return value.then(function (model) {
            return _this.validate.apply(_this, [model].concat(_toConsumableArray(args)));
          });
        }

        return get(value, 'validations');
      }

      return true;
    }
  });

  BelongsTo.reopenClass({
    getDependentsFor: function getDependentsFor(attribute) {
      return ['model.' + attribute + '.isDeleted', 'model.' + attribute + '.content.isDeleted', 'model.' + attribute + '.validations', 'model.' + attribute + '.content.validations'];
    }
  });

  exports.default = BelongsTo;
});