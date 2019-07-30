<template>
  <div id="app" class="app">
    <!-- <h1 @click="handleDialog">Alert</h1> -->
    <HelloWorld msg="欢迎使用 Vue-Dialog-X"/>
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

<style scoped lang="sass">
#app
  display: flex;
  justify-content: center;
  align-items: center
</style>
