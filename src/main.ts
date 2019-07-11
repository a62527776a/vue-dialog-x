import { VueConstructor } from 'vue'
import DialogXComponent from './dialog.vue'
import { DIALOG_TYPES, DEFAULT_OPTIONS } from './config/constants'

class VueDialogX {
  Vue: VueConstructor
  $root: any = []
  constructor (Vue: VueConstructor) {
    this.Vue = Vue
  }

  open (opt: any, dialogType?: DIALOG_TYPES) {
    this.mountIfNotMounted()
    return new Promise((resolve, reject) => {
      opt.resolve = resolve
      opt.reject = reject
      opt.dialogType = dialogType
      const options = Object.assign(DEFAULT_OPTIONS, opt)
      this.$root[this.$root.length - 1].commit(options)
    })
  }

  async confirm (opt: any) {
    return this.open(opt, DIALOG_TYPES.CONFIRM)
  }

  async alert (opt: any) {
    return this.open(opt, DIALOG_TYPES.ALERT)
  }
  
  mountIfNotMounted () {
    let vm = (() => {
      const DialogConstructor = this.Vue.extend(DialogXComponent)
      const node = document.createElement('div')
      const bodyDom = document.querySelector('body')
      bodyDom && bodyDom.appendChild(node)
      const _vm = new DialogConstructor()
      return _vm.$mount(node)
    })()
    this.$root.push(vm)
    vm.$on('confirm', () => {
      this.remove(vm)
    })
    vm.$on('cancel', () => {
      this.remove(vm)
    })
  }

  remove (vm: any) {
    vm.$off()
    vm.$destroy()
    vm.$el.remove()
  }
}

export default {
  install: (Vue: VueConstructor) => {
    Vue.prototype.$dialog = new VueDialogX(Vue)
  }
}
