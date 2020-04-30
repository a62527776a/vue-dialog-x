<script>
export default {
  mounted () {
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-6177820902567416",
      enable_page_level_ads: true
    });
    let dialogX = new window.VueDialogX(window.Vue, {
      okTextColor: 'red',
      cancelTextColor: 'green'
    })
    window.dialogX = dialogX
  },
  methods: {
    createDialog () {
      this.dialogX = new window.VueDialogX(window.Vue)
    },
    async buy () {
      if (!this.dialogX) this.createDialog()
      await this.dialogX.confirm({message: '点击确认后购买', wait: next => setTimeout(() => next(), 1500)})
      this.dialogX.alert({message: '购买成功'})
    },
    confirm () {
      if (!this.dialogX) this.createDialog()
      this.dialogX.confirm({title: '这是一个标题', message: '这是一个内容', okText: '去登陆'})
    }
  }
}
</script>


# 基础使用

## 全局配置

<template>
<button class="button" @click="confirm">confirm</button>
</template>

我们提供全局配置选项，以供修改基础配置


fields|type|default
|--   |-|-|
|title|string|'提示'|
|message|string|''|
|okText|string|'确认'|
|cancelText|string|'取消'|
|okTextColor|string|'确认按钮文字颜色'|
|cancelTextColor|string|'取消按钮文字颜色'|

::: tip
单次调用传入的配置优先级高于全局配置高于默认配置
:::

``` js
const globalOpt = {
  title: '这是一个标题',
  message: '这是一个内容',
  okText: 'ok',
  cancelText: 'cancel'
}

import VueDialogX from 'vue-dialog-x'

Vue.use(VueDialogX, globalOpt)
// or
import { VueDialogX } from 'vue-dialog-x'

new VueDialogX(Vue, globalOpt)
```

## VueDialog 实例方法

name|describe|return
|---|-------|------|
alert|只有确认按钮的弹出框|Promise< void>
confirm|包含确认按钮以及取消按钮|Promise< void>
prompt|包含确认按钮、取消按钮以及输入框 点击确认返回输入input的文字|Promise< string>
actions|包含多个自定义选项的输入框 点击后返回点击按钮的下标|Promise< number>
dialog|用于自定义图片的弹窗|Promise< void>

``` js
this.$dialog.alert()
this.$dialog.confirm()
this.$dialog.prompt()
this.$dialog.actions()
this.$dialog.dialog()
```

## VueDialog 异步错误使用方法

wait 函数中 当执行失败后 可重新调用自身，实现递归执行

``` js
const initUserName = async () => {
  let res = await dialogX.prompt({
    message: '请输入用户名',
    fieldMessageTest: fieldMessage => { // 如果这个参数存在，则会在点击确认前校验该参数。如果返回false，将不会继续执行并且调用fieldMessageError函数 必须返回布尔值
      return fieldMessage ? true : false
    },
    // 失败的话将会调用这个函数 不执行wait函数
    fieldMessageError: fieldMessage => {
      this.$dialog.alert({
        message: '请填写正确信息'
      })
    },
    wait: async (next, result) => { // result参数为用户填写的文本信息
      let res = await axios.post('xxx', {body: {username: result}})
      if (res.code === 200) {
        next()
      } else {
        // 如果请求失败 那么提示之后
        await this.dialogX.alert({
          message: '请求失败'
        })
        // 重新弹窗
        this.inputUserName()
        next()
      }
    }
  })
  dialogX.alert({
    message: '您的信息已提交'
  })
}
```