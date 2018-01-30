define('demo/models/account', ['exports', 'ember-data', 'ember-data/attr', 'ember-cp-validations'], function (exports, _emberData, _attr, _emberCpValidations) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Validations = (0, _emberCpValidations.buildValidations)({
    username: (0, _emberCpValidations.validator)('presence', true),
    first_name: (0, _emberCpValidations.validator)('presence', true),
    email: [(0, _emberCpValidations.validator)('presence', true), (0, _emberCpValidations.validator)('format', { type: 'email' })]
  });
  exports.default = _emberData.default.Model.extend(Validations, {
    username: _emberData.default.attr('string'),
    first_name: _emberData.default.attr('string'),
    last_name: _emberData.default.attr('string'),
    email: _emberData.default.attr('string'),
    active: _emberData.default.attr('boolean')
  });
});