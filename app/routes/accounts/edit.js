import Ember from 'ember';
export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('account', params.id);
  },
  actions: {
    saveAccount(account) {
      let confirmation = confirm('Are you sure?');
      if (confirmation) {
        account.save();
      }
      alert('Record has been saved succesfully');
    }    
  }
});