define('demo/routes/accounts/add', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.createRecord('account');
    },

    actions: {
      addAccount: function addAccount(account) {
        var confirmation = confirm('Are you sure?');
        if (confirmation) {
          account.save();
        }
      }
    }
  });
});