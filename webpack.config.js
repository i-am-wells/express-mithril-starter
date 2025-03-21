import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'development',
  entry: './public/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(import.meta.dirname, 'public/dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Practice app'
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};