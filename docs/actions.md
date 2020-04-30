<script>
export default {
  data () {
    return {
      dialogX: null,
      list: [
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
    }
  },
  methods: {
    createDialog () {
      this.dialogX = new window.VueDialogX(window.Vue)
    },
    selectActionColor () {
      let result = this.dialogX.actions({
        actions: [
          {
            okText: '你妈妈喊你回家吃饭',
            okTextColor: 'red'
          },
          {
            okText: 'skr~skr~',
            okTextColor: 'green'
          },
          {
            okText: '我觉得还行',
            okTextColor: 'blur'
          },
          {
            okText: '我觉得ok',
            okTextColor: 'blue'
          }
        ]
      })
    },
    async select () {
      if (!this.dialogX) this.createDialog()
      let result = await this.dialogX.actions({
        actions: this.list
      })
      dialogX.alert({
        message: `选择了${this.list[result].okText}选项`
      })
    },
    async waitSelect () {
      let result = await this.dialogX.actions({
        actions: this.list,
        wait: (next) => {
          setTimeout(() => {
            next()
          }, 500)
        }
      })
      this.dialogX.alert({
        message: `选择了${this.list[result].okText}选项`
      })
    }
  },
  mounted () {
    
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
okTextColor | string | ''
按钮颜色默认继承全局配置

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

<tempalte>
<button class="button" @click="select">多选项</button>
</tempalte>

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


## 异步关闭

<tempalte>
<button class="button" @click="waitSelect">异步关闭</button>
</tempalte>

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

## 按钮颜色

<tempalte>
<button class="button" @click="selectActionColor">多选项带颜色</button>
</tempalte>
