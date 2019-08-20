<script>
export default {
  data () {
    return {
      dialogX: null
    }
  },
  methods: {
    notice () {
      if (!this.dialogX) this.createDialog()
      this.dialogX.dialog({html: '<img src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" />'})
    },
    createDialog () {
      this.dialogX = new window.VueDialogX(window.Vue)
    }
  }
}
</script>

# Dialog

## 配置项

param   | type   | default | desc
|----   | ----   | ------- | ----
html    | string | ''      | 可以传入html片段

## 基础用法

<template>
<button class="button" @click="notice">notice</button>
</template>

``` js
this.$dialog.dialog({
  html: '<img src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" />'
})
```
