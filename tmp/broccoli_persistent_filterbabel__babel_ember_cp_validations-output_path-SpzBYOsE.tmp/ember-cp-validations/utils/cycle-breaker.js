define('ember-cp-validations/utils/cycle-breaker', ['exports', 'ember-cp-validations/utils/meta-data'], function (exports, _metaData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cycleBreaker;
  function cycleBreaker(fn, value) {
    var key = _metaData.default.symbol('cycle');

    return function () {
      if (_metaData.default.getData(this, key)) {
        return value;
      }
      _metaData.default.setData(this, key, true);
      try {
        return fn.apply(this, arguments);
      } finally {
        _metaData.default.setData(this, key, false);
      }
    };
  } /**
     * Copyright 2016, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

  /**
   * Use Ember Meta to break cycles in the CP chains. Lets say we have a User model with a `friends` property that is a hasMany
   * relationship. If we have a user John and he has a friend Jane, that creates a two-way relationship. John is Jane's friends and vise
   * versa. If we were to go down the CP chain and get validations for John's friends, it would go to Jane, then to Jane's friends, which
   * would point back to John. This method tracks which models have been already visited and breaks the cycle.
   */
});