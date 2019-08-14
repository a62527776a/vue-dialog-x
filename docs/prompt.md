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
    window.normal = async () => {
      let res = await dialogX.prompt({message: '请输入地址'})
      dialogX.alert({message: res ? `您输入了 ${res}` : '您什么也没有输入'})
    }
    window.inputUserName = async () => {
      let res = await dialogX.prompt({
        message: '请输入用户名',
        fieldMessageTest: fieldMessage => {
          return fieldMessage
        },
        fieldMessageError: fieldMessage => {
          dialogX.alert({
            message: '请填写正确信息'
          })
        },
        wait: async (next, result) => { // result参数为用户填写的文本信息
          setTimeout(() => {
            next()
          }, 500)
        }
      })
      dialogX.alert({message: '您的信息已提交'})
    }
  }
}
</script>

# Prompt
返回Promise< string>

## 配置项
param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'
message | string | ''
okText  | string | '确定'
cancelText| string | '取消'
wait    | function / null | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用 效果与alert wait 类似 但是一旦进入加载状态 将隐藏取消按钮 第二个参数将返回输入数据
fieldMessageTest | function | null | 非必填，如果传入 必须返回boolean值 返回true验证通过，返回false验证失败，并会尝试调用fieldMessageError字段的函数
fieldMessageError | function | null | 非必填，如果fieldMessageTest函数返回false，将调用本函数

## 基础用法

<button class="button" onclick="normal()">normal</button>

``` js
async () => {
  let res = await dialogX.prompt({message: '请输入地址'})
  dialogX.alert({message: res ? `您输入了 ${res}` : '您什么也没有输入'})
}
```

## 校验文本域以及异步关闭

::: tip
校验文本域和异步调用可以分别使用也可以统一使用

意味着你可以只填写wait参数 也可以只填写fieldMessageTest fieldMessageError参数  

也可以全部填写，文档展示的是全部填写的情况
:::

<button class="button" onclick="inputUserName()">校验文本域</button>

``` js
async () => {
  let res = await dialogX.prompt({
    message: '请输入用户名',
    fieldMessageTest: fieldMessage => { // 如果这个参数存在，则会在点击确认前校验该参数。如果返回false，将不会继续执行并且调用fieldMessageError函数 必须返回布尔值
      return fieldMessage ? true : false
    },
    fieldMessageError: fieldMessage => {
      this.$dialog.alert({
        message: '请填写正确信息'
      })
    },
    wait: async (next, result) => { // result参数为用户填写的文本信息
      await axios.post('xxx', {body: {username: result}})
      next()
    }
  })
  dialogX.alert({
    message: '您的信息已提交'
  })
}
```