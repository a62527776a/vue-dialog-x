import DialogXComponent from './dialog.vue'
import { DIALOG_TYPES, DEFAULT_OPTIONS } from './config/constants'

const VueDialogX = function (Vue, globalOptions = {}) {
  this.Vue = Vue
  this.$root = []
  this.globalOptions = globalOptions
  VueDialogX.prototype.open = (opt, dialogType) => {
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

  VueDialogX.prototype.confirm = (opt) => {
    return this.open(opt, DIALOG_TYPES.CONFIRM)
  }

  VueDialogX.prototype.alert = (opt) => {
    return this.open(opt, DIALOG_TYPES.ALERT)
  }

  VueDialogX.prototype.mountIfNotMounted = () => {
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

  VueDialogX.prototype.remove = (vm) => {
    vm.$off()
    vm.$destroy()
    vm.$el.remove()
  }
}

const install = (Vue, options = {}) => {
  Vue.prototype.$dialog = new VueDialogX(Vue, options)
}

export default {
  install
}
