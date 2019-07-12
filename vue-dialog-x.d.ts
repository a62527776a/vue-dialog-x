import Vue from 'vue'

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare function install(vue: typeof Vue): void

declare class VueDialogX extends Vue {}

export {
  VueDialogX
}

declare const _default: {
  install: typeof install
}

export default _default
