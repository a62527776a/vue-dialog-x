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
也可以引入VueDialogX来自行初始化实例
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

name|param|describe|return
|---|-----|-------|------|
alert|<a href="#alertOpt">alertOpt</a>|只有确认按钮的弹出框|Promise< void>
confirm|<a href="#confirmOpt">confirmOpt</a>|包含确认按钮以及取消按钮|Promise< void>
prompt|<a href="#promptOpt">promptOpt</a>|包含确认按钮、取消按钮以及输入框 点击确认返回输入input的文字|Promise< string>
actions|<a href="#actionsOpt">actionsOpt</a>|包含多个自定义选项的输入框 点击后返回点击按钮的下标|Promise< number>
dialog|<a href="#dialogOpt">dialogOpt</a>|用于自定义图片的弹窗|Promise< void>

# Param 

###### <span id="alertOpt">alertOpt</span>
param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'   
message | string | ''
okText  | string | '确定'
html    | string | ''      | 可以传入html片段 如若传入，将替换掉message内容

```
// example

this.$dialog.alert({
  title: '提示',
  message: '请登陆后再试'
})
```

###### <span id="confirmOpt">confirmOpt</span>
param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'   
message | string | ''
okText  | string | '确定'
cancelText| string | '取消'
html    | string | ''      | 可以传入html片段 如若传入，将替换掉message内容

```
// example

this.$dialog.confirm({
  title: '提示',
  message: '请登陆后再试'
}).then(() => {
  console.log('用户点击确定')
}).catch(() => {
  console.log('用户点击取消')
})
```

###### <span id="promptOpt">promptOpt</span>
param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'
message | string | ''
okText  | string | '确定'
cancelText| string | '取消'

```
// example

this.$dialog.prompt({
  message: '请输入用户名'
}).then(res => {
  console.log('用户输入:' + res)
}).catch(() => {
  console.log('用户点击取消')
})
```

###### <span id="actionsOpt">actionsOpt</span>
param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'
message | string | ''
okText  | string | '确定'
cancelText| string | '取消'
actions | Array< <a href="#actionOpt">actionOpt</a>> | null | 

###### <span id="actionOpt">actionOpt</span>
param   | type   | default | desc
|----   | ----   | ------- | ----
okText   | string | ''

```
// example

this.$dialog.actions({
  title: '多选项卡',
  message: 'Promise将返回点击按钮的下标',
  actions: [
    {
      okText: '操作1'
    },
    {
      okText: '操作2'
    },
    {
      okText: '操作3'
    },
    {
      okText: '操作4'
    }
  ]
}).then(idx => {
  console.log('用户点击第:' + idx + '个按钮')
}).catch(() => {
  console.log('用户点击取消')
})
```


###### <span id="dialogOpt">dialogOpt</span>
param   | type   | default | desc
|----   | ----   | ------- | ----
html   | string | ''       | 填入html片段 最好放image标签进去


```
// example

this.$dialog.dialog({
  html: `<img src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" />`
})
```