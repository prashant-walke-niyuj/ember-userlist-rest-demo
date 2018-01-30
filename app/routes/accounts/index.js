import Ember from 'ember';
export default Ember.Route.extend({
  model() {
    return this.store.findAll('account');
  },
  actions: {
    saveUser() {
      let confirmation = confirm('Are you sure?');
      if (confirmation) {
        alert('Record has been stored succesfully');
      }
      
    }    
  }
});

