define('demo/models/account', ['exports', 'ember-data', 'ember-data/attr'], function (exports, _emberData, _attr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    username: _emberData.default.attr('string'),
    first_name: _emberData.default.attr('string'),
    last_name: _emberData.default.attr('string'),
    email: _emberData.default.attr('string'),
    active: _emberData.default.attr('boolean')
  });
});