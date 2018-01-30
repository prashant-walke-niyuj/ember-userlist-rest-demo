'use strict';

define('demo/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass ESLint\n\n5:13 - Use import { computed } from \'@ember/object\'; instead of using Ember.computed (ember/new-module-imports)\n5:13 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/save-user.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/save-user.js should pass ESLint\n\n2:8 - \'Component\' is defined but never used. (no-unused-vars)\n3:16 - Use import Component from \'@ember/component\'; instead of using Ember.Component (ember/new-module-imports)\n6:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('models/account.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/account.js should pass ESLint\n\n2:8 - \'attr\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('models/cocktail.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/cocktail.js should pass ESLint\n\n');
  });

  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/account/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/account/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/accounts/add.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/accounts/add.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/accounts/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/accounts/edit.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/accounts/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/accounts/index.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/accounts/view.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/accounts/view.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/cocktails/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/cocktails/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/cocktails/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/cocktails/index.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });

  QUnit.test('routes/users/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/users/index.js should pass ESLint\n\n2:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });
});
define('demo/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('demo/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'demo/tests/helpers/start-app', 'demo/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };
});
define('demo/tests/helpers/start-app', ['exports', 'demo/app', 'demo/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes.autoboot = true;
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('demo/tests/integration/components/save-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('save-user', 'Integration | Component | save user', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "76co+III",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"save-user\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "X1de1j+x",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"save-user\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('demo/tests/test-helper', ['demo/app', 'demo/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('demo/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/save-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/save-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/cocktail-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/cocktail-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/users-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/users-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/account/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/account/edit-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/accounts/add-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/accounts/add-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/accounts/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/accounts/edit-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/accounts/view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/accounts/view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/cocktails/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/cocktails/edit-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/cocktails/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/cocktails/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/index-test.js should pass ESLint\n\n');
  });
});
define('demo/tests/unit/adapters/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('demo/tests/unit/models/cocktail-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('cocktail', 'Unit | Model | cocktail', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('demo/tests/unit/models/users-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('users', 'Unit | Model | users', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('demo/tests/unit/routes/account/edit-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:account/edit', 'Unit | Route | account/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('demo/tests/unit/routes/accounts/add-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:accounts/add', 'Unit | Route | accounts/add', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('demo/tests/unit/routes/accounts/edit-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:accounts/edit', 'Unit | Route | accounts/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('demo/tests/unit/routes/accounts/view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:accounts/view', 'Unit | Route | accounts/view', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('demo/tests/unit/routes/cocktails/edit-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:cocktails/edit', 'Unit | Route | cocktails/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('demo/tests/unit/routes/cocktails/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:cocktails/index', 'Unit | Route | cocktails/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('demo/tests/unit/routes/users/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/index', 'Unit | Route | users/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('demo/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
