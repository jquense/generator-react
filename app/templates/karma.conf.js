'use strict';

module.exports = function (config) {
  
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'vendor/sinon-1.10.3.js', //because sinon hates webpack
      'test.js'
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'], 

    preprocessors: {
      'test.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.configs').test,

    webpackServer: {
      noInfo: true
    },

    plugins: [
      require("karma-sourcemap-loader"),
      require("karma-phantomjs-launcher"),
      require("karma-webpack"),
      require("karma-mocha")
    ]
  });
};