<script>
export default {
  mounted () {
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-6177820902567416",
      enable_page_level_ads: true
    });
    let dialogX = new window.VueDialogX(window.Vue)
    window.dialogX = dialogX
  }
}
</script>


# 基础使用

## 全局配置

我们提供全局配置选项，以供修改基础配置


fields|type|default
|--   |-|-|
|title|string|'提示'|
|message|string|''|
|okText|string|'确认'|
|cancelText|string|'取消'|

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
