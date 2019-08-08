import { DIALOG_TYPES, DEFAULT_OPTIONS, GlobalOptions } from './constants'
import { createVm, VueDialogXComponent } from './utils'

interface VueDialogXComponentObject {
  [index: string]: VueDialogXComponent
}

interface OpenOpt extends GlobalOptions {
  id?: number,
  resolve?: Function,
  reject?: Function
}

class VueDialogX {
  Vue: any
  $root: VueDialogXComponentObject
  globalOptions: GlobalOptions
  constructor (Vue: any, globalOptions?: GlobalOptions) {
    this.Vue = Vue
    this.$root = {}
    if (globalOptions) this.globalOptions = globalOptions
  }

  open (opt: OpenOpt, dialogType: DIALOG_TYPES): Promise<void> {
    let id: number = this.mountIfNotMounted(opt.id)
    let _DEFAULT_OPTIONS: GlobalOptions = JSON.parse(JSON.stringify(DEFAULT_OPTIONS))
    let _opt: GlobalOptions = Object.assign(_DEFAULT_OPTIONS, this.globalOptions)
    return new Promise((resolve, reject) => {
      opt.resolve = resolve
      opt.reject = reject
      opt.dialogType = dialogType
      const options: GlobalOptions = Object.assign(_opt, opt)
      this.$root[id].commit(options)
    })
  }

  mountIfNotMounted (_id?: number): number {
    let vm: VueDialogXComponent = createVm(this.Vue)
    let id: number = 0
    _id ? id = _id : id = new Date().valueOf()
    this.$root[id] = vm
    vm.$on('confirm', () => this.remove(id))
    vm.$on('cancel', () => this.remove(id))
    return id
  }

  remove (id: number): void {
    this.$root[id].$off()
    this.$root[id].$destroy()
    this.$root[id].$el.remove()
    delete this.$root[id]
  }

  
  confirm (opt: OpenOpt = DEFAULT_OPTIONS) {
    return this.open(opt, DIALOG_TYPES.CONFIRM)
  }

  alert (opt: OpenOpt = DEFAULT_OPTIONS) {
    return this.open(opt, DIALOG_TYPES.ALERT)
  }

  prompt (opt: OpenOpt = DEFAULT_OPTIONS) {
    return this.open(opt, DIALOG_TYPES.PROMPT)
  }

  actions (opt: OpenOpt = DEFAULT_OPTIONS) {
    return this.open(opt, DIALOG_TYPES.ACTIONS)
  }

  dialog (opt: OpenOpt = DEFAULT_OPTIONS) {
    return this.open(opt, DIALOG_TYPES.DIALOG)
  }

}



const install = (Vue: any, options?: GlobalOptions) => {
  Vue.prototype.$dialog = new VueDialogX(Vue, options)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.VueDialogX = VueDialogX
}

export default {
  install,
  VueDialogX
}
