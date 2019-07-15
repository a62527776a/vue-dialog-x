<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      VueDialogX是一个iOS风格的弹窗对话框。
    </p>
    <h3>使用</h3>
    <ul>
      <li><a @click="handleDialog('alert')" rel="noopener">Alert</a></li>
      <li><a @click="handleDialog('confirm')" rel="noopener">Confirm</a></li>
      <li><a @click="handleDialog('prompt')" rel="noopener">Prompt</a></li>
      <li><a @click="handleActionsDialog" rel="noopener">Actions</a></li>
    </ul>
    <h3>特性</h3>
    <ul>
      <li>
        <a @click="handleHTMLDialog" rel="noopener">渲染HTML模板</a>
        <textarea v-model="htmlString"></textarea>
      </li>
      <li><a @click="handleImgHTMLDialog" rel="noopener">自定义HTML（图片）</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://github.com/a62527776a/vue-dialog-x" target="_blank" rel="noopener">Github</a></li>
      <li><a href="https://github.com/a62527776a/vue-dialog-x/blob/master/demo/components/HelloWorld.vue" target="_blank" rel="noopener">实例代码</a></li>
    </ul>
    <!-- <h3>Ecosystem</h3>
    <ul>
      <li><a target="_blank" rel="noopener">vue-router</a></li>
      <li><a target="_blank" rel="noopener">vuex</a></li>
      <li><a target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a target="_blank" rel="noopener">vue-loader</a></li>
      <li><a target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script lang="js">
export default {
  props: ['msg'],
  data () {
    return {
      htmlString: `<a style="color: red">这是一个实例的html渲染 注意，html字段将会替换message字段</a>`
    }
  },
  methods: {
    async handleDialog (type) {
      let a = await this.$dialog[type]({
        title: '提示',
        message: `我是一个${type}弹窗`
      })
      if (typeof a === 'string') {
        this.$dialog.alert({
          title: '提示',
          message: `您输入了：${a}`
        })
      }
    },
    handleHTMLDialog () {
      this.$dialog.alert({
        html: this.htmlString
      })
    },
    handleNoTitle () {
      this.$dialog.alert({
        title: '',
        message: '这是一个没有title的弹窗'
      })
    },
    handleImgHTMLDialog () {
      this.$dialog.alert({
        title: '',
        html: `<img src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" />`
      })
    },
    async handleActionsDialog () {
      let result = await this.$dialog.actions({
        title: '多选项卡',
        message: 'Promise将返回点击按钮的下标',
        actions: [
          {
            okText: '操作1'
          },
          {
            okText: '操作2'
          },
          {
            okText: '操作3'
          },
          {
            okText: '操作4'
          }
        ]
      })
      this.$dialog.alert({
        message: '点击了第' + (result + 1) + '个按钮'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: underline;
}
</style>
