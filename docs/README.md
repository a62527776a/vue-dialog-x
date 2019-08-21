<script>
export default {
  data () {
    return {
      dialogX: null
    }
  },
  methods: {
    createDialog () {
      this.dialogX = new window.VueDialogX(window.Vue)
    },
    dialogXFn (type) {
      if (!this.dialogX) this.createDialog()
      if (type === 'dialog') {
        this.dialogX[type]({
          html: '<img src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" />'
        })
      } else if (type === 'actions') {
        this.dialogX[type]({
          actions: [
            {
              okText: '王者荣耀'
            },
            {
              okText: 'DotA 2'
            },
            {
              okText: 'Bilibili'
            },
            {
              okText: '爱奇艺'
            }
          ]
        })
      } else {
        this.dialogX[type]({
          message: 'hello，DialogX'
        })
      }
    }
  },
  mounted () {
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-6177820902567416",
      enable_page_level_ads: true
    });
    this.dialogX = new window.VueDialogX(window.Vue)
  }
}
</script>
# 介绍

<a href="https://travis-ci.org/a62527776a/vue-dialog-x">
  <img src="https://travis-ci.org/a62527776a/vue-dialog-x.svg?branch=master">
</a>
<a href='https://coveralls.io/github/a62527776a/vue-dialog-x?branch=master'><img src='https://coveralls.io/repos/github/a62527776a/vue-dialog-x/badge.svg?branch=master' alt='Coverage Status' /></a>
<a href="https://www.npmjs.com/package/vue-dialog-x"><img src="https://img.shields.io/npm/dm/vue-dialog-x.svg" /></a>
<br>
</a>
<img alt="npm type definitions" src="https://img.shields.io/npm/types/vue-dialog-x">
<img alt="npm" src="https://img.shields.io/npm/v/vue-dialog-x">


**VueDialogX**的孵化是由于作者在工作性质决定的。
作者在日常的工作中，经常接到各种各样简单的H5页面需求，活动页需求

这些需求有着共同的一点，就是业务不算复杂，对于组件库中大量的组件无需用到

仅对Dialog、Toast有着高频需求。所以在开发时，pass掉组件库。希望有一个好用，美观，且满足需求的弹窗库。**VueDialogX**便孵化出来了。

<template>
<button class="button" @click="dialogXFn('alert')">点我试试 Alert</button>
<button class="button" @click="dialogXFn('confirm')">点我试试 Confirm</button>
<button class="button" @click="dialogXFn('prompt')">点我试试 Prompt</button><br />
<button class="button" @click="dialogXFn('actions')">点我试试 actions</button>
<button class="button" @click="dialogXFn('dialog')">点我试试 Dialog</button>
</template>

## 它能做什么

除了基本的alert、comfirm、prompt以外 我们还横向扩展了选项组的actions，以及自定义填充图片或者内容的dialog。

满足了基本需求外，我们还纵向扩展了点击弹窗时的异步载入能力，使其满足需要点击后加载数据，加载完成才能关闭弹窗的场景。

对于prompt，我们还提供了轻量可扩展的文本域校验以及错误提示。

由于该组件面向小型项目以及非工程化的项目，我们提供了umd打包的版本以及window打包的版本，以满足所有零碎项目的需求。

面向开发者，我们提供了完善的类型推导文件(d.ts)。使其在开发过程中拥有能够更好的体验。由于是基于Typescript开发的，我们的组件对Typescript项目拥有完全的亲和力。

## Features

**丰富的弹窗类型**

**完善的类型推导**

**基于Promise**

**优雅的异步关闭**

**经典的iOS设计风格**

**支持渲染html**

**支持script标签引入**


