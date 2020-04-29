<script>
export default {
  data () {
    return {
      dialogX: null
    }
  },
  methods: {
    createDialog () {
      this.dialogX = new window.VueDialogX(window.Vue)
    },
    async buy () {
      if (!this.dialogX) this.createDialog()
      await this.dialogX.confirm({message: '点击确认后购买', wait: next => setTimeout(() => next(), 1500)})
      this.dialogX.alert({message: '购买成功'})
    },
    confirm () {
      if (!this.dialogX) this.createDialog()
      this.dialogX.confirm({message: '请登陆后再试', okText: '去登陆'})
    }
  },
  mounted () {
  }
}
</script>


# 引入自定义CSS

通过自定义css来配置弹窗样式


``` css
.dialog-x-pannel
  width: 300px !important
.dialog-x-inner
  border-radius: 6px 6px 0 0 !important
  padding: 28px 33px 26px 33px !important
.dialog-x-action-bar::before
  background: #CACBCC !important;
.dialog-x-cell::before
  height: 54px !important;
.dialog-x-cell
  height: 54px !important;
.dialog-x-title 
  font-weight: bold !important
  color: #333333 !important
  line-height: 27px !important
.dialog-x-message
  margin-top: 10px !important
  line-height: 21px !important
.dialog-x-btn-radius
  border-radius: 0 0 6px 6px !important
.dialog-x-action-bar
  height: 54px !important
.dialog-x-btn 
  color: #00BBFF !important
  height: 54px !important
  a
    color: #00BBFF !important
    font-weight: medium
.dialog-x-action-bar
  flex-direction: row-reverse !important

.dialog-x-window
  background: rgba(0,0,0,0.70) !important;
```