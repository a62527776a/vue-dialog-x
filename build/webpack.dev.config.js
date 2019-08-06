const webpackBaseConfig = require('./webpack.base.config')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpackConfig = {
  entry: {
    main: path.join(__dirname, '../demo/main.js')
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html')
    }),
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}

module.exports = Object.assign(webpackBaseConfig, webpackConfig)