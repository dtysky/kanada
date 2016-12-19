/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: karma configuration file for testing.
 */

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      {pattern: 'src/**/*.ts'},
      {pattern: 'spec/**/*.spec.ts'},
      {pattern: './testImages/**/*', included: false}
    ],

    port: 9876,

    logLevel: config.LOG_INFO,

    colors: true,

    autoWatch: true,

    browsers: ['Chrome'],

    preprocessors: {
      'src/**/*.ts': ['karma-typescript'],
      'spec/**/*.ts': ['karma-typescript']
    },

    reporters: ['progress', 'karma-typescript'],

    karmaTypescriptConfig: {
      reports: {
        'html': 'reports/coverage'
      }
    },

    singleRun: true
  })
};