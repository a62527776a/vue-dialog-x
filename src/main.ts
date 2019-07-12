import Vue, { VueConstructor } from 'vue'
import DialogXComponent from './dialog.vue'
import { DIALOG_TYPES, DEFAULT_OPTIONS } from './config/constants'

class VueDialogX {
  Vue: VueConstructor
  $root: any = []
  globalOptions: any = {}
  constructor (globalOptions: any) {
    this.Vue = Vue
    this.globalOptions = globalOptions
  }

  open (opt: any, dialogType?: DIALOG_TYPES) {
    this.mountIfNotMounted()
    let _opt = Object.assign(DEFAULT_OPTIONS, this.globalOptions)
    return new Promise((resolve, reject) => {
      opt.resolve = resolve
      opt.reject = reject
      opt.dialogType = dialogType
      const options = Object.assign(_opt, opt)
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
      const DialogConstructor = DialogXComponent
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

const install = (Vue: VueConstructor, options?: any) => {
  Vue.prototype.$dialog = new VueDialogX(options)
}

export default {
  install
}