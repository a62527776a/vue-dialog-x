const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname + '/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../docs/'),
    filename: 'vue-dialog-x.js'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: "vue-loader"
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    }, {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true,
            data: `@import "~@/styles/index.sass";`
          }
        }
      ]
    }]
  },
  devServer: {
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html')
    })
  ]
}