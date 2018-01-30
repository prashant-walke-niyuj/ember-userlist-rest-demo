define('ember-cp-validations/validators/ds-error', ['exports', 'ember-cp-validations/-private/ember-validator', 'ember-validators/ds-error'], function (exports, _emberValidator, _dsError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /**
   *  <i class="fa fa-hand-o-right" aria-hidden="true"></i> [See All Options](#method_validate)
   *
   *  Creates a link between this library and Ember-Data's [DS.Errors](http://emberjs.com/api/data/classes/DS.Errors.html)
   *  to fetch the latest message for the given attribute.
   *
   *  ## Examples
   *
   *  ```javascript
   *  validator('ds-error')
   *  ```
   *
   *  @class DS Error
   *  @module Validators
   *  @extends Base
   */
  /**
   * Copyright 2016, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  var DSError = _emberValidator.default.extend({
    _evType: 'ds-error'
  });

  DSError.reopenClass({
    getDependentsFor: function getDependentsFor(attribute) {
      var _getPathAndKey = (0, _dsError.getPathAndKey)(attribute),
          path = _getPathAndKey.path,
          key = _getPathAndKey.key;

      return ['model.' + path + '.' + key + '.[]'];
    }
  });

  exports.default = DSError;
});