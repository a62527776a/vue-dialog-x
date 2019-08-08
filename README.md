# Vue-Dialog-X

<p align="center">
  <a href="https://travis-ci.org/a62527776a/vue-dialog-x">
    <img src="https://travis-ci.org/a62527776a/vue-dialog-x.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/a62527776a/vue-dialog-x?branch=master'><img src='https://coveralls.io/repos/github/a62527776a/vue-dialog-x/badge.svg?branch=master' alt='Coverage Status' /></a>
  <br>
  </a>
</p>

##### 支持Promise的iOS样式风格的弹窗提示

**[live demo](https://a62527776a.github.io/vue-dialog-x/)**

![8.gif](https://img.rr.tv/fe/2019715/alert.gif)
![8.gif](https://img.rr.tv/fe/2019715/confirm.gif)
![8.gif](https://img.rr.tv/fe/2019715/prompt.gif)
![8.gif](https://img.rr.tv/fe/2019715/actions.gif)
![弹窗图示](https://upload-images.jianshu.io/upload_images/5738345-0b61e6d1d6a27605.gif?imageMogr2/auto-orient/strip)

## Installation and use
VueDialogX支持script标签引入

```
// index.html
<script src="https://unpkg.com/vue@2.6.10/dist/vue.js"></script> // 必须先引入vuejs
<script src="https://unpkg.com/vue-dialog-x/dist/vue-dialog-x.window.js" />

<script>
var Dialog = new window.VueDialogX(window.Vue)
Dialog.alert({
    title: '提示',
    message: '测试'
}).then(() => {
    console.log('sss')
})
</script>
```

对于工程化项目，VueDialogX提供umd方式引入
```
$ yarn add vue-dialog-x
or
$ npm install vue-dialog-x
```

VueDialogX 提供两种挂载方式
一种使用Vue.use的方式挂载

```
// main.js

import App from './App.vue'
import Vue from 'vue'
import VueDialogX from 'vue-dialog-x'

const globalOpt = {
  title: '提示',
  okText: '确认',
  cancelText: '取消'
}

// 使用这种方法，将会再Vue原型链上
// 挂载一个$dialog的实例
// 业务内调用this.$dialog.xxx即可吊起弹窗
// globalOpt全局配置项查看下表*
Vue.use(VueDialogX, globalOpt)

new Vue({
  render: h => h(App)
}).$mount('#app')
```
or
```
// main.js

import App from './App.vue'
import Vue from 'vue'
import { VueDialogX } from 'vue-dialog-x'

const globalOpt = {
  title: '提示',
  okText: '确认',
  cancelText: '取消'
}

// 如果不希望在Vue原型链上挂载
// 则自行new一个Dialog实例
// 业务内调用VueDialogX.xxx即可吊起弹窗
// globalOpt全局配置项查看下表*
const dialogX = new VueDialogX(Vue, globalOpt)

// 或者将这个实例挂载在Vue原型链上
// 则和Vue.use相同的效果
Vue.prototype.$dialog = dialogX

new Vue({
  render: h => h(App)
}).$mount('#app')
```

* <a href="#GlobalOpt">globalOpt</a> 全局配置项

# API

###### <span id="GlobalOpt">GlobalOpt 全局配置</span>

fields|type|default
|--   |-|-|
|title|string|'提示'|
|message|string|''|
|okText|string|'确认'|
|cancelText|string|'取消'|

# Methods
###### VueDialog 实例方法

name|describe
|---|-------|
alert|只有确认按钮的弹出框
confirm|包含确认按钮以及取消按钮
prompt|包含确认按钮、取消按钮以及输入框
actions|包含多个自定义选项的输入框
dialog|用于自定义图片的弹窗