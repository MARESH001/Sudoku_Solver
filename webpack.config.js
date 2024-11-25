const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Entry file
  output: {
    filename: 'bundle.js', // Output bundle
    path: path.resolve(__dirname, './dist'), // Output directory
    publicPath: '/', // Serve files from root
  },
  devtool: 'inline-source-map', // Useful for debugging
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from 'public'
    },
    compress: true, // Enable gzip compression
    port: 9000, // Change the port if needed
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Automatically open the app in the browser
    historyApiFallback: true, // Support for Single Page Applications (SPA)
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env', // Transpile ES6+ to ES5
                {
                  useBuiltIns: 'usage', // Polyfill only what's used
                  corejs: 3, // Use core-js version 3
                  targets: '> 0.25%, not dead', // Browser compatibility targets
                },
              ],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties', // Enable class properties syntax
            ],
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: [
          'style-loader', // Inject styles into the DOM
          'css-loader', // Interpret @import and url() in CSS files
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new HtmlWebpackPlugin({
      template: 'public/index.html', // Use 'public/index.html' as the template
      inject: true, // Inject scripts into the template
    }),
  ],
};
