# Vue-Dialog-X
##### 支持Promise的iOS样式风格的弹窗提示

**[live demo](https://a62527776a.github.io/vue-dialog-x/)**

![8.gif](https://img.rr.tv/fe/2019715/alert.gif)
![8.gif](https://img.rr.tv/fe/2019715/confirm.gif)
![8.gif](https://img.rr.tv/fe/2019715/prompt.gif)
![8.gif](https://img.rr.tv/fe/2019715/prompt.gif)
![8.gif](https://img.rr.tv/fe/2019715/actions.gif)

## Installation and use

```
$ yarn add vue-dialog-x
or
$ npm install vue-dialog-x
```

```
// main.js
import App from './App.vue'
import VueDialogX from 'vue-dialog-x'
import Vue from 'vue'

const globalOpt = {
  title: '提示',
  okText: '确认',
  cancelText: '取消'
}

Vue.use(VueDialogX,
  globalOpt // 可选
)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

```
// App.vue
<script>
export default {
  name: 'xxx',
  data () {
    return {
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
    }
  },
  methods: {
    handleDialog: async function () {
      await this.$dialog.alert()
      await this.$dialog.confirm()
      let result = await this.$dialog.prompt()
      console.log(result) // 将返回用户在prompt弹窗中填写的内容
      let result = await this.$dialog.actions({
        actions: this.actions,
        message: '这个是多个选项的弹窗提示'
      })
      console.log(result) // 将返回下标
    }
  }
}
</script>
```

# API

```
const opt = {
  title: '提示',
  message: '',
  okText: '确认',
  cancelText: '取消',
  html: ''
}

this.$dialog.alert(opt)
this.$dialog.confirm(opt)
this.$dialog.prompt(opt)

----------------------------------------------------------------------------

const actionsOpt = {
  message: '这个是多个选项的弹窗提示',
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
}

let result = await this.$dialog.actions(actionsOpt)
this.$dialog.alert({
  message: '点击了第' + (result + 1) + '个按钮'
})
```
