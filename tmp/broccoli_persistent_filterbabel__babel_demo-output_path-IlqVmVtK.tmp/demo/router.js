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
    this.route('cocktails', function () {
      this.route('edit');
    });
    this.route('users', function () {});
    this.route('accounts', function () {
      this.route('add');
      this.route('edit', { path: "/edit/:id" });
      this.route('view', { path: "/view/:id" });
    });

    this.route('account', function () {
      this.route('edit');
    });
  });

  exports.default = Router;
});