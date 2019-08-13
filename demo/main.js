import Vue from 'vue'
import App from './App.vue'
// import { VueDialogX } from '../dist/vue-dialog-x'
import { VueDialogX } from '../src/main'
Vue.config.productionTip = false

let dialog = new VueDialogX(Vue)

dialog.alert({
  message: 'test'
})

// Vue.use(VueDialogX)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
