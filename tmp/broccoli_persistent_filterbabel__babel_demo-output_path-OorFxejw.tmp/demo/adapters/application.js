define('demo/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    namespace: 'v1',
    host: "https://test-rfp.anchorops.com:8080",
    headers: Ember.computed(function () {
      return {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYXNoYW50K2J0IiwiZmlyc3ROYW1lIjoicHJhc2hhbnQiLCJsYXN0TmFtZSI6IndhbGtlIiwic3NvdXNlciI6ZmFsc2UsImlkIjoiMjEwIiwiYXZhdGFyIjoiYXNzZXRzL2F2YXRhcnMvbV8wMDcuc3ZnIiwicm9sZSI6IkJyYW5kIFRlYW0iLCJyb2xlX2lkIjoiNiIsImlhdCI6MTUxNzIyNDc3OSwiZXhwIjoxNTE3MjMxOTc5fQ.0uJpQQAjBeO3KqLkP3Njix_fACEx3Ln0FvwZSARl_Jk'
      };
    }).volatile()
  });
});