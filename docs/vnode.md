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
    renderVNode () {
      if (!this.dialogX) this.createDialog()
      let customEl = this.$createElement('h1', {
        style: {
          color: 'red',
          fontSize: '22px'
        },
        on: {
          click: () => window.alert('123321')
        }
      }, '我是VNode，点我触发事件')
      this.dialogX.alert({
        vnode: customEl
      })
    }
  },
  mounted () {
  }
}
</script>

# 渲染VNode

对于需要渲染虚拟dom的，提供字段接受一个虚拟dom片段
以提供定制化的需求


## 配置项

param   | type   | default | desc
|----   | ----   | ------- | ----
vnode    | VNode | null      | 传入虚拟dom

## 基础用法

<template>
<button class="button" @click="renderVNode">渲染VNode</button>
</template>

``` js
let customEl = this.$createElement('h1', {
  style: {
    color: 'red',
    fontSize: '22px'
  },
  on: {
    click: () => window.alert('123321')
  }
}, '我是VNode，点我触发事件')
this.$dialog.alert({
  vnode: customEl
})
```
