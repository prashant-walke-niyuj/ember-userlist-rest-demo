define('ember-cp-validations/validations/factory', ['exports', 'ember-cp-validations/utils/assign', 'ember-cp-validations/-private/result', 'ember-cp-validations/validations/result-collection', 'ember-cp-validations/validators/base', 'ember-cp-validations/utils/cycle-breaker', 'ember-cp-validations/utils/should-call-super', 'ember-cp-validations/utils/array', 'ember-cp-validations/utils/utils'], function (exports, _assign, _result, _resultCollection, _base, _cycleBreaker, _shouldCallSuper, _array, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildValidations;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var get = Ember.get,
      set = Ember.set,
      run = Ember.run,
      RSVP = Ember.RSVP,
      isNone = Ember.isNone,
      guidFor = Ember.guidFor,
      isEmpty = Ember.isEmpty,
      isArray = Ember.isArray,
      computed = Ember.computed,
      getOwner = Ember.getOwner,
      makeArray = Ember.makeArray,
      getWithDefault = Ember.getWithDefault,
      emberArray = Ember.A;


  var merge = Ember.assign || Ember.merge;

  var Promise = RSVP.Promise;


  /**
   * ## Running Manual Validations
   *
   * Although validations are lazily computed, there are times where we might want to force all or
   * specific validations to happen. For this reason we have exposed three methods:
   *
   * - {{#crossLink "Factory/validate:method"}}{{/crossLink}}: Will always return a promise and should be used if asynchronous validations are present
   * - {{#crossLink "Factory/validateSync:method"}}{{/crossLink}}: Should only be used if all validations are synchronous. It will throw an error if any of the validations are asynchronous
   * - {{#crossLink "Factory/validateAttribute:method"}}{{/crossLink}}: A functional approach to validating an attribute without changing its state
   *
   * @module Validations
   * @main Validations
   */

  /**
   * All validations can be accessed via the `validations` object created on your model/object.
   * Each attribute also has its own validation which has the same properties.
   * An attribute validation can be accessed via `validations.attrs.<ATTRIBUTE>` which will return a {{#crossLink "ResultCollection"}}{{/crossLink}}.
   *
   * ### Global Validations
   *
   * Global validations exist on the `validations` object that resides on the object that is being validated.
   * To see all possible properties, please checkout the docs for {{#crossLink "ResultCollection"}}{{/crossLink}}.
   *
   * ```js
   * model.get('validations.isValid');
   * model.get('validations.errors');
   * model.get('validations.messages');
   * // etc...
   * ```
   *
   * ### Attribute Validations
   *
   * The `validations` object also contains an `attrs` object which holds a {{#crossLink "ResultCollection"}}{{/crossLink}}
   * for each attribute specified in your validation rules.
   *
   * ```js
   * model.get('validations.attrs.username.isValid');
   * model.get('validations.attrs.password.errors');
   * model.get('validations.attrs.email.messages');
   * // etc...
   * ```
   * @module Validations
   * @submodule Accessing Validations
   */

  /**
   * @module Validations
   * @class Factory
   */

  /**
   * Top level method that will ultimately return a mixin with all CP validations
   *
   * @method  buildValidations
   * @param  {Object} validations  Validation rules
   * @return {Ember.Mixin}
   */
  function buildValidations() {
    var validations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    normalizeOptions(validations, globalOptions);

    var Validations = void 0,
        validationMixinCount = void 0;

    var ValidationsMixin = Ember.Mixin.create({
      init: function init() {
        this._super.apply(this, arguments);

        // Count number of mixins to bypass super check if there is more than 1
        this.__validationsMixinCount__ = this.__validationsMixinCount__ || 0;
        validationMixinCount = ++this.__validationsMixinCount__;
      },

      __validationsClass__: computed(function () {
        if (!Validations) {
          var inheritedClass = void 0;

          if ((0, _shouldCallSuper.default)(this, '__validationsClass__') || validationMixinCount > 1) {
            inheritedClass = this._super();
          }

          Validations = createValidationsClass(inheritedClass, validations, this);
        }
        return Validations;
      }).readOnly(),

      validations: computed(function () {
        return this.get('__validationsClass__').create({ model: this });
      }).readOnly(),

      validate: function validate() {
        var _get;

        return (_get = get(this, 'validations')).validate.apply(_get, arguments);
      },
      validateSync: function validateSync() {
        var _get2;

        return (_get2 = get(this, 'validations')).validateSync.apply(_get2, arguments);
      },
      validateAttribute: function validateAttribute() {
        var _get3;

        return (_get3 = get(this, 'validations')).validateAttribute.apply(_get3, arguments);
      },
      destroy: function destroy() {
        this._super.apply(this, arguments);
        get(this, 'validations').destroy();
      }
    });

    // Label mixin under a named scope for Ember Inspector
    ValidationsMixin[Ember.NAME_KEY] = 'Validations';

    return ValidationsMixin;
  }

  /**
   * Validation rules can be created with default and global options
   * {
   *   description: 'Username',
   *   validators: [...]
   * }
   *
   * This method generate the default options pojo, applies it to each validation rule, and flattens the object
   *
   * @method normalizeOptions
   * @private
   * @param  {Object} validations
   * @return
   */
  function normalizeOptions() {
    var validations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var validatableAttrs = Object.keys(validations);

    validatableAttrs.forEach(function (attribute) {
      var rules = validations[attribute];

      if (rules && (typeof rules === 'undefined' ? 'undefined' : _typeof(rules)) === 'object' && isArray(rules.validators)) {
        var options = Object.keys(rules).reduce(function (o, k) {
          if (k !== 'validators') {
            o[k] = rules[k];
          }
          return o;
        }, {});

        var validators = rules.validators;

        validators.forEach(function (v) {
          v.defaultOptions = options;
        });
        validations[attribute] = validators;
      }
      validations[attribute] = makeArray(validations[attribute]);
      validations[attribute].forEach(function (v) {
        v.globalOptions = globalOptions;
      });
    });
  }

  /**
   * Creates the validations class that will become `model.validations`.
   *   - Setup parent validation inheritance
   *   - Normalize nested keys (i.e. 'details.dob') into objects (i.e { details: { dob: validator() }})
   *   - Merge normalized validations with parent
   *   - Create global CPs (i.e. 'isValid', 'messages', etc...)
   *
   * @method createValidationsClass
   * @private
   * @param  {Object} inheritedValidationsClass
   * @param  {Object} validations
   * @param  {Object} model
   * @return {Ember.Object}
   */
  function createValidationsClass(inheritedValidationsClass, validations, model) {
    var validationRules = {};
    var validatableAttributes = Object.keys(validations);

    // Setup validation inheritance
    if (inheritedValidationsClass && inheritedValidationsClass.__isCPValidationsClass__) {
      var inheritedValidations = inheritedValidationsClass.create();

      validationRules = merge(validationRules, inheritedValidations.get('_validationRules'));
      validatableAttributes = emberArray(inheritedValidations.get('validatableAttributes').concat(validatableAttributes)).uniq();
    }

    // Normalize nested keys into actual objects and merge them with parent object
    Object.keys(validations).reduce(function (obj, key) {
      (0, _assign.default)(obj, key, validations[key]);
      return obj;
    }, validationRules);

    // Create the mixin that holds all the top level validation props (isValid, messages, etc)
    var TopLevelProps = createTopLevelPropsMixin(validatableAttributes);

    // Create the `attrs` class which will add the current model reference once instantiated
    var AttrsClass = createAttrsClass(validatableAttributes, validationRules, model);

    // Create `validations` class
    var ValidationsClass = Ember.Object.extend(TopLevelProps, {
      model: null,
      attrs: null,
      isValidations: true,

      validatableAttributes: computed(function () {
        return validatableAttributes;
      }).readOnly(),

      // Caches
      _validators: null,
      _debouncedValidations: null,

      // Private
      _validationRules: computed(function () {
        return validationRules;
      }).readOnly(),

      validate: validate,
      validateSync: validateSync,
      validateAttribute: validateAttribute,

      init: function init() {
        this._super.apply(this, arguments);
        this.setProperties({
          attrs: AttrsClass.create({
            _model: this.get('model')
          }),
          _validators: {},
          _debouncedValidations: {}
        });
      },
      destroy: function destroy() {
        this._super.apply(this, arguments);
        var validatableAttrs = get(this, 'validatableAttributes');
        var debouncedValidations = get(this, '_debouncedValidations');

        // Initiate attrs destroy to cleanup any remaining model references
        this.get('attrs').destroy();

        // Cancel all debounced timers
        validatableAttrs.forEach(function (attr) {
          var attrCache = get(debouncedValidations, attr);

          if (!isNone(attrCache)) {
            // Itterate over each attribute and cancel all of its debounced validations
            Object.keys(attrCache).forEach(function (v) {
              return run.cancel(attrCache[v]);
            });
          }
        });
      }
    });

    ValidationsClass.reopenClass({
      __isCPValidationsClass__: true
    });

    return ValidationsClass;
  }

  /**
   * Creates the `attrs` class which holds all the CP logic
   *
   * ```javascript
   * model.get('validations.attrs.username');
   * model.get('validations.attrs.nested.object.attribute');
   * ```
   *
   * @method createAttrsClass
   * @private
   * @param  {Object} validatableAttributes
   * @param  {Object} validationRules
   * @param  {Object} model
   * @return {Ember.Object}
   */
  function createAttrsClass(validatableAttributes, validationRules, model) {
    var nestedClasses = {};
    var rootPath = 'root';

    var AttrsClass = Ember.Object.extend({
      __path__: rootPath,

      init: function init() {
        var _this = this;

        this._super.apply(this, arguments);

        var _model = this.get('_model');
        var path = this.get('__path__');

        /*
          Instantiate the nested attrs classes for the current path
         */
        Object.keys(nestedClasses[path] || []).forEach(function (key) {
          set(_this, key, nestedClasses[path][key].create({ _model: _model }));
        });
      },
      willDestroy: function willDestroy() {
        var _this2 = this;

        this._super.apply(this, arguments);

        var path = this.get('__path__');

        /*
          Remove the model reference
         */
        set(this, '_model', null);

        /*
          Destroy all nested classes
         */
        Object.keys(nestedClasses[path] || []).forEach(function (key) {
          get(_this2, key).destroy();
        });
      }
    });

    /*
      Insert CPs + Create nested classes
     */
    validatableAttributes.forEach(function (attribute) {
      var path = attribute.split('.');
      var attr = path.pop();
      var currPath = [rootPath];
      var currClass = AttrsClass;

      // Iterate over the path and create the necessary nested classes along the way
      for (var i = 0; i < path.length; i++) {
        var key = path[i];
        var currPathStr = currPath.join('.');
        var _nestedClasses = void 0;

        nestedClasses[currPathStr] = nestedClasses[currPathStr] || {};
        _nestedClasses = nestedClasses[currPathStr];

        currPath.push(key);

        if (!_nestedClasses[key]) {
          _nestedClasses[key] = AttrsClass.extend({
            __path__: currPath.join('.')
          });
        }

        currClass = _nestedClasses[key];
      }

      // Add the final attr's CP to the class
      currClass.reopen(_defineProperty({}, attr, createCPValidationFor(attribute, model, get(validationRules, attribute))));
    });

    return AttrsClass;
  }

  /**
   * CP generator for the given attribute
   *
   * @method createCPValidationFor
   * @private
   * @param  {String} attribute
   * @param  {Object} model         Since the CPs are created once per class on the first initialization,
   *                                this is the first model that was instantiated
   * @param  {Array} validations
   * @return {Ember.ComputedProperty} A computed property which is a ResultCollection
   */
  function createCPValidationFor(attribute, model, validations) {
    var isVolatile = hasOption(validations, 'volatile', true);
    var dependentKeys = isVolatile ? [] : getCPDependentKeysFor(attribute, model, validations);

    var cp = computed.apply(undefined, _toConsumableArray(dependentKeys).concat([(0, _cycleBreaker.default)(function () {
      var model = get(this, '_model');
      var validators = !isNone(model) ? getValidatorsFor(attribute, model) : [];

      var validationResults = generateValidationResultsFor(attribute, model, validators, function (validator, options) {
        return validator.validate(validator.getValue(), options, model, attribute);
      });

      return _resultCollection.default.create({
        attribute: attribute,
        content: validationResults
      });
    })])).readOnly();

    if (isVolatile) {
      cp = cp.volatile();
    }

    return cp;
  }

  /**
   * Check if a collection of validations have an option
   * equal to the given value
   *
   * @method hasOption
   * @private
   * @param {Array} validations
   * @param {String} option
   * @param {Boolean} [value=true]
   * @returns {Boolean}
   */
  function hasOption(validations, option) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    for (var i = 0; i < validations.length; i++) {
      var _validations$i = validations[i],
          options = _validations$i.options,
          _validations$i$defaul = _validations$i.defaultOptions,
          defaultOptions = _validations$i$defaul === undefined ? {} : _validations$i$defaul,
          _validations$i$global = _validations$i.globalOptions,
          globalOptions = _validations$i$global === undefined ? {} : _validations$i$global;

      var mergedOptions = (0, _utils.mergeOptions)(options, defaultOptions, globalOptions);

      if (mergedOptions[option] === value) {
        return true;
      }
    }

    return false;
  }

  /**
   * Generates the validation results for a given attribute and validators. If a
   * given validator should be validated, it calls upon the validate callback to retrieve
   * the result.
   *
   * @method generateValidationResultsFor
   * @private
   * @param  {String} attribute
   * @param  {Object} model
   * @param  {Array} validators
   * @param  {Function} validate
   * @param  {Object} opts
   *                    - disableDebounceCache {Boolean}
   * @return {Array}
   */
  function generateValidationResultsFor(attribute, model, validators, validate) {
    var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var isModelValidatable = (0, _utils.isValidatable)(model);
    var isInvalid = false;
    var value = void 0,
        result = void 0;

    return validators.map(function (validator) {
      var options = get(validator, 'options').copy();
      var isWarning = getWithDefault(options, 'isWarning', false);
      var disabled = getWithDefault(options, 'disabled', false);
      var debounce = getWithDefault(options, 'debounce', 0);
      var lazy = getWithDefault(options, 'lazy', true);

      if (disabled || lazy && isInvalid || !isModelValidatable) {
        value = true;
      } else if (debounce > 0) {
        var cache = getDebouncedValidationsCacheFor(attribute, model);

        // Return a promise and pass the resolve method to the debounce handler
        value = new Promise(function (resolve) {
          var t = run.debounce(validator, resolveDebounce, resolve, debounce);

          if (!opts.disableDebounceCache) {
            cache[guidFor(validator)] = t;
          }
        }).then(function () {
          return validate(validator, get(validator, 'options').copy());
        });
      } else {
        value = validate(validator, options);
      }

      result = validationReturnValueHandler(attribute, value, model, validator);

      /*
        If the current result is invalid, the rest of the validations do not need to be
        triggered (if lazy) since the attribute is already in an invalid state.
       */
      if (!isInvalid && !isWarning && get(result, 'isInvalid')) {
        isInvalid = true;
      }

      return result;
    });
  }

  /**
   * Create a mixin that will have all the top level CPs under the validations object.
   * These are computed collections on different properties of each attribute validations CP
   *
   * @method createTopLevelPropsMixin
   * @private
   * @param  {Object} validations
   */
  function createTopLevelPropsMixin(validatableAttrs) {
    // Expose the following properties as public APIs via readOnly aliases
    var aliases = ['isValid', 'isValidating', 'isDirty', 'isAsync', 'isNotValidating', 'isInvalid', 'isTruelyValid', 'isTruelyInvalid', 'hasWarnings', 'messages', 'message', 'warningMessages', 'warningMessage', 'warnings', 'warning', 'errors', 'error', '_promise'];

    var topLevelProps = aliases.reduce(function (props, alias) {
      props[alias] = computed.readOnly('__attrsResultCollection__.' + alias);
      return props;
    }, {});

    return Ember.Mixin.create(topLevelProps, {
      /*
        Dedupe logic by creating a top level ResultCollection for all attr's ResultCollections
       */
      __attrsResultCollection__: computed.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
        return 'attrs.' + attr;
      })).concat([function () {
        var _this3 = this;

        return _resultCollection.default.create({
          attribute: 'Model:' + this,
          content: validatableAttrs.map(function (attr) {
            return get(_this3, 'attrs.' + attr);
          })
        });
      }])).readOnly()
    });
  }

  /**
   * CP dependency generator for a give attribute depending on its relationships
   *
   * @method getCPDependentKeysFor
   * @private
   * @param  {String} attribute
   * @param  {Object} model         Since the CPs are created once per class on the first initialization,
   *                                this is the first model that was instantiated
   * @param  {Array} validations
   * @return {Array} Unique list of dependencies
   */
  function getCPDependentKeysFor(attribute, model, validations) {
    var owner = getOwner(model);

    var dependentKeys = validations.map(function (validation) {
      var options = validation.options;

      var type = validation._type;
      var Validator = type === 'function' ? _base.default : lookupValidator(owner, type).class;
      var baseDependents = _base.default.getDependentsFor(attribute, options) || [];
      var dependents = Validator.getDependentsFor(attribute, options) || [];

      return [].concat(_toConsumableArray(baseDependents), _toConsumableArray(dependents), _toConsumableArray(getWithDefault(options, 'dependentKeys', [])), _toConsumableArray(getWithDefault(validation, 'defaultOptions.dependentKeys', [])), _toConsumableArray(getWithDefault(validation, 'globalOptions.dependentKeys', [])), _toConsumableArray(extractOptionsDependentKeys(options)), _toConsumableArray(extractOptionsDependentKeys(get(validation, 'defaultOptions'))), _toConsumableArray(extractOptionsDependentKeys(get(validation, 'globalOptions'))));
    });

    dependentKeys = (0, _array.flatten)(dependentKeys);

    dependentKeys.push('model.' + attribute);

    if ((0, _utils.isDsModel)(model)) {
      dependentKeys.push('model.isDeleted');
    }

    dependentKeys = dependentKeys.map(function (d) {
      return '' + (d.split('.')[0] === 'model' ? '_' : '') + d;
    });

    return emberArray(dependentKeys).uniq();
  }

  /**
   * Extract all dependentKeys from any property that is a CP
   *
   * @method extractOptionsDependentKeys
   * @private
   * @param  {Object} options
   * @return {Array}  dependentKeys
   */
  function extractOptionsDependentKeys(options) {
    if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
      return Object.keys(options).reduce(function (arr, key) {
        var option = options[key];

        if ((0, _utils.isDescriptor)(option)) {
          return arr.concat(option._dependentKeys || []);
        }

        return arr;
      }, []);
    }

    return [];
  }

  /**
   * A handler used to create ValidationResult object from values returned from a validator
   *
   * @method validationReturnValueHandler
   * @private
   * @param  {String} attribute
   * @param  {Mixed} value
   * @param  {Object} model
   * @return {ValidationResult}
   */
  function validationReturnValueHandler(attribute, value, model, validator) {
    var result = void 0;
    var commonProps = {
      model: model,
      attribute: attribute,
      _validator: validator
    };

    if ((0, _utils.isPromise)(value)) {
      result = _result.default.create(commonProps, {
        _promise: Promise.resolve(value)
      });
    } else {
      result = _result.default.create(commonProps);
      result.update(value);
    }

    return result;
  }

  /**
   * Get validators for the give attribute. If they are not in the cache, then create them.
   *
   * @method getValidatorsFor
   * @private
   * @param  {String} attribute
   * @param  {Object} model
   * @return {Array}
   */
  function getValidatorsFor(attribute, model) {
    var validators = get(model, 'validations._validators.' + attribute);
    return isNone(validators) ? createValidatorsFor(attribute, model) : validators;
  }

  /**
   * Get debounced validation cache for the given attribute. If it doesn't exist, create a new one.
   *
   * @method getValidatorCacheFor
   * @private
   * @param  {String} attribute
   * @param  {Object} model
   * @return {Map}
   */
  function getDebouncedValidationsCacheFor(attribute, model) {
    var debouncedValidations = get(model, 'validations._debouncedValidations');

    if (isNone(get(debouncedValidations, attribute))) {
      (0, _assign.default)(debouncedValidations, attribute, {});
    }

    return get(debouncedValidations, attribute);
  }

  /**
   * Create validators for the give attribute and store them in a cache
   *
   * @method createValidatorsFor
   * @private
   * @param  {String} attribute
   * @param  {Object} model
   * @return {Array}
   */
  function createValidatorsFor(attribute, model) {
    var validations = get(model, 'validations');
    var validationRules = makeArray(get(validations, '_validationRules.' + attribute));
    var validatorCache = get(validations, '_validators');
    var owner = getOwner(model);
    var validators = [];
    var validator = void 0;

    // We must have an owner to be able to lookup our validators
    if (isNone(owner)) {
      throw new TypeError('[ember-cp-validations] ' + model.toString() + ' is missing a container or owner.');
    }

    validationRules.forEach(function (v) {
      v.attribute = attribute;
      v.model = model;

      // If validate function exists, that means validator was created with a function so use the base class
      if (v._type === 'function') {
        validator = _base.default.create(owner.ownerInjection(), v);
      } else {
        validator = lookupValidator(owner, v._type).create(v);
      }

      validators.push(validator);
    });

    // Add validators to model instance cache
    (0, _assign.default)(validatorCache, attribute, validators);

    return validators;
  }

  /**
   * Lookup a validators of a specific type on the owner
   *
   * @method lookupValidator
   * @throws {Error} Validator not found
   * @private
   * @param  {Ember.Owner} owner
   * @param  {String} type
   * @return {Class} Validator class or undefined if not found
   */
  function lookupValidator(owner, type) {
    var validatorClass = owner.factoryFor('validator:' + type);

    if (isNone(validatorClass)) {
      throw new Error('[ember-cp-validations] Validator not found of type: ' + type + '.');
    }

    return validatorClass;
  }

  /**
   * Call the passed resolve method. This is needed as run.debounce expects a
   * static method to work properly.
   *
   * @method resolveDebounce
   * @private
   * @param  {Function} resolve
   */
  function resolveDebounce(resolve) {
    resolve();
  }

  /**
   * ```javascript
   * model.validate({ on: ['username', 'email'] }).then(({ m, validations }) => {
   *   validations.get('isValid'); // true or false
   *   validations.get('isValidating'); // false
   *
   *   let usernameValidations = m.get('validations.attrs.username');
   *   usernameValidations.get('isValid') // true or false
   * });
   * ```
   *
   * @method validate
   * @param  {Object} options
   * @param  {Array} options.on Only validate the given attributes. If empty, will validate over all validatable attribute
   * @param  {Array} options.excludes Exclude validation on the given attributes
   * @param  {Boolean} isAsync      If `false`, will get all validations and will error if an async validations is found.
   *                              If `true`, will get all validations and wrap them in a promise hash
   * @return {Promise or Object}  Promise if isAsync is true, object if isAsync is false
   */
  function validate() {
    var _this4 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isAsync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var model = get(this, 'model');
    var whiteList = makeArray(options.on);
    var blackList = makeArray(options.excludes);

    var validationResults = get(this, 'validatableAttributes').reduce(function (v, name) {
      if (!isEmpty(blackList) && blackList.indexOf(name) !== -1) {
        return v;
      }

      if (isEmpty(whiteList) || whiteList.indexOf(name) !== -1) {
        var validationResult = get(_this4, 'attrs.' + name);

        // If an async validation is found, throw an error
        if (!isAsync && get(validationResult, 'isAsync')) {
          throw new Error('[ember-cp-validations] Synchronous validation failed due to ' + name + ' being an async validation.');
        }

        v.push(validationResult);
      }

      return v;
    }, []);

    var validations = _resultCollection.default.create({
      attribute: 'Validate:' + model,
      content: validationResults
    });

    var resultObject = { model: model, validations: validations };

    if (isAsync) {
      return Promise.resolve(get(validations, '_promise')).then(function () {
        /*
          NOTE: When dealing with belongsTo and hasMany relationships, there are cases
          where we have to resolve the actual models and only then resolve all the underlying
          validation promises. This is the reason that `validate` must be called recursively.
         */
        return get(validations, 'isValidating') ? _this4.validate(options, isAsync) : resultObject;
      });
    }

    return resultObject;
  }

  /**
   * A functional approach to check if a given attribute on a model is valid independently of the
   * model attribute's validations. This method will always return a promise which will then resolve
   * to a {{#crossLink "ResultCollection"}}{{/crossLink}}.
   *
   * ```javascript
   * model.validateAttribute('username', 'offirgolan').then(({ m, validations }) => {
   *   validations.get('isValid'); // true or false
   *   validations.get('isValidating'); // false
   * });
   * ```
   *
   * @method validateAttribute
   * @param  {String}   attribute
   * @param  {Mixed}  value
   * @return {Promise}
   * @async
   */
  function validateAttribute(attribute, value) {
    var _this5 = this;

    var model = get(this, 'model');
    var validators = !isNone(model) ? getValidatorsFor(attribute, model) : [];

    var validationResults = generateValidationResultsFor(attribute, model, validators, function (validator, options) {
      return validator.validate(value, options, model, attribute);
    }, {
      disableDebounceCache: true
    });

    var validations = _resultCollection.default.create({
      attribute: attribute,
      content: (0, _array.flatten)(validationResults)
    });

    var result = { model: model, validations: validations };

    return Promise.resolve(get(validations, '_promise')).then(function () {
      /*
        NOTE: When dealing with belongsTo and hasMany relationships, there are cases
        where we have to resolve the actual models and only then resolve all the underlying
        validation promises. This is the reason that `validateAttribute` must be called recursively.
       */
      return get(validations, 'isValidating') ? _this5.validateAttribute(attribute, value) : result;
    });
  }

  /**
   * ```javascript
   * let { m, validations } = model.validateSync();
   * validations.get('isValid') // true or false
   * ```
   *
   * @method validateSync
   * @param  {Object}  options
   * @param  {Array} options.on Only validate the given attributes. If empty, will validate over all validatable attribute
   * @param  {Array} options.excludes Exclude validation on the given attributes
   * @return {Object}
   */
  function validateSync(options) {
    return this.validate(options, false);
  }
});