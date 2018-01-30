import Ember from 'ember';
import Route from '@ember/routing/route';
export default Route.extend({
  model(params) {
    return this.get('store').findRecord('account', params.id);
  },
  actions: {
    saveAccount(account) {
      this.set('showValidations', true);
      let confirmation = confirm('Are you sure?');
      if (confirmation) {
        account.save();
        alert('Record has been stored succesfully');
      }
      
    },
    closeAccount (){
      this.transitionTo('accounts');

    }
  }
});