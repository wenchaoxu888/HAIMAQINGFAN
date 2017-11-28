
<!-- 数据统计 --- 渠道数据 -->

<template>
  <div class="hello">
    <div>
      <div class="channel_first">
        <el-input v-model="channelNameinput" placeholder="渠道名称" class="channel_input"></el-input>
        <el-button class="channel_btn" type="primary"  @click="channelhandler()">查询</el-button>
        <el-button type="primary" @click="extensiondataexport()">导出</el-button>
      </div>
      <div class="channel_second">
        <el-table
          :data="tableData2"
          style="width: 100%"
          height="300"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="recTime"
            :formatter="dateFormat"
            label="日期"
            width="180">
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
          @current-change="pageHandler">
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
        dataPages: 0,
        urls: 'http://api.haimaqingfan.com',
        msg: 'Welcome to haimaqingfan',
        channelNameinput: '',
        datatime: new Date(),
        datalasttime: new Date(),
        tableData2: []
      }
    },
    created () {
      var that = this
      this.datatime = this.formatDateTime(this.datatime)
      this.datalasttime = that.formatDateTimeLast(that.datalasttime)
      //      请求充值记录
      Axios({
        method: 'get',
        url: '/dtbt/statis/getRechargeRecord',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          startDate: that.datalasttime,
          endDate: that.datatime
        }
      }).then(function (res) {
        that.tableData2 = res.data.data.content
        that.dataPages = res.data.data.totalPages
        console.log(res.data.data.content)
      })
    },
    methods: {
//      页码跳转执行函数
      pageHandler (val) {
        var that = this
//      获取渠道列表的请求
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getChannelList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: val - 1,
            pageSize: 10
          }
        }).then(function (res) {
          that.tableData = res.data.data.content
        })
        console.log('点击的页数' + val)
      },
      channelhandler () {
        var that = this
//        点击查询时根据输入的渠道名称 显示数据
        Axios({
          method: 'get',
          url: '/dtbt/statis/getRechargeRecord',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            startDate: that.datalasttime,
            endDate: that.datatime,
            chaName: that.channelNameinput
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
      formatDateTimeLast (date) {
        var y = date.getFullYear()
        var m = date.getMonth() - 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
      },
      dateFormat (row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      extensiondataexport () {
        window.open(this.urls + '/dtbt/statis/rechargeRecordExport' + '?startDate=' + this.datalasttime + '&endDate=' + this.datatime + '&accessToken=' + localStorage.accessToken)
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
