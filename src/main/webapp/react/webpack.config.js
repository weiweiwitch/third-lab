var webpack = require('webpack');
var path = require('path');

var srcPath = path.resolve(__dirname, 'src');
var distPath = path.resolve(__dirname, 'builds');

module.exports = {
  context: srcPath,
  entry: {
    'main': 'main.js'
  },
  output: {
    path: distPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  }
};