import Vue from 'vue'
import App from './App.vue'
import VueDialogX from '../dist/vue-dialog-x'
// import VueDialogX from '../src/main'
Vue.config.productionTip = false

// console.log(VueDialogX)

let vx = new VueDialogX.VueDialogX(Vue)

vx.alert({})
vx.confirm({})
vx.dialog({})

Vue.use(VueDialogX)

let app = new Vue({
  render: (h) => h(App)
}).$mount('#app')
