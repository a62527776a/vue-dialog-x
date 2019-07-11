<template lang="pug">
.dialog-x
  transition(name="fade")
    .dialog-x-window(v-if="show")
  transition(
    name="fade"
    @after-leave="transitionend")
    .dialog-x-pannel(v-if="show")
      .dialog-x-inner
        .dialog-x-title {{title}}
        .dialog-x-message {{message}}
      .dialog-x-action-bar
        .dialog-x-btn(@click="confirm") 确认
        .dialog-x-btn(@click="cancel" v-if="showCancel()") 取消
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { DIALOG_TYPES, DEFAULT_OPTIONS } from './config/constants'

@Component
export default class DialogXComponent extends Vue {
  resolve: Function = () => {}
  reject: Function = () => {}
  title: string = ''
  message: string = ''
  show: boolean = false
  dialogType: DIALOG_TYPES = DIALOG_TYPES.ALERT
  okText: string = DEFAULT_OPTIONS.okText
  cancelText: string = DEFAULT_OPTIONS.cancelText

  commit(options: any, type: DIALOG_TYPES) {
    let _data = Object.assign(this.$data, options)
    for (let key in _data) {
      this.$data[key] = _data[key]
    }
  }

  showCancel (): boolean {
    return this.dialogType === DIALOG_TYPES.CONFIRM
  }

  confirm () {
    this.resolve()
    this.show = false
  }

  cancel () {
    this.reject()
    this.show = false
  }

  transitionend () {
    if (!this.show) {
      this.$emit('confirm')
    }
  }

  mounted () {
    this.show = true
  }
}
</script>

<style lang="sass" scoped>

.dialog-x-window
  position: fixed;
  z-index: 998;
  left: 0;
  top: 0
  background: rgba(0,0,0,.4)
  height: 100vh;
  width: 100vw
.dialog-x-pannel
  width: 270px;
  z-index: 999;
  position: fixed;
  left: 50%;
  transform: translate3d(-50%,-50%,0) scale(1);
  top: 50%
  .dialog-x-title
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  .dialog-x-message
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
  .dialog-x-inner
    padding: 15px;
    background: $pannelColor
    border-radius: 13px 13px 0 0
.dialog-x-action-bar
  border-top: 1px solid rgba(0,0,0,.1) 
  display: flex;
  height: 44px;
  background: $pannelColor
  border-radius: 0 0 13px 13px
  @include flex
.dialog-x-btn
  color: $btnColor
  @include flex
  height: 44px;
  font-size: 17px;
</style>
