<script>
export default {
  mounted () {
    let dialogX = new window.VueDialogX(window.Vue)
    window.dialogX = dialogX
  }
}
</script>

# Alert

返回Promise

## 配置项

param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'   
message | string | ''
okText  | string | '确定'
html    | string | ''      | 可以传入html片段 如若传入，将替换掉message内容
wait    | function | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用

## 基础用法

<button class="button" onclick="window.dialogX.alert({message: '普通弹窗'})">example</button>

``` js
this.$dialog.alert({
  title: '提示',
  message: '请登陆后再试'
})
```
## 异步关闭用法

<button class="button" onclick="window.dialogX.alert({message: '异步关闭的弹窗', wait: next => setTimeout(() => next(), 1500) })">异步关闭</button>

``` js
this.$dialog.alert({
  message: '点击确定将发送请求',
  wait: async next => {
    await this.$axios.get('xxx') // 请求开始按钮上的文字将变为一个小旋转菊花
    next() // 请求结束后将结束loading状态
  }
})
```
<!-- <button onclick="window.dialogX.alert({html: '<p>渲染p标签</p>'})">渲染html</button>

## 渲染html文本用法

::: tip
全系列支持渲染html

包括alert confirm prompt actions 以及 dialog
本文档案例仅展示
:::

``` js
this.$dialog.alert({
  html: '<p>渲染p标签</p>'
})
``` -->
