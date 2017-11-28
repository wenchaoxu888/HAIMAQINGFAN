<template>
  <div class="indexcenter">
    <div class="centerLeft">
      <el-row class="tac">
      <el-col :span="12">
        <el-menu
          class="el-menu-vertical-demo"
          @close="handleClose">
          <router-link to="/indexbody/datastatistics">
            <el-menu-item index="1">
              <span class="itemTitle">数据统计</span>
            </el-menu-item>
          </router-link>
          <router-link to="/indexbody/channelpromition">
            <el-menu-item index="2">
              <span class="itemTitle">渠道推广</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      </el-row>
    </div>
    <div class='routercenter'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'indexcenter',
    data () {
      return {
        msg: 'Welcome to haimaqingfan'
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .centerLeft{
    width: 40%;
    background-color: white;
  }
  .indexcenter{
    display: flex;
  }
  .routercenter{
    margin-left: -18%;
  }
  .itemTitle{
    padding-left: 16%;
  }
</style>
