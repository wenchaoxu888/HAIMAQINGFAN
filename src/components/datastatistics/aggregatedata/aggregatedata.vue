<!-- 数据统计 总数据-->

<template>
  <div class="aggre">
    <div class="aggre_first">
      <div>
        <p class="aggre_number">¥{{ newdata }}</p>
        <p class="aggre_text">今日充值金额</p>
      </div>
      <div>
        <p class="aggre_number">¥{{ yesterdata }}</p>
        <p class="aggre_text">昨日充值金额</p>
      </div>
      <div>
        <p class="aggre_number">¥{{ monthdata }}</p>
        <p class="aggre_text">本月充值金额</p>
      </div>
      <div>
        <p class="aggre_number">¥{{ historydata }}</p>
        <p class="aggre_text">总历史充值金额</p>
      </div>
    </div>
    <p class="aggre_monthstyle">上月分成前流水（税前）：<span class="monthdicide">¥{{ monthon }}</span></p>
    <p class="aggre_monthstyle">上月分成后流水（税前）：<span class="monthdicide">¥{{ monthside }}</span></p>
    <div class="aggre_table">
      <el-table
        :data="tableData2"
        style="width: 100%"
        height="250"
       >
        <el-table-column
          prop="recTime"
          :formatter="dateFormat"
          label="日期"
          width="185">
        </el-table-column>
        <el-table-column
          prop="recMoney"
          label="充值金额（分成前）"
          width="200">
        </el-table-column>
        <el-table-column
          prop="rechUserName"
          label="	充值用户">
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
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'
  import { formatDate } from '../../../date'
  import moment from 'moment'
  Vue.prototype.$http = Axios

  export default {
    data () {
      return {
        dataPages: 0,
        msg: 'Welcome to haimaqingfan',
        urls: '',
        newdata: '',
        yesterdata: '',
        monthdata: '',
        historydata: '',
        monthon: '',
        monthside: '',
        datatime: new Date(),
        datalasttime: new Date(),
        tableData2: []
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    created () {
      this.datatime = this.formatDateTime(this.datatime)
      this.datalasttime = this.formatDateTimelast(this.datalasttime)
      console.log(this.datatime)
      var that = this
//      今日充值的数据的请求
      Axios({
        method: 'get',
        url: '/dtbt/statis/getRechargeAmount',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          time: 1
        }
      }).then(function (res) {
        console.log(res)
        that.newdata = res.data.data
        console.log(that.newdata)
      })
//      昨日充值金额的数据请求
      Axios({
        method: 'get',
        url: '/dtbt/statis/getRechargeAmount',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          time: 2
        }
      }).then(function (res) {
        console.log(res)
        that.yesterdata = res.data.data
        console.log(that.yesterdata)
      })
//      本月充值金额的数据请求
      Axios({
        method: 'get',
        url: '/dtbt/statis/getRechargeAmount',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          time: 3
        }
      }).then(function (res) {
        console.log(res)
        that.monthdata = res.data.data
        console.log(that.monthdata)
      })
//      总充值金额的数据请求
      Axios({
        method: 'get',
        url: '/dtbt/statis/getRechargeAmount',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          time: 4
        }
      }).then(function (res) {
        console.log(res)
        that.historydata = res.data.data
        console.log(that.historydata)
      })
//      上月分成前流水
      Axios({
        method: 'get',
        url: '/dtbt/statis/getLastmonthRecord',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          divide: 1
        }
      }).then(function (res) {
        console.log(res)
        that.monthon = res.data.data
        console.log(that.monthon)
      })
//      上月分成后流水
      Axios({
        method: 'get',
        url: '/dtbt/statis/getLastmonthRecord',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          divide: 2
        }
      }).then(function (res) {
        console.log(res)
        that.monthside = res.data.data
        console.log(that.monthside)
      })
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
      formatDateTimelast (date) {
        var y = date.getFullYear()
        var m = date.getMonth()
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = 0
        var minute = 0
        var s = 0
        minute = minute < 10 ? ('0' + minute) : minute
        return y + '-' + m + '-' + d + ' ' + h + h + ':' + minute + ':' + s + s
      },
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
  .aggre_first{
    display: flex;
  }
  .aggre_first div{
    border: solid 1px #ccc;
    padding: 25px 40px 15px 40px;
    text-align: center;
    margin-left: 15px;
  }
  .aggre_number{
    font-size: 25px;
    line-height: 35px;
    font-weight: 700;
    color: red;
  }
  .aggre_text{
    font-size: 16px;
    color: gray;
  }
  .aggre_monthstyle .monthdicide{
    font-size: 13px;
    line-height: 13px;
    font-weight: 600;
    color: red;
  }
  .aggre_monthstyle{
    margin-top: 8px;
    font-size: 14px;
    margin-left: 15px;
  }
  .aggre .aggre_table{
    margin-top: 8px;
  }
  .block{
    margin-top: 10px;
    margin-left: -5px;
  }
</style>
