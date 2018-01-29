import DS from 'ember-data';
export default DS.JSONAPIAdapter.extend({ 
   namespace: 'v1',
   host: "https://test-rfp.anchorops.com:8080",
   headers: Ember.computed(function() {
    return {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3NvdXNlciI6ZmFsc2UsImlkIjoiMSIsImF2YXRhciI6ImFzc2V0cy9hdmF0YXJzL21fMDU2LnN2ZyIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwicm9sZV9pZCI6IjEiLCJpYXQiOjE1MTcyMTc5MDAsImV4cCI6MTUxNzIyNTEwMH0.FUbhwwzTh0K36QbE7loh3gLkDq8bLZRJ_triCxQf0fA',
    };
  }).volatile()
});