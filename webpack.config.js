const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HTMLPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: false
    })
  ],
  output: {
    filename: 'lotterygame.js',
    path: path.resolve(__dirname, 'dist'),
  },
}