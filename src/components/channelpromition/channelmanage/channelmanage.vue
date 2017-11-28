
<!-- 渠道推广 --- 渠道管理 -->

<template>
  <div class="channelmanage">
    <div>
      <el-button type="primary" @click="open3">创建渠道</el-button>
    </div>
    <div class="primaryexplain">
      <p>说明：所建渠道是指推广面向的营销平台，比如微信、微博、合作方自有平台等</p>
    </div>
    <div >
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="渠道ID"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.chaId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="渠道名称"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.chaName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180">
          <template slot-scope="scope" >
            <span style="margin-left: 10px" >{{ scope.row.createTime | data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="totalPages * 10"
        @current-change="pageHandler">
      </el-pagination>
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
        totalPages: 1,
        msg: 'Welcome to haimaqingfan',
        urls: 'http://csapi.haimaqingfan.com',
        tableData: []
      }
    },
    methods: {
//      点击创建渠道后执行函数
      open3 () {
        this.$prompt('创建渠道', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '创建的渠道名称: ' + value
          })
//         向服务器发送创建渠道的请求
          var that = this
          Axios({
            method: 'post',
            url: '/dtbt/channelPromotion/createChannel',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
            params: {
              chaName: value
            }
          }).then(function (res) {
            console.log(res)
            that.CreateAxiosHandler()
          })
          console.log(value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
//      点击修改按钮后执行函数
      handleEdit (index, row) {
        var that = this
        console.log(index, row)
        console.log(row.chaId)
        console.log(row.chaName)
        this.$prompt('修改渠道', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: row.chaName
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '渠道名称: ' + value
          })
          console.log(value)
          console.log(row.chaId)
          that.UpdataAxiosHandler(value, row.chaId)
          that.CreateAxiosHandler()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
//      点击删除按钮后执行函数
      handleDelete (index, row) {
        var that = this
        console.log(index, row)
        console.log(row.chaId)
        console.log(row.chaName)
        that.DeleteAxiosHandler(row.chaId)
      },
//      elmentUI的时间格式化函（formatter）
      dateFormat (row, column) {
        var date = row[column.property]
        if (date === null) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
//      向服务器发送创建渠道名字信息的请求
      CreateAxiosHandler () {
        var that = this
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getChannelList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: 0,
            pageSize: 10
          }
        }).then(function (res) {
          that.tableData = res.data.data.content
          console.log(res.data.data.content)
        })
      },
//      向服务器发送修改渠道名字信息的请求
      UpdataAxiosHandler (NameValue, ChaIdValue) {
        var that = this
        Axios({
          method: 'post',
          url: '/dtbt/channelPromotion/updateChannel',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            chaName: NameValue,
            chaId: ChaIdValue
          }
        }).then(function (res) {
          that.CreateAxiosHandler()
          console.log(1111222)
        })
      },
//      向服务器发送删除渠道的请求
      DeleteAxiosHandler (ChaIdValue) {
        var that = this
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/deleteChannel',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            chaId: ChaIdValue
          }
        }).then(function (res) {
          that.CreateAxiosHandler()
          console.log(1111222)
        })
      },
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
      }
    },
    created () {
      var that = this
//      在页面加载前向服务器请求数据渲染页面
      Axios({
        method: 'get',
        url: '/dtbt/channelPromotion/getChannelList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          pageNum: 0,
          pageSize: 10
        }
      }).then(function (res) {
        that.tableData = res.data.data.content
        that.totalPages = res.data.data.totalPages
        console.log(res.data.data.content)
      })
    },
    filters: {
//      添加日期转换的过滤器
      data (input) {
        if (input === null) {
          return ''
        } else {
          var d = new Date(input)
          var year = d.getFullYear()
          var month = d.getMonth() + 1
          var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
          var hour = d.getHours()
          var minutes = d.getMinutes()
          var seconds = d.getSeconds()
          return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.primaryexplain{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  color: dimgrey;
}
  .block{
    margin-top: 15px;
    margin-left: -5px;
  }
</style>
