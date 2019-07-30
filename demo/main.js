import Vue from 'vue'
import App from './App.vue'
import VueDialogX from '../src/main.ts'
// import VueDialogX from '../dist/vue-dialog-x.js'
// console.log(VueDialogX)
// const VueDialogX = require('../dist/vue-dialog-x.umd.js')
// console.log(VueDialogX)
Vue.config.productionTip = false

Vue.use(VueDialogX)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
