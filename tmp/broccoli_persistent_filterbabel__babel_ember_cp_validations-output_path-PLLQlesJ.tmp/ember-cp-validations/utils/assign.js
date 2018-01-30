define('ember-cp-validations/utils/assign', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assign;
  var get = Ember.get,
      set = Ember.set,
      isNone = Ember.isNone,
      defineProperty = Ember.defineProperty;
  function assign(obj, path, value) {
    var useEmberObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var delimiter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '.';

    var keyPath = path.split(delimiter);
    var lastKeyIndex = keyPath.length - 1;
    var currObj = obj;

    // Iterate over each key in the path (minus the last one which is the property to be assigned)
    for (var i = 0; i < lastKeyIndex; ++i) {
      var key = keyPath[i];

      // Create a new object if it doesnt exist
      if (isNone(get(currObj, key))) {
        set(currObj, key, useEmberObject ? Ember.Object.create() : {});
      }
      currObj = get(currObj, key);
    }

    if (value instanceof Ember.ComputedProperty) {
      defineProperty(currObj, keyPath[lastKeyIndex], value);
    } else {
      set(currObj, keyPath[lastKeyIndex], value);
    }
  }
});