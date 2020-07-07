# Vue-Dialog-X

<p align="center">
  <!-- <a href="https://travis-ci.org/a62527776a/vue-dialog-x">
    <img src="https://travis-ci.org/a62527776a/vue-dialog-x.svg?branch=master">
  </a> -->
  <a href='https://coveralls.io/github/a62527776a/vue-dialog-x?branch=master'><img src='https://coveralls.io/repos/github/a62527776a/vue-dialog-x/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href="https://www.npmjs.com/package/vue-dialog-x"><img src="https://img.shields.io/npm/dm/vue-dialog-x.svg" /></a>
  <br>
  </a>
  <img alt="npm type definitions" src="https://img.shields.io/npm/types/vue-dialog-x">
  <img alt="npm" src="https://img.shields.io/npm/v/vue-dialog-x">
  <p style="text-align: center">支持Promise的iOS样式风格的弹窗提示</p>
</p>

## 演示
自定义布局
![自定义布局](https://i.loli.net/2020/04/29/vEIHMmgAk6T2KlP.gif)
![8.gif](https://img.rr.tv/fe/2019715/alert.gif)
![8.gif](http://ued.rr.tv/0.3367761200861381%E5%BC%82%E6%AD%A5%E5%85%B3%E9%97%AD.gif)
![8.gif](https://img.rr.tv/fe/2019715/prompt.gif)
![8.gif](http://ued.rr.tv/0.25007438216585354actionswait.gif)
![弹窗图示](https://upload-images.jianshu.io/upload_images/5738345-0b61e6d1d6a27605.gif?imageMogr2/auto-orient/strip)


## 它能做什么

除了基本的alert、comfirm、prompt以外 我们还横向扩展了选项组的actions，以及自定义填充图片或者内容的dialog。

满足了基本需求外，我们还纵向扩展了点击弹窗时的异步载入能力，使其满足需要点击后加载数据，加载完成才能关闭弹窗的场景。

对于prompt，我们还提供了轻量可扩展的文本域校验以及错误提示。

由于该组件面向小型项目以及非工程化的项目，我们提供了umd打包的版本以及window打包的版本，以满足所有零碎项目的需求。

面向开发者，我们提供了完善的类型推导文件(d.ts)。使其在开发过程中拥有能够更好的体验。由于是基于Typescript开发的，我们的组件对Typescript项目拥有完全的亲和力。

## Links

[demo](https://htmlpreview.github.io/?https://github.com/a62527776a/vue-dialog-x/blob/master/docs/demo/index.html)

[Homepage and documentation](https://vue-dialog-x.github.io/)


## Features

- 丰富的弹窗类型

- 完善的类型推导

- 基于Promise

- 优雅的异步关闭

- 经典的iOS设计风格

- 支持渲染html

- 支持script标签引入

