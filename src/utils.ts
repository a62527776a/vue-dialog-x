import Vue, { VueConstructor } from 'vue'
import DialogXComponent from './dialog.vue'

export interface VueDialogXComponent extends Vue {
  commit: Function
}

export const disableTouchmove = (e: Event): void => {
  e.preventDefault()
}

export const createVm = (Vue: VueConstructor): VueDialogXComponent => {
  const DialogConstructor: VueConstructor = Vue.extend(DialogXComponent)
  const node: HTMLDivElement = document.createElement('div')
  const bodyDom: HTMLBodyElement | null = document.querySelector('body')
  bodyDom && bodyDom.appendChild(node)
  const _vm: VueDialogXComponent = new DialogConstructor()
  return _vm.$mount(node)
}