const webpackBaseConfig = require('./webpack.base.config')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpackConfig = {
  entry: {
    main: path.join(__dirname, '../src/main.ts')
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}

module.exports = Object.assign(webpackBaseConfig, webpackConfig)