define('ember-validators/ds-error', ['exports', 'ember-require-module', 'ember-validators/utils/validation-error'], function (exports, _emberRequireModule, _validationError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateDsError;
  exports.getPathAndKey = getPathAndKey;


  var DS = (0, _emberRequireModule.default)('ember-data'); /**
                                                            * Copyright 2016, Yahoo! Inc.
                                                            * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
                                                            */

  if (!DS) {
    throw new Error('Ember-Data is required to use the DS Error validator.');
  }

  var get = Ember.get,
      isNone = Ember.isNone;


  /**
   *  @class DS Error
   *  @module Validators
   */

  /**
   * @method validate
   * @param {Any} value
   * @param {Object} options
   * @param {Object} model
   * @param {String} attribute
   */
  function validateDsError(value, options, model, attribute) {
    var _getPathAndKey = getPathAndKey(attribute),
        path = _getPathAndKey.path,
        key = _getPathAndKey.key;

    var errors = get(model, path);

    if (!isNone(errors) && errors instanceof DS.Errors && errors.has(key)) {
      return (0, _validationError.default)('ds', null, options, get(errors.errorsFor(key), 'lastObject.message'));
    }

    return true;
  }

  function getPathAndKey(attribute) {
    var path = attribute.split('.');
    var key = path.pop();

    path.push('errors');

    return { path: path.join('.'), key: key };
  }
});