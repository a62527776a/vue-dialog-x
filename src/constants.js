export const DIALOG_TYPES = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
  PROMPT: 'PROMPT',
  ACTIONS: 'ACTIONS',
  DIALOG: 'DIALOG'
}

export const DEFAULT_OPTIONS = {
  title: '提示',
  message: '',
  dialogType: DIALOG_TYPES.ALERT,
  okText: '确认',
  cancelText: '取消',
  html: '',
  actions: null
}
