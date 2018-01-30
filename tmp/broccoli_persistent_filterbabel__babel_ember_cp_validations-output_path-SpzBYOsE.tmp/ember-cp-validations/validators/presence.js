define('ember-cp-validations/validators/presence', ['exports', 'ember-cp-validations/-private/ember-validator'], function (exports, _emberValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberValidator.default.extend({
    _evType: 'presence',

    /**
     * Normalized options passed in.
     * ```js
     * validator('presence', true)
     * // Becomes
     * validator('presence', {
     *   presence: true
     * })
     * ```
     *
     * @method buildOptions
     * @param  {Object}     options
     * @param  {Object}     defaultOptions
     * @param  {Object}     globalOptions
     * @return {Object}
     */
    buildOptions: function buildOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var globalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var opts = options;

      if (typeof options === 'boolean') {
        opts = {
          presence: options
        };
      }
      return this._super(opts, defaultOptions, globalOptions);
    }
  });
});