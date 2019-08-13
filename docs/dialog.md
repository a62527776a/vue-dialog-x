<script>
export default {
  data () {
    return {
      dialogX: null
    }
  },
  mounted () {
    window.dialogX = new window.VueDialogX(window.Vue)
    window.notice = () => {
      dialogX.dialog({html: '<img src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" />'})
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

<button class="button" onclick="notice()">notice</button>

``` js
this.$dialog.dialog({
  html: '<img src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" />'
})
```
