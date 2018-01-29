define('demo/router', ['exports', 'demo/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('cocktails', function () {});
    this.route('users', function () {});
    this.route('accounts', function () {
      this.route('add');
    });
  });

  exports.default = Router;
});