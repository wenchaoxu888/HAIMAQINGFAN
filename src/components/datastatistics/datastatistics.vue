<template>
  <div class="datastatistics">
    <div>
      <h3>数据统计</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick()">
        <el-tab-pane class="eltabpane" label="总数据" name="first">
          <aggregate-data></aggregate-data>
        </el-tab-pane>
        <el-tab-pane label="渠道数据" name="second">
          <channel-data></channel-data>
        </el-tab-pane>
        <el-tab-pane label="推广数据" name="third">
          <extension></extension>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import AggregateData from './aggregatedata/aggregatedata.vue'
  import ChannelData from './channeldata/channeldata.vue'
  import Extension from './extensiondata/extensiondata.vue'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    },
    components: {
      AggregateData,
      ChannelData,
      Extension
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .datastatistics{
    margin-top: 10px;
  }
  .eltabpane{
    width: 100%;
  }
</style>
