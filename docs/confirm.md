<script>
export default {
  data () {
    return {
      dialogX: null
    }
  },
  mounted () {
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-6177820902567416",
      enable_page_level_ads: true
    });
    window.dialogX = new window.VueDialogX(window.Vue)
    window.buy = async () => {
      await dialogX.confirm({message: '点击确认后购买', wait: next => setTimeout(() => next(), 1500)})
      dialogX.alert({message: '购买成功'})
    }
  }
}
</script>

# Confirm

返回Promise

## 配置项

param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'   
message | string | ''
okText  | string | '确定'
cancelText| string | '取消'
html    | string | ''      | 可以传入html片段 如若传入，将替换掉message内容
wait    | function | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用 效果与alert wait 类似 但是一旦进入加载状态 将隐藏取消按钮 点击确认才会调用wait

## 基础用法

<button class="button" onclick="dialogX.confirm({message: '请登陆后再试', okText: '去登陆'})">confirm</button>

``` js

await this.$dialog.confirm({
  title: '提示',
  message: '请登陆后再试',
  okText: '去登陆'
})

// do someting...

```

## 异步关闭用法

<button class="button" onclick="buy()">异步关闭</button>

``` js
async () => {
  await dialogX.confirm({
    message: '点击确认后购买', 
    wait: async next => {
      await fetch('xxx')
      next()
    }
  })
  dialogX.alert({message: '购买成功'})
}
```