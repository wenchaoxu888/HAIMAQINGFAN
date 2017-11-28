
<!-- 数据统计 推广数据 -->

<template>
  <div class="hello">
    <div>
      <div class="channel_first">
        <el-input v-model="channelPlan" placeholder="推广计划选择" class="channel_input"></el-input>
        <el-input v-model="channelNameinput" placeholder="渠道名称" class="channel_input"></el-input>
        <el-button class="channel_btn" type="primary"  @click="channelplanhandler()">查询</el-button>
        <el-button type="primary" @click="extensiondataexport()">导出</el-button>
      </div>
      <div class="channel_second">
        <el-table
          :data="tableData2"
          style="width: 100%"
          height="250"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="planName"
            label="推广计划"
            width="180">
          </el-table-column>
          <el-table-column
            prop="chaId"
            label="	渠道ID">
          </el-table-column>
          <el-table-column
            prop="chaId"
            label="	渠道ID">
          </el-table-column>
          <el-table-column
            prop="chaName"
            label="	渠道名称">
          </el-table-column>
          <el-table-column
            prop="rechUserName"
            label="	充值用户">
          </el-table-column>
          <el-table-column
            prop="recMoney"
            label="充值金额（分成前）"
            width="200">
          </el-table-column>
        </el-table>
      </div>
      <!--分页器-->
      <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="dataPages * 10"
            @current-change="datapageHandler">
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'
  import moment from 'moment'
  Vue.prototype.$http = Axios

  export default {
    name: 'HelloWorld',
    data () {
      return {
        dataPages: 1,
        urls: 'http://api.haimaqingfan.com',
        msg: 'Welcome to haimaqingfan',
        channelNameinput: '',
        channelPlan: '',
        datatime: new Date(),
        datalasttime: new Date(),
        tableData2: []
      }
    },
    created () {
      var that = this
      this.datatime = this.formatDateTime(this.datatime)
      this.datalasttime = this.formatDataLastTime(this.datalasttime)
      //      请求充值记录
      Axios({
        method: 'get',
        url: '/dtbt/statis/getRechargeRecord',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          pageNum: 0,
          pageSize: 10,
          startDate: that.datalasttime,
          endDate: that.datatime
        }
      }).then(function (res) {
        that.tableData2 = res.data.data.content
        that.dataPages = res.data.data.totalPages
        console.log(res.data.data)
      })
    },
    methods: {
//        点击分页的函数(向服务器请求点击页码的内容)
      datapageHandler (val) {
        var that = this
        this.datatime = this.formatDateTime(this.datatime)
        this.datalasttime = this.formatDataLastTime(this.datalasttime)
        //      请求充值记录
        Axios({
          method: 'get',
          url: '/dtbt/statis/getRechargeRecord',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: val - 1,
            pageSize: 10,
            startDate: that.datalasttime,
            endDate: that.datatime
          }
        }).then(function (res) {
          that.tableData2 = res.data.data.content
          that.dataPages = res.data.data.totalPages
          console.log(res.data.data)
        })
      },
      channelplanhandler () {
        var that = this
//        点击查询时根据输入的渠道名称 显示数据
        Axios({
          method: 'get',
          url: '/dtbt/statis/getRechargeRecord',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            startDate: that.datatime,
            endDate: that.datatime,
            chaName: that.channelNameinput,
            planName: that.channelPlan
          }
        }).then(function (res) {
          that.tableData2 = res.data.data.content
          console.log(res.data.data.content)
        })
      },
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      formatDateTime (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = 0
        var minute = 0
        var s = 0
        minute = minute < 10 ? ('0' + minute) : minute
        return y + '-' + m + '-' + d + ' ' + h + h + ':' + minute + ':' + s + s
      },
      formatDataLastTime (date) {
        var y = date.getFullYear()
        var m = date.getMonth()
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
      },
      extensiondataexport () {
        window.open(this.urls + '/dtbt/statis/rechargeRecordExport' + '?startDate=' + this.datalasttime + '&endDate=' + this.datatime + '&accessToken=' + localStorage.accessToken)
      },
//      dateFormat是element的formatter格式化内容的函数是element的formatter格式化内容的函数
      dateFormat (row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channel_first{
  display: flex;
  margin-top: 20px;
}
.channel_btn{
    margin-left: 10px;
}
  .channel_input{
    width: 25%;
    margin-right: 10px;
  }
  .channel_second{
    margin-top: 20px;
    width: 50rem;
  }
  .block{
    margin-top: 10px;
    margin-left: -5px;
  }
</style>
