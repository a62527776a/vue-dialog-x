import DialogXComponent from './dialog.vue'

export interface VueDialogXComponent {
  commit: Function
  $mount: Function,
  $off: Function
  $destroy: Function
  $el: HTMLDivElement
  $on: Function
}

export const disableTouchmove = (e: Event): void => {
  e.preventDefault()
}

export const createVm = (Vue: any): VueDialogXComponent => {
  const DialogConstructor: any = Vue.extend(DialogXComponent)
  const node: HTMLDivElement = document.createElement('div')
  const bodyDom: HTMLBodyElement | null = document.querySelector('body')
  bodyDom && bodyDom.appendChild(node)
  const _vm: VueDialogXComponent = new DialogConstructor()
  return _vm.$mount(node)
}