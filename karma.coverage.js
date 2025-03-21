const karmaCommon = require('./karma.common.js');
const {
  merge,
} = require('webpack-merge');

module.exports = (config) => {
  config.set(merge(karmaCommon, {
    // Only Chrome required as this runs on Apps Script, which runs on V8.
    browsers: ['ChromeHeadless'],
    logLevel: config.LOG_DEBUG,
    singleRun: true,

    preprocessors: {
      'tests/**/*.js': ['webpack'],
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      fixWebpackSourcePaths: true,
      reporters: [{
          type: 'html',
        },
        {
          type: 'lcov',
        },
        {
          type: 'text',
        },
      ],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      optimization: {
        splitChunks: false,
        runtimeChunk: false,
        minimize: false,
      },
      module: {
        rules: [{
          test: /\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true,
            },
          },
          enforce: 'post',
          exclude: /node_modules|test/,
        }],
      },
    },
  }));
};
