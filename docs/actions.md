<script>
export default {
  mounted () {
    let dialogX = new window.VueDialogX(window.Vue)
    window.dialogX = dialogX
    const list = [
      {
        okText: '你妈妈喊你回家吃饭'
      },
      {
        okText: 'skr~skr~'
      },
      {
        okText: '我觉得还行'
      },
      {
        okText: '我觉得ok'
      }
    ]
    window.select = async () => {
      let result = await dialogX.actions({
        actions: list
      })
      dialogX.alert({
        message: `选择了${list[result].okText}选项`
      })
    }
    window.waitSelect = async () => {
      let result = await dialogX.actions({
        actions: list,
        wait: (next) => {
          setTimeout(() => {
            next()
          }, 500)
        }
      })
      dialogX.alert({
        message: `选择了${list[result].okText}选项`
      })
    }
  }
}
</script>

# Actions

返回Promise< number> 用于多选项的情况

## 配置项

param   | type   | default | desc
|----   | ----   | ------- | ----
title   | string | '提示'
message | string | ''
okText  | string | '确定'
cancelText| string | '取消'
actions | Array< actionOpt> | null | 
wait    | function / null | null | 支持异步式调用 传入next参数 并在函数体中调用next()即可实现异步式调用 效果与alert wait 类似 但是一旦进入加载状态 将隐藏取消按钮 第二个参数将返回点击下标


### actionOpt
param   | type   | default
|----   | ----   | -------
okText   | string | ''

``` js
const exampleActions = [
  {
    okText: '你妈妈喊你回家吃饭'
  },
  {
    okText: 'skr~skr~'
  },
  {
    okText: '我觉得还行'
  },
  {
    okText: '我觉得ok'
  }
]
```

## 基础用法

<button onclick="select()">多选项</button>

``` js
async () => {
  let result = await dialogX.actions({ // 返回数组下标
    actions: exampleActions
  })
  dialogX.alert({
    message: `选择了${exampleActions[result].okText}选项`
  })
}
```


## 异步调用

<button onclick="waitSelect()">异步调用</button>


``` js
async () => {
  let result = await dialogX.actions({ // 返回数组下标
    actions: exampleActions,
    wait: async (next, result) => { // result为用户点击的数组下标
      await axios.post('xxx', {
        body: {
          opt: result
        }
      })
      next()
    }
  })
  dialogX.alert({
    message: `选择了${exampleActions[result].okText}选项`
  })
}
```
