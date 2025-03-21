const common = require('./webpack.common.js');
const path = require('path');

module.exports = {
  basePath: '',
  files: [{
      pattern: 'src/**/*.js',
    },
    {
      pattern: 'tests/**/*.js',
    },
  ],
  frameworks: ['jasmine'],
  preprocessors: {
    'src/**/*.js': ['webpack'],
    'tests/**/*.js': ['webpack'],
  },
  reporters: ['progress'],
  webpack: {
    module: common.module,
    node: common.node,
  },
};
