QUnit.module('ESLint | app');

QUnit.test('adapters/application.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'adapters/application.js should pass ESLint\n\n5:13 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n5:13 - \'Ember\' is not defined. (no-undef)');
});

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('components/save-user.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/save-user.js should pass ESLint\n\n2:8 - \'Component\' is defined but never used. (no-unused-vars)\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n6:9 - Unexpected console statement. (no-console)');
});

QUnit.test('models/account.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/account.js should pass ESLint\n\n2:8 - \'attr\' is defined but never used. (no-unused-vars)');
});

QUnit.test('models/cocktail.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/cocktail.js should pass ESLint\n\n');
});

QUnit.test('models/user.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/user.js should pass ESLint\n\n');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/account/edit.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/account/edit.js should pass ESLint\n\n');
});

QUnit.test('routes/accounts/add.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/accounts/add.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/accounts/edit.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/accounts/edit.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/accounts/index.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/accounts/index.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/accounts/view.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/accounts/view.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/cocktails/edit.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/cocktails/edit.js should pass ESLint\n\n');
});

QUnit.test('routes/cocktails/index.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/cocktails/index.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

QUnit.test('routes/users/index.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/users/index.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
});

