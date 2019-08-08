const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.ts', '.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }
          }
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      }
    ]
  }
}