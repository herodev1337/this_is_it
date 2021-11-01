const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/client.js'),
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, '../server/public/js'),
  },
  mode: 'development',
  devtool: "source-map", //<-- for "unsafe-eval"-browser error
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
