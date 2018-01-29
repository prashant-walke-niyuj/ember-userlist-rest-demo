import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('cocktails', function() {
    this.route('edit');
  });
  this.route('users', function() {});
  this.route('accounts', function() {
    this.route('add');
    this.route('edit', { path: "/edit/:id" });
    this.route('view', { path: "/view/:id" });
  });

  this.route('account', function() {
    this.route('edit');
  });
});

export default Router;
