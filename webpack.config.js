const path = require('path');

module.exports = {
  entry: './server.js',  // Entry point for your application
  output: {
    filename: 'bundle.js',  // Output file name
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  resolve: {
    fallback: {
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "url": require.resolve("url/"),
        "fs": false, // Assuming you don't need fs for the frontend
        "net": false, // Assuming you don't need net for the frontend
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify")
    }
},
  mode: 'development',  // Can be 'development' or 'production'
  module: {
    rules: [
      {
        test: /\.js$/,  // Rule for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // If using Babel
        },
      },
      // Add other rules here if needed (e.g., for CSS, images, etc.)
    ],
  },
};
