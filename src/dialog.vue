<template lang="pug">
.dialog-x(@touchmove.prevent="disableTouchmove")
  transition(name="fade")
    .dialog-x-window(v-if="show")
  transition(
    name="modal-popup-in"
    @after-leave="transitionend")
    .dialog-x-pannel(v-if="show")
      .dialog-x-inner(:class="{ 'dialog-x-radius' : showDialog }")
        .dialog-x-title(v-if="!showDialog") {{title}}
        .dialog-x-message(v-if="!html") {{message}}
        .dialog-x-message(v-else
          v-html="html")
        input.dialog-x-field(
          v-if="showField"
          v-model="fieldMessage")
      template(v-if="!showDialog")
        .dialog-x-action-bar.dialog-x-btn-radius(v-if="!showActions")
          .dialog-x-btn(
            @click="confirm"
            @touchstart="") {{okText}}
          .dialog-x-cell
          .dialog-x-btn(
            @click="cancel"
            @touchstart=""
            v-if="showCancel") {{cancelText}}
        .dialog-x-action-bar(
          v-for="(act, idx) in actions"
          :class="{ 'dialog-x-btn-radius' : idx === (actions.length - 1) }")
          .dialog-x-btn.dialog-x-action-item(
            @click="confirm(idx)"
            @touchstart=""
            :key="idx"
            v-if="showCancel") {{act.okText}}
      template(v-else)
        .dialog-float-close(v-if="showDialog" @click="confirm")
          <svg t="1563279284795" class="icon close-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2026" width="200" height="200"><path d="M924.792 895.746l-383.83-384.758 381.808-382.733c7.997-8.017 7.997-21.016 0-29.032-7.999-8.018-20.962-8.018-28.962 0l-381.809 382.732-381.808-382.732c-7.997-8.018-20.964-8.018-28.962 0-7.996 8.018-7.996 21.016 0 29.032l381.809 382.733-383.831 384.758c-7.996 8.017-7.996 21.016 0 29.032 3.998 4.007 9.24 6.012 14.482 6.012 5.241 0 10.483-2.005 14.482-6.012l383.83-384.758 383.83 384.758c3.999 4.007 9.239 6.012 14.482 6.012s10.481-2.005 14.482-6.012c7.996-8.017 7.996-21.016-0.001-29.032z" p-id="2027" fill="#ffffff"></path></svg>
</template>

<script lang="ts">
import { DIALOG_TYPES, DEFAULT_OPTIONS, Action, GlobalOptions } from './constants'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VueDialogXComponent extends Vue {
  [index: string]: any
  resolve: Function = () => {}
  reject: Function = () => {}
  title: string = ''
  message: string = ''
  fieldMessage: string = ''
  show:boolean = false
  dialogType:DIALOG_TYPES = DIALOG_TYPES.ALERT
  okText:string = DEFAULT_OPTIONS.okText
  cancelText:string = DEFAULT_OPTIONS.cancelText
  html: string = ''
  actions: Array<Action> | null

  get showCancel (): boolean {
    return this.dialogType !== DIALOG_TYPES.ALERT
  }

  get showField (): boolean {
    return this.dialogType === DIALOG_TYPES.PROMPT
  }

  get showActions (): boolean {
    return this.dialogType === DIALOG_TYPES.ACTIONS
  }

  get showDialog (): boolean {
    return this.dialogType === DIALOG_TYPES.DIALOG
  }

  commit (options: GlobalOptions): void {
    let _data = Object.assign(this.$data, options)
    for (let key in _data) {
      this[key] = _data[key]
    }
  }

  confirm (idx: number) {
    let result: boolean | string | number = true
    if (this.showField) {
      result = this.fieldMessage
    } else if (this.showActions) {
      result = idx
    }
    this.show = false
    this.resolve(result)
  }

  disableTouchmove (e: Event): void {
    e.preventDefault()
  }

  cancel () {
    this.show = false
    this.reject()
  }

  transitionend () {
    if (!this.show) {
      this.$emit('confirm')
    }
  }

  mouent () {
    this.show = true
  }
}
</script>

<style lang="sass">
.dialog-x-message
  img
    width: 100%
</style>
<style lang="sass" scoped>
@import "./styles/index.sass";

.dialog-x-btn-radius
  border-radius: 0 0 13px 13px
.dialog-x-radius
  border-radius: 13px !important
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
  *
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  .dialog-x-title
    text-align: center
    font-size: 18px
    user-select: none
    font-weight: 500
    line-height: 21px
  .dialog-x-message
    text-align: center
    margin-top: 5px
    font-size: 14px
  .dialog-x-inner
    padding: 15px
    background: $pannelColor
    border-radius: 13px 13px 0 0
  .dialog-x-field
    width: 100%;
    box-sizing: border-box;
    margin-top: 15px
    padding: 0 5px;
    border-radius: 4px;
    box-shadow: none;
    font-size: 14px;
    height: 32px;
    border: 1px solid #ccc
.dialog-x-action-bar
  display: flex
  height: 44px
  overflow: hidden
  @include flex
  position: relative
.dialog-x-action-bar:before
  top: 0px
  width: 100%;
  height: 1px;
  background: $supperColor
  content: " ";
  position: absolute;
  transform: scaleY(0.5);
.dialog-x-btn
  color: $btnColor
  @include flex
  height: 44px
  background: $pannelColor
  font-size: 17px
  user-select: none
.dialog-x-cell
  position: relative;
  height: 44px;
.dialog-x-cell:before
  width: 1px;
  height: 44px;
  background: $supperColor
  content: " ";
  position: absolute;
  transform: scaleX(0.5);
.dialog-x-btn:active
  background: #EEE
.dialog-float-close
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid white;
  position: fixed;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(1)
  top: calc(100% + 30px)
  z-index: 1001
  @include flex
  .close-svg
    width: 20px;
    height: 20px;
</style>
