<template>
  <div id="app">
    <img alt="Vue logo" @click="handleDialog" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  async handleDialog () {
    try {
      let a = await this.$dialog.confirm({
        title: '这个是一个问题12',
        message: '我觉545'
      })
    } catch (e) {
      console.log('catch')
    }
  }
  created () {

  }
}
</script>
