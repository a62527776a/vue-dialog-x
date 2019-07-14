<template>
  <div id="app">
    <h1 @click="handleDialog">Alert</h1>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Vue from 'vue'

export default {
  components: {
    HelloWorld
  },
  methods: {
    async handleDialog () {
      try {
        let a = await this.$dialog.confirm({
          title: '这个是一个问题12',
          message: '我觉545'
        })
      } catch (e) {
        window.confirm('这是什么啊')
        this.$dialog.alert({
          title: 'catch',
          message: '我觉545'
        })
      }
    }
  },
  created () {

  }
}
</script>

<style lang="sass" scoped>
@import "../src/styles/index.sass";

#app
  @include flex
</style>
