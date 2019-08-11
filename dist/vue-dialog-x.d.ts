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

export interface GlobalOption {
  title?: string
  okText?: string
  cancelText?: string
}

export interface Alert {
  title?: string
  message?: string
  okText?: string
  html?: string
  wait? (next: Function): void
}

export interface Confirm {
  title?: string
  message?: string
  okText?: string
  cancelText?: string
  html?: string
  wait? (next: Function): void
}

export interface Prompt {
  title?: string
  message?: string
  okText?: string
  cancelText?: string
  wait? (next: Function, result: string): void
  fieldMessageTest? (fieldMessage: string): boolean
  fieldMessageError? (fieldMessage: string): void
}

export interface Action {
  okText: string
}

export interface Actions {
  title?: string
  message?: string
  okText?: string
  wait? (next: Function, result: number): void
  actions: Array<Action>
}

export interface Dialog {
  html: string
}

declare class VueDialogX {
  constructor(vue: _Vue, globalOptions: GlobalOption)
  confirm (confirmOpt: Confirm): Promise<void>
  alert (alertOpt: Alert): Promise<void>
  prompt (promptOpt: Prompt): Promise<string>
  actions (actionsOpt: Actions): Promise<number>
  dialog (dialogOpt: Dialog): Promise<void>
}

declare function install(Vue: typeof _Vue): void;
