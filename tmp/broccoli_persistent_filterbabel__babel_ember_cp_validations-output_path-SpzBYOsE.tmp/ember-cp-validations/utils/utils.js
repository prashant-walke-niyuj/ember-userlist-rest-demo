define('ember-cp-validations/utils/utils', ['exports', 'ember-require-module'], function (exports, _emberRequireModule) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.unwrapString = unwrapString;
  exports.unwrapProxy = unwrapProxy;
  exports.isProxy = isProxy;
  exports.isPromise = isPromise;
  exports.isDsModel = isDsModel;
  exports.isDSManyArray = isDSManyArray;
  exports.isEmberObject = isEmberObject;
  exports.isObject = isObject;
  exports.isDescriptor = isDescriptor;
  exports.isValidatable = isValidatable;
  exports.getValidatableValue = getValidatableValue;
  exports.mergeOptions = mergeOptions;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * Copyright 2016, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  var DS = (0, _emberRequireModule.default)('ember-data');

  var get = Ember.get,
      typeOf = Ember.typeOf,
      isArray = Ember.isArray,
      canInvoke = Ember.canInvoke,
      emberArray = Ember.A;
  var isHTMLSafe = Ember.String.isHTMLSafe;


  var assign = Ember.assign || Ember.merge;

  function unwrapString(s) {
    if (isHTMLSafe(s)) {
      return s.toString();
    }

    return s;
  }

  function unwrapProxy(o) {
    return isProxy(o) ? unwrapProxy(get(o, 'content')) : o;
  }

  function isProxy(o) {
    return !!(o && (o instanceof Ember.ObjectProxy || o instanceof Ember.ArrayProxy));
  }

  function isPromise(p) {
    return !!(p && canInvoke(p, 'then'));
  }

  function isDsModel(o) {
    return !!(DS && o && o instanceof DS.Model);
  }

  function isDSManyArray(o) {
    return !!(DS && o && isArray(o) && (o instanceof DS.PromiseManyArray || o instanceof DS.ManyArray));
  }

  function isEmberObject(o) {
    return !!(o && o instanceof Ember.Object);
  }

  function isObject(o) {
    return typeOf(o) === 'object' || typeOf(o) === 'instance';
  }

  function isDescriptor(o) {
    return o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o.isDescriptor;
  }

  function isValidatable(value) {
    var v = unwrapProxy(value);
    return isDsModel(v) ? !get(v, 'isDeleted') : true;
  }

  function getValidatableValue(value) {
    if (!value) {
      return value;
    }

    if (isDSManyArray(value)) {
      return emberArray(value.filter(function (v) {
        return isValidatable(v);
      }));
    }

    return isValidatable(value) ? value : undefined;
  }

  function mergeOptions() {
    var o = {};

    for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
      options[_key] = arguments[_key];
    }

    for (var i = options.length - 1; i >= 0; i--) {
      var _o = options[i];
      assign(o, isObject(_o) ? _o : {});
    }

    return o;
  }
});