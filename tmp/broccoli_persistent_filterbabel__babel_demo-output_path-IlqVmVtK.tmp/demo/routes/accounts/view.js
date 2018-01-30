define('demo/routes/accounts/view', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('account', params.id);
    }
  });
});