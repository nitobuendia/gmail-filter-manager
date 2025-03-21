const karmaCommon = require('./karma.common.js');
const {
  merge,
} = require('webpack-merge');

module.exports = (config) => {
  config.set(merge(karmaCommon, {
    // Only Chrome required as this runs on Apps Script, which runs on V8.
    browsers: ['ChromeHeadless'],
    singleRun: true,
  }));
};
