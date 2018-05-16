<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Test :propMessage="'我操你大爷'" @change="change"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Test from './components/tset.vue';
@Component({
  components: {
    Test
  }
})
export default class App extends Vue{
  change(val:string) {
    console.log(val)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
