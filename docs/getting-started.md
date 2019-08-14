<script>
export default {
  mounted () {
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-6177820902567416",
      enable_page_level_ads: true
    });
  }
}
</script>
# 起步

## script标签引入
我们提供了对零散html页面的支持。你可以在某些零碎的需求中使用它

``` html
<script src="https://unpkg.com/vue@2.6.10/dist/vue.js"></script> // 必须先引入vuejs
<script src="https://unpkg.com/vue-dialog-x/dist/vue-dialog-x.window.js"></script> // 推荐引入确定的版本

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

## UMD引入

### 安装

``` sh
$ yarn add vue-dialog-x
or
$ npm install vue-dialog-x
```

::: tip
VueDialogX 提供不同的装载方式 以满足开发者在项目中的需求  
只有自行初始化的方式提供类型推导
:::

### 自行初始化的方式
``` js
import App from './App.vue'
import Vue from 'vue'
import { VueDialogX } from 'vue-dialog-x'

// 如果不希望在Vue原型链上挂载
// 则自行new一个Dialog实例
// 业务内调用VueDialogX.xxx即可吊起弹窗
const dialogX = new VueDialogX(Vue)
 
// 如果这样使用，则享受d.ts带来自动推导的便捷
dialogX.alert({
  message: '由于d.ts的存在，将会自动推导相关参数'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### plugin挂载的形式
``` js
import App from './App.vue'
import Vue from 'vue'
import VueDialogX from 'vue-dialog-x'

// 使用这种方法，将会再Vue原型链上
// 挂载一个$dialog的实例
// 业务内调用this.$dialog.xxx即可吊起弹窗
Vue.use(VueDialogX)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 自行挂载原型链的方式
``` js
import App from './App.vue'
import Vue from 'vue'
import { VueDialogX } from 'vue-dialog-x'

const dialogX = new VueDialogX(Vue)

// 这样使用效果与plugin挂载的形式相同
Vue.prototype.$vueDialogX = dialogX

new Vue({
  render: h => h(App)
}).$mount('#app')
```
