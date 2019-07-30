const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname + '/main.js')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue']
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader"
    },{
      test: /\.pug$/,
      oneOf: [
        // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
        {
          resourceQuery: /^\?vue/,
          use: ['pug-plain-loader']
        },
        // 这条规则应用到 JavaScript 内的 pug 导入
        {
          use: ['raw-loader', 'pug-plain-loader']
        }
      ]
    }, {
      test: /\.js$/,
      loader: [
        'babel-loader'
      ],
      exclude: /node_modules/
    }, {
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
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            appendTsxSuffixTo: [/\.vue$/]
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
    }),
    new VueLoaderPlugin()
  ]
}
