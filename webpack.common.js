const path = require('path');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'app.js',
    libraryTarget: 'this',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      },
    }],
  },
  externals: {
    Gmail: 'Gmail',
    ScriptApp: 'ScriptApp',
  },
  plugins: [
    new GasPlugin(),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    fallback: {
      fs: false
    }
  }
};
