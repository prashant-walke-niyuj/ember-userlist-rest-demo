import Ember from 'ember';
export default Ember.Route.extend({
  model() {
    return this.store.createRecord('account');
  },
  actions: {
    addAccount(account) {
      let confirmation = confirm('Are you sure?');
      if (confirmation) {
        account.save();
      }
    }
  }
});