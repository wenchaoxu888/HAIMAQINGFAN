<template>
  <div class="login">
    <div class="logo">海马轻帆.渠道分销</div>
    <h1>每一句话<br>
    都是一个好故事</h1>
    <div class="loginfrom">
      <div class="logintitle">用户登陆</div>
      <div>
        <span class="userName">*用户的账号</span>
        <el-input class="loginInputone" v-model="inputusername" placeholder="请输入用户名"></el-input>
      </div>
      <div>
        <span class="userName">*用户的密码</span>
        <el-input class="loginInputtwo" v-model="inputpassword" placeholder="请输入密码" type='password'></el-input>
      </div>
      <el-button class="loginBtn" type="primary" @click="loginBTN()">用户登陆</el-button>
    </div>
    <div class="loginfooter">©2017 北京海马轻帆娱乐科技有限公司</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'
  Vue.prototype.$http = Axios
  export default {
    name: 'HelloWorld',
    data () {
      return {
        inputusername: '',
        inputpassword: ''
      }
    },
    methods: {
      loginBTN () {
        console.log(2222)
        console.log(this.inputusername)
        console.log(this.inputpassword)
        var that = this
        Axios({
          method: 'post',
          url: '/dtbt/login',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          params: {
            loginName: this.inputusername,
            password: this.inputpassword
          }
        }).then(function (res) {
          console.log(res)
          if (res.data.data) {
            console.log(' 登陆成功')
            that.$router.push({ path: 'indexbody' })
            sessionStorage.username = that.inputusername
            localStorage.accessToken = res.data.data.accessToken
            console.log(localStorage.accessToken)
          } else {
            that.$alert('您的账号或者密码错误请重新输入', '尊敬的用户您好', {
              confirmButtonText: '确定'
            })
            console.log(' 账号密码错误 ')
          }
        })
      }
    },
    created () {
      console.log(111)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-image: url("http://o701c7dr2.bkt.clouddn.com/pic05_2x-4dc80f6067%20.jpg");
  }
  .logo{
    font-family: " 微软雅黑 ";
    margin: 16px 28px 16px 20px;
    font-weight: 700;
    line-height: 31px;
    font-size: 28px;
    color: #f5f5f5;
    letter-spacing: 0;
    text-shadow: 0 2px 2px rgba(0,0,0,.5);
  }
  .loginfrom{
    width: 33%;
    height: 60%;
    margin-left: 60%;
    background-color: white;
    border-radius: 5px;
  }
  .loginInputone{
    width: 70%;
    margin-left: 15%;
    margin-bottom: 20px;
  }
  .loginInputtwo{
    width: 70%;
    margin-bottom: 20px;
    margin-left: 15%;

  }
  .loginBtn{
    width: 70%;
    margin-top: 20px;
    margin-left: 15%;
    display: block;
  }
  .logintitle{
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-top: 80px;
    padding-top: 40px;
    margin-bottom: 30px;
  }
  .userName{
    margin-left: 15%;
    font-size: 12px;
    line-height: 30px;
  }
  h1{
    font-family: "ys";
    position: fixed;
    top: 200px;
    left: 50px;
    font-size: 56px;
    color: white;
  }
  .loginfooter{
    color: white;
    text-align: center;
    margin-top:6%;
    height: 15%;
    padding-top: 2%;
    font-size: 12px;
    background-color: #eaeaea;
  }

</style>
