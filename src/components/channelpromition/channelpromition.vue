<template>
  <div class="channelpromition">
    <div>
      <h3>渠道推广</h3>
      <el-tabs v-model="activeName" >
        <el-tab-pane class="eltabpane" label="渠道管理" name="first">
          <ChannelManage></ChannelManage>
        </el-tab-pane>
        <el-tab-pane label="推广计划" name="second">
          <create-promition></create-promition>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import ChannelManage from './channelmanage/channelmanage.vue'
  import CreatePromition from './createpromition/createpromotion.vue'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to haimaqingfan',
        activeName: 'first'
      }
    },
    components: {
      ChannelManage,
      CreatePromition
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channelpromition{
  margin-top: 10px;
}
</style>
