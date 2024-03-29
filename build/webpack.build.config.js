const webpackBaseConfig = require('./webpack.base.config')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const webpackConfig = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, '../src/main.ts')
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'vue-dialog-x.js',
    libraryTarget: 'umd'
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}

module.exports = Object.assign(webpackBaseConfig, webpackConfig)