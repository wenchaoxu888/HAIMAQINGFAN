<template>
  <div class="indexhead">
    <h3>海马读书|渠道推广</h3>
    <div class="username">
      欢迎您：  {{username}}
    </div>
    <div class="logout" @click="logout()">
      退出
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'
  Vue.prototype.$http = Axios
  export default {
    name: 'indexhead',
    data () {
      return {
        urlsout: 'http://csapi.haimaqingfan.com/dtbt/loginout',
        username: sessionStorage.username,
        msg: 'Welcome to haimaqingfan'
      }
    },
    methods: {
      logout () {
        var that = this
        Axios({
          method: 'GET',
          url: this.urlsout,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function (res) {
          console.log(res)
          that.$router.push({ path: '/' })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.indexhead{
  width: 100%;
  display: flex;
  height: 55px;
  background-color: #404040;
}
  .indexhead h3{
    margin-left: 5%;
    color: white;
    line-height: 55px;
  }
  .username{
    margin-left: 50%;
    color: white;
    line-height: 64px;
  }
  .logout{
    margin-left: 10%;
    color: dodgerblue;
    font-weight: 700;
    line-height: 55px;
    cursor:pointer;
  }
</style>
