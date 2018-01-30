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
        this.set('showValidations', true);
        var confirmation = confirm('Are you sure?');
        if (confirmation) {
          account.save();
          alert('Record has been stored succesfully');
        }
      },
      closeAccount: function closeAccount() {
        this.transitionTo('accounts');
      }
    }
  });
});