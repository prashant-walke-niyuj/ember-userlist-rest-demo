define('demo/routes/accounts/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('account');
    },

    actions: {
      saveUser: function saveUser() {
        var confirmation = confirm('Are you sure?');
        if (confirmation) {
          alert('Record has been stored succesfully');
        }
      }
    }
  });
});