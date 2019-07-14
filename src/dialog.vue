<template lang="pug">
.dialog-x
  transition(name="fade")
    .dialog-x-window(v-if="show")
  transition(
    name="modal-popup-in"
    @after-leave="transitionend")
    .dialog-x-pannel(v-if="show")
      .dialog-x-inner
        .dialog-x-title {{title}}
        .dialog-x-message {{message}}
      .dialog-x-action-bar
        .dialog-x-btn(
          @click="confirm"
          @touchstart="") {{okText}}
        .dialog-x-cell
        .dialog-x-btn(
          @click="cancel"
          @touchstart=""
          v-if="showCancel()") {{cancelText}}
</template>

<script>
import { DIALOG_TYPES, DEFAULT_OPTIONS } from './config/constants'

export default {
  name: 'DialogXComponent',
  data () {
    return {
      resolve: () => {},
      reject: () => {},
      title: '',
      message: '',
      show: false,
      dialogType: DIALOG_TYPES.ALERT,
      okText: DEFAULT_OPTIONS.okText,
      cancelText: DEFAULT_OPTIONS.cancelText
    }
  },
  methods: {
    commit (options, type) {
      let _data = Object.assign(this.$data, options)
      for (let key in _data) {
        this.$data[key] = _data[key]
      }
    },
    showCancel () {
      return this.dialogType === DIALOG_TYPES.CONFIRM
    },

    confirm () {
      this.resolve()
      this.show = false
    },

    cancel () {
      this.reject()
      this.show = false
    },

    transitionend () {
      if (!this.show) {
        this.$emit('confirm')
      }
    }
  },

  mounted () {
    this.show = true
  }
}
</script>

<style lang="sass" scoped>
@import "./styles/index.sass";

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
.dialog-x-action-bar
  display: flex
  height: 44px
  border-radius: 0 0 13px 13px
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
</style>
