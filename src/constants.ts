export interface Action {
  okText: string
}

export interface GlobalOptions {
  title?: string
  message?: string
  dialogType?: DIALOG_TYPES
  okText: string,
  cancelText: string
  html?: string
  actions?: null | Array<Action>
  vnode?: any
}

export enum DIALOG_TYPES {
  ALERT   = 'ALERT',
  CONFIRM = 'CONFIRM',
  PROMPT  = 'PROMPT',
  ACTIONS = 'ACTIONS',
  DIALOG  = 'DIALOG'
}

export const DEFAULT_OPTIONS: GlobalOptions = {
  title: '提示',
  message: '',
  dialogType: DIALOG_TYPES.ALERT,
  okText: '确认',
  cancelText: '取消',
  html: '',
  actions: null
}
