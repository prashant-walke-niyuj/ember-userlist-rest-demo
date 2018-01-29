import Ember from 'ember';
import Component from '@ember/component';
export default Ember.Component.extend({
    actions: {
      saveUser() {
        console.log('saveUser');
      }
    }
  });