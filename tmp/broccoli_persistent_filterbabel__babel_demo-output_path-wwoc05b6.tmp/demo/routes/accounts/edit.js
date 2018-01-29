define('demo/routes/accounts/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('account', params.id);
    },

    actions: {
      saveAccount: function saveAccount(account) {
        var confirmation = confirm('Are you sure?');
        if (confirmation) {
          account.save();
        }
        alert('Record has been saved succesfully');
      }
    }
  });
});