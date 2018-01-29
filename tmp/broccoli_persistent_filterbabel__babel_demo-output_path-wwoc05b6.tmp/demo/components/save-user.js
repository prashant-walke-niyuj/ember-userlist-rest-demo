define('demo/components/save-user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      saveUser: function saveUser() {
        console.log('saveUser');
      }
    }
  });
});