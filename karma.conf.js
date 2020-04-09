module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['qunit', 'sinon', 'ui5'],
    ui5: {
      mode: 'script',
      type: 'library',
      url: 'http://localhost:8080',
      config: {
        animation: 'false',
        compatVersion: 'edge',
        language: 'en',
        libs: 'sap.m',
        logLevel: 'WARNING',
        preload: 'async',
        resourceroots: {
          'openui5.password': 'base/src/openui5/password',
          'test.unit': 'base/test/openui5/password/unit'
        }
      },
      tests: ['test/unit/allTests']
    },
    client: {
      useIframe: false,
      qunit: {
        showUI: true,
        testTimeout: 20000, // 20 secs
        autostart: false,
        noglobals: true
      }
    },
    preprocessors: {
      'src/**/!(thirdparty)/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    autoWatch: true,
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    reportSlowerThan: 200,
    singleRun: false
  });
};
