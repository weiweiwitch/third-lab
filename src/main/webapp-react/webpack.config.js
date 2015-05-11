module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  debug: true,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['jsx?harmony']
    }]
  }
};
