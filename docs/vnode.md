<script>
export default {
  data () {
    return {
      dialogX: null,
      quanyi: [{
        cover: 'http://ued.rr.tv/icon_qiandao_s.png',
        title: '超值优惠',
        desc: '续费61折',
      }, {
        cover: 'http://ued.rr.tv/icon_qiandao_s.png',
        title: '省心省力',
        desc: '自由续费可取消',
      }, {
        cover: 'http://ued.rr.tv/icon_qiandao_s.png',
        title: '高速升级',
        desc: '赠小蜜蜂勋章',
      }]
    }
  },
  methods: {
    createDialog () {
      this.dialogX = new window.VueDialogX(window.Vue)
    },
    customDialog () {
      if (!this.dialogX) this.createDialog()
      let vnode = this.$createElement('div', { 
        class: 'quanyi-dialog-message'
      }, 
        this.quanyi.map(item => this.$createElement('div', {
          class: 'quanyi-dialog-message-item'
        }, [
          this.$createElement('img', { attrs: { src: item.cover, style: 'width: 33px;margin-bottom: 0.1rem' }, class: 'quanyi-dialog-message-item-cover' }),
          this.$createElement('div', { class: 'quanyi-dialog-message-item-title' }, item.title),
          this.$createElement('div', { class: 'quanyi-dialog-message-item-desc' }, item.desc)
        ]))
      )
      this.dialogX.confirm({
        title: '取消自动续费',
        vnode
      })
    },
  },
  mounted () {
  }
}
</script>
<style>

.quanyi-dialog-message {
  display: flex;
  justify-content: space-between
}
.quanyi-dialog-message-item-title {
  color: #333333;
  font-size: 15px
}
.quanyi-dialog-message-item-desc {
  color: #919699;
  font-size: 12px;
}
</style>
# 定制化自定义布局

对于需要高度自定义布局的样式  
提供字段接受一个虚拟dom片段

以实现定制化的需求

对于渲染函数 可以看https://cn.vuejs.org/v2/guide/render-function.html

## 配置项

param   | type   | default | desc
|----   | ----   | ------- | ----
vnode    | VNode | null      | 传入虚拟dom

## 基础用法

<template>
<button class="button" @click="customDialog">渲染VNode</button>
</template>

``` js
let vnode = this.$createElement('div', { 
  class: 'quanyi-dialog-message'
}, 
  this.quanyi.map(item => this.$createElement('div', {
    class: 'quanyi-dialog-message-item'
  }, [
    this.$createElement('img', { attrs: { src: item.cover, style: 'width: 33px;margin-bottom: 0.1rem' }, class: 'quanyi-dialog-message-item-cover' }),
    this.$createElement('div', { class: 'quanyi-dialog-message-item-title' }, item.title),
    this.$createElement('div', { class: 'quanyi-dialog-message-item-desc' }, item.desc)
  ]))
)
this.dialogX.confirm({
  title: '取消自动续费',
  vnode
})
```
