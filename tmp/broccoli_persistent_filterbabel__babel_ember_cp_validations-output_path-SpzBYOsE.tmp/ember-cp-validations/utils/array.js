define('ember-cp-validations/utils/array', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.callable = callable;
  exports.flatten = flatten;
  var emberArray = Ember.A;


  var A = emberArray();

  function callable(method) {
    return function (collection) {
      return A[method].apply(collection, arguments);
    };
  }

  var uniq = exports.uniq = callable('uniq');
  var compact = exports.compact = callable('compact');

  function flatten() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var result = [];

    for (var i = 0, l = array.length; i < l; i++) {
      var item = array[i];

      if (Array.isArray(item)) {
        result = result.concat(flatten(item));
      } else {
        result.push(item);
      }
    }

    return result;
  }
});