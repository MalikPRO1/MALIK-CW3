// Importing required modules
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

// Exporting configuration object for webpack
module.exports = {
  // Entry point for bundling
  entry: './src/main.js',
  // Output configuration
  output: {
    // Output directory
    path: path.resolve(__dirname, 'dist'),
    // Output file name
    filename: 'app.js'
  },
  // Module configuration
  module: {
    // Rules for handling different file types
    rules: [
      {
        // Rule for processing Vue files
        test: /\.vue$/,
        // Loader for Vue files
        loader: 'vue-loader'
      },
      {
        // Rule for processing JavaScript files
        test: /\.js$/,
        // Loader for JavaScript files
        loader: 'babel-loader',
        // Exclude node_modules directory from processing
        exclude: /node_modules/
      },
      {
        // Rule for processing CSS files
        test: /\.css$/,
        // Loaders for CSS files
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  // Plugins configuration
  plugins: [
    // Adding VueLoaderPlugin as a plugin
    new VueLoaderPlugin()
  ],
};
