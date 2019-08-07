import _Vue from 'vue'

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare global {
  interface Window {
    Vue: Function,
    VueDialogX: Function
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: string
  }
}

declare class VueDialogX {
  constructor(vue: _Vue, globalOptions: any)
  confirm (): void
  alert (): void
  prompt (): void
  actions (): void
  dialog (): void
}

declare function install(Vue: typeof _Vue): void;
