<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Login from './components/login/login.vue'
  import Vue from 'vue'
  import Axios from 'axios'
  Vue.prototype.$http = Axios
  export default {
    name: 'app',
    components: {
      Login
    },
    created () {
      Axios.defaults.baseURL = 'http://csapi.haimaqingfan.com'
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: lightskyblue;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }


</style>

