const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  // Tell devServer where to look for files:
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase:  __dirname + '/public',
  },

  module: {
    rules: [
      // CSS Rule
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // Font Rule
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      // Images rule
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'Star Wars API',
      template: './src/index.html'
    })
  ]
}