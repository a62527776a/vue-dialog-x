import Vue from 'vue'
import App from './App.vue'
import VueDialogX from '../dist/vue-dialog-x'
Vue.config.productionTip = false

Vue.use(VueDialogX)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
