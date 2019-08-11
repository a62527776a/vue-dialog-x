<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      VueDialogX是一个iOS风格的弹窗对话框。
    </p>
    <p align="center">
      <a href="https://travis-ci.org/a62527776a/vue-dialog-x">
        <img src="https://travis-ci.org/a62527776a/vue-dialog-x.svg?branch=master">
      </a>
      <a href='https://coveralls.io/github/a62527776a/vue-dialog-x?branch=master'><img src='https://coveralls.io/repos/github/a62527776a/vue-dialog-x/badge.svg?branch=master' alt='Coverage Status' /></a>
      <a href="https://www.npmjs.com/package/vue-dialog-x"><img src="https://img.shields.io/npm/dm/vue-dialog-x.svg" /></a>
      <br>
      <img alt="npm type definitions" src="https://img.shields.io/npm/types/vue-dialog-x">
      <img alt="npm" src="https://img.shields.io/npm/v/vue-dialog-x">
    </p>
    <h3>基础用法</h3>
    <ul>
      <li><a class="alert-btn" @click="handleDialog('alert')" rel="noopener">Alert</a></li>
      <li><a class="alert-btn" @click="handleDialog('confirm')" rel="noopener">Confirm</a></li>
      <li><a class="alert-btn" @click="handleDialog('prompt')" rel="noopener">Prompt</a></li>
      <li><a class="alert-btn" @click="handleActionsDialog" rel="noopener">Actions</a></li>
      <li><a class="alert-btn" @click="handleDialogDialog" rel="noopener">Dialog</a></li>
    </ul>
    <h3>异步关闭</h3>
    <ul>
      <li><a class="alert-btn" @click="handleWaitDialog('alert')" rel="noopener">异步关闭(alert)</a></li>
      <li><a class="alert-btn" @click="handleWaitDialog('confirm')" rel="noopener">异步关闭(confirm)</a></li>
      <li><a class="alert-btn" @click="handleWaitActionsDialog" rel="noopener">异步关闭(actions)</a></li>
      <li><a class="alert-btn" @click="handleWaitPromptDialog" rel="noopener">异步关闭(prompt)</a></li>
    </ul>
    <h3>文本域检查</h3>
    <ul>
      <li><a class="alert-btn" @click="handleWaitPromptDialog" rel="noopener">文本域检查(prompt)</a></li>
    </ul>
    <h3>自定义渲染</h3>
    <ul>
      <li>
        <a @click="handleHTMLDialog" class="alert-btn" rel="noopener">渲染HTML模板</a>
        <textarea v-model="htmlString"></textarea>
      </li>
      <li><a class="alert-btn" @click="handleImgHTMLDialog" rel="noopener">自定义HTML（图片）</a></li><br /><br />
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a class="alert-btn" href="https://github.com/a62527776a/vue-dialog-x" target="_blank" rel="noopener">Github</a></li>
      <li><a class="alert-btn" href="https://github.com/a62527776a/vue-dialog-x/blob/master/demo/components/HelloWorld.vue" target="_blank" rel="noopener">实例代码</a></li>
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
    async handleWaitActionsDialog () {
      let result = await this.$dialog.actions({
        title: '异步关闭',
        message: '异步关闭过程中将冻结点击操作',
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
        ],
        wait: async (next, result) => {
          setTimeout(() => {
            next()
          }, 1000)
        }
      })
    },
    async handleWaitPromptDialog () {
      let result = await this.$dialog.prompt({
        title: '异步关闭&域文本检查',
        message: '调用fieldMessageTest函数返回false将调用传入fieldMessageError字段的函数，异步关闭和域文本检查可以复合使用',
        fieldMessageTest: (fieldMessage) => {
          return fieldMessage
        },
        fieldMessageError: (fieldMessage) => {
          this.$dialog.alert({
            message: '请填写正确信息'
          })
        },
        wait: (next, result) => {
          console.log(result)
          setTimeout(() => {
            next()
          }, 1000)
        }
      })
    },
    handleWaitDialog (type) {
      this.$dialog[type]({
        title: '异步关闭',
        message: '点击确定将在1s后关闭，异步关闭过程中将冻结点击操作',
        wait: next => {
          setTimeout(() => {
            next()
          }, 1000);
        }
      })
    },
    handleDialogDialog () {
      this.$dialog.dialog({
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
  },
  created () {
    // this.$dialog.prompt()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.alert-btn
  cursor: pointer
h3
  margin: 40px 0 0;
ul
  list-style-type: none;
  padding: 0;
li 
  display: inline-block;
  margin: 0 10px;
a 
  color: #42b983;
  text-decoration: underline;
</style>
