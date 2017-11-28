<!-- 查看链接找到 -->

<template>
  <div v-if="copychildshow" class="copychildstyle">
    <div class="copychildcenter">
      <div class="copyTitle">推广计划信息</div>
      <div class="planName">{{copyObj.planName}}</div>
      <table class="planTab">
        <tr>
          <td class="planth1">渠道ID</td>
          <td class="planth2">渠道名称</td>
          <td class="planth3">书名</td>
          <td class="planth4">标题</td>
          <td class="planth5">推广链接</td>
          <td class="planth6">操作</td>
        </tr>
        <tr>
          <td>{{copyObj.chaId}}</td>
          <td>{{copyObj.chaName}}</td>
          <td>{{copyObj.bookName}}</td>
          <td id="plantitle" ref="copyTitleValue" >{{copyObj.copyTitle}}</td>
          <td id="planlink" ref="copyLinkValue" >{{copyObj.chaPlanLink}}</td>
          <td>
            <div>
              <el-button plain type="primary" size="small" @click="copytitle()" data-clipboard-target="#plantitle" class="btntitle">复制标题</el-button>
            </div>
            <div>
              <el-button plain type="primary" size="small" class="btnlink"  @click="copylink()" data-clipboard-target="#planlink">复制链接</el-button>
            </div>
            <div>
              <el-button plain type="primary" size="small" @click="copycentercoit()">查看内容</el-button>
              <plan-cernter ref="plancenterref" :copycenter="copycenter"></plan-cernter>
            </div>
          </td>
        </tr>
      </table>
      <div class="childDelSTY">
        <el-button type="primary" @click="copychilddel()">关闭</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'
  import Clipboard from 'clipboard'
  import PlanCernter from './plancenter.vue'
  Vue.prototype.$http = Axios
  export default {
    name: 'HelloWorld',
    data () {
      return {
        urls: 'http://csapi.haimaqingfan.com',
        dialogVisible: false,
        name: 'copyToClipboard',
        copychildshow: false,
        msg: 'Welcome to haimaqingfan',
        plancenter: '',
        copycenter: ''
      }
    },
    props: {
      copyObj: {
        type: Object
      }
    },
    methods: {
      copychildhandler () {
        this.copychildshow = true
      },
      copytitle () {
//        document.designMode = 'on'
//        console.log(this.$refs.copyTitleValue)
//        this.$refs.copyTitleValue.select()
//        document.execCommand('Cut', 'false', null)
        console.log(111)
        let clipboardtitle = new Clipboard('.btntitle')
        clipboardtitle.on('success', e => {
          // 释放内存
          clipboardtitle.destroy()
          console.log(222)
        })
        clipboardtitle.on('error', e => {
          // 不支持复制
          console.log(333)
          alert('浏览器不支持自动复制，请手动复制微信号')
          // 释放内存
          clipboardtitle.destroy()
        })
        console.log(444)
      },
      copylink () {
        let clipboardlink = new Clipboard('.btnlink')
        clipboardlink.on('success', e => {
          // 释放内存
          clipboardlink.destroy()
          console.log(222)
        })
        clipboardlink.on('error', e => {
          // 不支持复制
          console.log(333)
          alert('浏览器不支持自动复制，请手动复制微信号')
          // 释放内存
          clipboardlink.destroy()
        })
      },
      copycentercoit () {
        var that = this
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getCopyById',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            copyId: this.copyObj.copyId
          }
        }).then(function (res) {
          console.log(res.data.data)
          that.copycenter = res.data.data.copyContent
          that.$refs.plancenterref.plancentershow()
        })
      },
      copychilddel () {
        this.copychildshow = false
      }
    },
    components: {
      PlanCernter
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.copychildstyle{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  background-color: rgba(0,0,0,0.5);
}
  .copychildcenter{
    margin-left: 10%;
    width: 80%;
    margin-top: 10%;
    height: 300px;
    background-color: white;
    border-radius:5px;
  }
  .copyTitle{
    padding-top: 2%;
    padding-left: 2%;
    border-bottom: 1px solid #ccc;
  }
  .planName{
    margin-left: 2%;
    margin-top: 2%;
  }
  .planTab{
    margin-left: 5%;
    margin-top: 2%;
    width: 80%;
    border-radius: 5px;
    border-collapse: collapse;
  }
  .planTab td{
    height: 20px;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
  }
  .planth1{
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 30px;
    width: 100px;
    height: 50px;
    font-size: 14px;
    background-color: #eee;
  }
.planth2{
  width: 100px;
  height: 20px;
  background-color: #eee;
}
.planth3{
  width: 100px;
  height: 20px;
  background-color: #eee;
}
.planth4{
  width: 100px;
  height: 20px;
  background-color: #eee;
}
.planth5{
  width: 100px;
  height: 20px;
  background-color: #eee;
}
.planth6{
  width: 100px;
  height: 20px;
  background-color: #eee;
}
  .childDelSTY{
    margin-top: 2%;
    margin-left: 90%;
  }
</style>
