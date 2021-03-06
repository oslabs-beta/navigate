const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options:{
          presets: ['@babel/preset-env', '@babel/preset-react',  "@babel/preset-typescript"]
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  //this is what enables users to leave off the extension when importing
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  // publicPath is causing 404 errors if incorrect
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'auto'
  },
  devServer: {
    proxy: {'/api': 'http://localhost:3000'},
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
    }),
],
}