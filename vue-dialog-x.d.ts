import _Vue from 'vue'

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

export declare class VueDialogX {
  confirm (): void
  alert (): void
  prompt (): void
  actions (): void
  dialog (): void
}

export declare function install(Vue: typeof _Vue): void;

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: VueDialogX
  }
}
