import DS from 'ember-data';
export default DS.JSONAPIAdapter.extend({ 
   namespace: 'v1',
   host: "https://stage-rfp.anchorops.com:8080",
   headers: Ember.computed(function() {
    return {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3NvdXNlciI6ZmFsc2UsImlkIjoiNzEiLCJhdmF0YXIiOiJhc3NldHMvYXZhdGFycy93LTAwLnN2ZyIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwicm9sZV9pZCI6IjEiLCJpYXQiOjE1MTczMTAwNzEsImV4cCI6MTUxNzMxMTI3MX0.wVopETQ8D9Vpe1LIjLH68dsS8mJDCA6M4KjzZarZ2J0',
    };
  }).volatile()
});