# Vue-Dialog-X
##### 支持Promise的iOS样式风格的弹窗提示

**[live demo](https://a62527776a.github.io/vue-dialog-x/)**

![8.gif](https://img.rr.tv/fe/2019715/alert.gif)
![8.gif](https://img.rr.tv/fe/2019715/confirm.gif)
![8.gif](https://img.rr.tv/fe/2019715/prompt.gif)

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

Vue.use(VueDialogX)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

```
// App.vue
<script>
export default {
  name: 'xxx',
  methods: {
    handleDialog: async function () {
      await this.$dialog.alert()
      await this.$dialog.confirm()
      let result = await this.$dialog.prompt()
      console.log(result) // 将返回用户在prompt弹窗中填写的内容
    }
  }
}
</script>
```

# API

```
this.$dialog.alert()
this.$dialog.confirm()
this.$dialog.prompt()
```
