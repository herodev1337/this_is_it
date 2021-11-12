const path = require('path');

module.exports = {
  // entry: './src/index.js',
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['', '.js', '.jsx'],
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'app/index.html'
  //   })
  // ]
};
