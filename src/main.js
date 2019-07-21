import DialogXComponent from './dialog.vue'
import { DIALOG_TYPES, DEFAULT_OPTIONS } from './constants'

const VueDialogX = function (Vue, globalOptions = {}) {
  this.Vue = Vue
  this.$root = {}
  this.globalOptions = globalOptions
  VueDialogX.prototype.open = (opt = {}, dialogType) => {
    let id = this.mountIfNotMounted(opt.id)
    let _DEFAULT_OPTIONS = JSON.parse(JSON.stringify(DEFAULT_OPTIONS))
    let _opt = Object.assign(_DEFAULT_OPTIONS, this.globalOptions)
    return new Promise((resolve, reject) => {
      opt.resolve = resolve
      opt.reject = reject
      opt.dialogType = dialogType
      const options = Object.assign(_opt, opt)
      this.$root[id].commit(options)
    })
  }

  VueDialogX.prototype.confirm = (opt) => {
    return this.open(opt, DIALOG_TYPES.CONFIRM)
  }

  VueDialogX.prototype.alert = (opt) => {
    return this.open(opt, DIALOG_TYPES.ALERT)
  }

  VueDialogX.prototype.prompt = (opt) => {
    return this.open(opt, DIALOG_TYPES.PROMPT)
  }

  VueDialogX.prototype.actions = (opt) => {
    return this.open(opt, DIALOG_TYPES.ACTIONS)
  }

  VueDialogX.prototype.dialog = (opt) => {
    return this.open(opt, DIALOG_TYPES.DIALOG)
  }

  VueDialogX.prototype.mountIfNotMounted = (_id) => {
    let vm = (() => {
      const DialogConstructor = this.Vue.extend(DialogXComponent)
      const node = document.createElement('div')
      const bodyDom = document.querySelector('body')
      bodyDom && bodyDom.appendChild(node)
      const _vm = new DialogConstructor()
      return _vm.$mount(node)
    })()
    let id = null
    if (_id) {
      id = _id
    } else {
      id = new Date().getTime()
    }
    this.$root[id] = vm
    vm.$on('confirm', () => {
      this.remove(id)
    })
    vm.$on('cancel', () => {
      this.remove(id)
    })
    return id
  }

  VueDialogX.prototype.remove = (id) => {
    this.$root[id].$off()
    this.$root[id].$destroy()
    this.$root[id].$el.remove()
    delete this.$root[id]
  }
}

const install = (Vue, options = {}) => {
  Vue.prototype.$dialog = new VueDialogX(Vue, options)
}

export default {
  install
}
