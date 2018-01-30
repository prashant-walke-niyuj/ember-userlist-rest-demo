define('ember-cp-validations/validations/warning-result-collection', ['exports', 'ember-cp-validations/validations/result-collection', 'ember-cp-validations/utils/cycle-breaker', 'ember-cp-validations/utils/array'], function (exports, _resultCollection, _cycleBreaker, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed;
  exports.default = _resultCollection.default.extend({
    isValid: computed(function () {
      return true;
    }).readOnly(),
    isTruelyValid: computed.not('isValidating').readOnly(),

    messages: computed(function () {
      return [];
    }).readOnly(),
    errors: computed(function () {
      return [];
    }).readOnly(),

    warningMessages: computed('content.@each.{messages,warningMessages}', (0, _cycleBreaker.default)(function () {
      return (0, _array.uniq)((0, _array.compact)((0, _array.flatten)([this.getEach('messages'), this.getEach('warningMessages')])));
    })).readOnly(),

    warnings: computed('attribute', 'content.@each.{errors,warnings}', (0, _cycleBreaker.default)(function () {
      return this._computeErrorCollection((0, _array.flatten)([this.getEach('errors'), this.getEach('warnings')]));
    })).readOnly()
  });
});