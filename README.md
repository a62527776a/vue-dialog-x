# Vue-Dialog-X

<p align="center">
  <a href="https://travis-ci.org/a62527776a/vue-dialog-x">
    <img src="https://travis-ci.org/a62527776a/vue-dialog-x.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/a62527776a/vue-dialog-x?branch=master'><img src='https://coveralls.io/repos/github/a62527776a/vue-dialog-x/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href="https://www.npmjs.com/package/vue-dialog-x"><img src="https://img.shields.io/npm/dm/vue-dialog-x.svg" /></a>
  <br>
  </a>
  <img alt="npm type definitions" src="https://img.shields.io/npm/types/vue-dialog-x">
  <img alt="npm" src="https://img.shields.io/npm/v/vue-dialog-x">
</p>

##### 支持Promise的iOS样式风格的弹窗提示

**[live demo](https://a62527776a.github.io/vue-dialog-x/)**

![8.gif](https://img.rr.tv/fe/2019715/alert.gif)
![8.gif](http://ued.rr.tv/0.3367761200861381%E5%BC%82%E6%AD%A5%E5%85%B3%E9%97%AD.gif)
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

# <span id="Api">Api</span>

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

```
this.$dialog.alert({})
this.$dialog.confirm()
this.$dialog.prompt()
this.$dialog.actions({})
this.$dialog.dialog({})
```
# Param 

###### <span id="alertOpt">alertOpt</span>
param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'   
message | string | ''
okText  | string | '确定'
html    | string | ''      | 可以传入html片段 如若传入，将替换掉message内容
<a href="#wait">wait</a>    | function | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用

```
// example

this.$dialog.alert({
  title: '提示',
  message: '请登陆后再试'
})

// 异步关闭
this.$dialog.alert({
  message: '点击确定将发送请求',
  wait: async next => {
    await this.$axios.get('xxx') // 请求开始按钮上的文字将变为一个小旋转菊花
    next() // 请求结束后将结束loading状态
  }
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
<a href="#wait">wait</a>    | function | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用 效果与alert wait 类似 但是一旦进入加载状态 将隐藏取消按钮 点击确认才会调用wait
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
<a href="#wait">wait</a>    | function / null | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用 效果与alert wait 类似 但是一旦进入加载状态 将隐藏取消按钮 第二个参数将返回输入数据
fieldMessageTest | function | null | 非必填，如果传入 必须返回boolean值 返回true验证通过，返回false验证失败，并会尝试调用fieldMessageError字段的函数
fieldMessageError | function | null | 非必填，如果fieldMessageTest函数返回false，将调用本函数
```
// example

this.$dialog.prompt({
  message: '请输入用户名'
}).then(res => {
  console.log('用户输入:' + res)
}).catch(() => {
  console.log('用户点击取消')
})

this.$dialog.prompt({
  message: '请输入用户名'
  fieldMessageTest: fieldMessage => { // 将回调弹窗中输入框的内容
    return fieldMessage ? true : false
  }
  fieldMessageError: fieldMessage => { // 可以做一些提示
    this.$dialog.alert({
      message: '请填写正确信息'
    })
  }
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
<a href="#wait">wait</a>    | function / null | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用 效果与alert wait 类似 但是一旦进入加载状态 将隐藏取消按钮 第二个参数将返回点击下标

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


###### <span id="wait">wait</span>
name|param|describe
|---|-----|-------|
wait|<a href="#waitOpt">waitOpt</a>|异步式调用必须的函数 传入这个参数后将等待next函数调用
###### <span id="waitOpt">waitOpt</span>
name|type|describe
|---|-----|----|-------|
next|function|当调用了next参数后，才会继续执行
result|string/number|对于actions中的wait，将回调用户点击确定按钮的下标，对于prompt中的wait，将回调用户输入的文本

```
methods: {
  async dialog () {
    this.$dialog.alert({
      wait: async next => {
        await fetch('xxx')
        next()
      }
    })
  },
  async confirm () {
    this.$dialog.alert({
      wait: async next => { // 点击取消不会调用wait函数
        await fetch('xxx')
        next()
      }
    })
  },
  async actions () {
    this.$dialog.actions({
      wait: async (next, result) => { // actions会回调点击按钮的下标
        await fetch('/user/' + result)
        next()
      }
    })
  },
  async prompt () {
    this.$dialog.prompt({
      fieldMessageTest: fieldMessage => { // 一般配合着使用， 必须返回true或false 如果返回false，则调用fieldMessageError函数 且不执行wait
        return fieldMessage ? true : false
      }
      fieldMessageError: fieldMessage => { // 可以做一些提示
        this.$dialog.alert({
          message: '请填写正确信息'
        })
      }
      wait: async (next, result) => { // result会回调输入框的数据
        await fetch('xxx', {body: {
          name: result
        }})
        next()
      }
    })
  }
}
```