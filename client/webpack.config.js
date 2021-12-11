const path = require('path');

module.exports = {
  devtool: "eval-cheap-source-map",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['', '.js', '.jsx', ".ts", ".tsx"],
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
