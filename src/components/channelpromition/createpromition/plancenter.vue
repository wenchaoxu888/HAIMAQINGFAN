<template>
  <div class="plancenterDiv" v-show="planshow">
    <div class="plancenter">
      <div class="planteststyle">计划文案</div>
      <div class="planTEXTDiv">
        <div id="plancenters" ref="copyCenterValue" v-html='copycenter'></div>
      </div>
      <div class="centerBtn">
        <el-button type="primary" size="small" class="btncenterfun"  @click="copycopyconterhandler()" data-clipboard-target="#plancenters">复制内容</el-button>
        <el-button type="primary" size="small"  @click="planshowdel()" >关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        planshow: false,
        msg: 'Welcome to haimaqingfan'
      }
    },
    props: {
      copycenter: {
        type: String
      }
    },
    methods: {
      plancentershow () {
        this.planshow = true
      },
      copycopyconterhandler () {
        let clipboardcenter = new Clipboard('.btncenterfun')
        clipboardcenter.on('success', e => {
          // 释放内存
          clipboardcenter.destroy()
          console.log(222)
        })
        clipboardcenter.on('error', e => {
          // 不支持复制
          console.log(333)
          alert('浏览器不支持自动复制，请手动复制微信号')
          // 释放内存
          clipboardcenter.destroy()
        })
      },
      planshowdel () {
        this.planshow = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.plancenterDiv{
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 70;
  background-color: rgba(0,0,0,0.5);
}
  .plancenter{
    border-radius: 5px;
    width: 90%;
    height: 80%;
    background-color: white;
    margin-left: 5%;
    margin-top: 5%;
    padding-top: 2%;
  }
 #plancenters{
   overflow: auto;
   height: 80%;
   padding-top: 2%;
   padding-bottom: 2%;
 }
  .planteststyle{
    font-weight: 700;
    font-size: 16px;
    line-height: 40px;
    padding-left: 2%;
    border-bottom: solid 1px #ccc;
  }
  .centerBtn{
    border-top: solid 1px #CCC;
    padding-top: 2%;
    padding-bottom: 3%;
    padding-left: 70%;
  }
  .planTEXTDiv{
    height: 90%;
  }
</style>
