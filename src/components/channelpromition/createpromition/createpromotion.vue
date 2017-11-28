
<!-- 渠道推广 --- 推广计划 -->

<template>
  <div class="channelmanage">
    <!--创建推广计划-->
    <div>
      <el-button type="primary" @click="createchannelplan">创建推广计划</el-button>
        <create-children ref="childrefs" v-on:createModule="creataTable"></create-children>
    </div>
    <div class="primaryexplain">
      <p>说明：所建推广计划是指具体实施的营销活动，比如某次活动推广、书籍推广等</p>
    </div>
    <div >
      <div class="primition">
        <h4 class="primitiontitle">渠道推广列表</h4>
      </div>
      <p class="planinput">
        <el-input
          class="inputchannelplan"
          size="medium"
          placeholder="推广计划"
          v-model="channelplan"
          >
        </el-input>
        <el-input
          class="inputchannelname"
          size="medium"
          placeholder="渠道名称"
          v-model="channelname"
          >
        </el-input>
        <el-button type="primary" @click="inquirychannelplan()">查询</el-button>
      </p>
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="planName"
          label="推广计划"
          width="140">
        </el-table-column>
        <el-table-column
          fixed
          prop="chaId"
          label="渠道ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="chaName"
          label="渠道名称"
          width="160">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="dateFormat"
          label="创建时间"
          width="140">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small"  @click="handllookurls(scope.$index, scope.row)">查看并复制链接</el-button>
            <el-button type="primary" size="small" @click="handledelet(scope.$index, scope.row)">删除</el-button>
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
      <div></div>
    </div>
    <copy-children ref="copyref" :copyObj="copyObj"></copy-children>
  </div>
</template>

<script>
  import CopyChildren from './copychild.vue'
  import CreateChildren from './createchildren.vue'
  import Vue from 'vue'
  import moment from 'moment'
  import Axios from 'axios'
  Vue.prototype.$http = Axios
  export default {
    name: 'HelloWorld',
    data () {
      return {
        totalPages: '',
        radio: '',
        childBG: false,
        msg: 'Welcome to haimaqingfan',
        urls: 'http://api.haimaqingfan.com',
        tableData: [],
        booksTableData: [],
        handllookurlshow: false,
        dialogVisible: true,
        dialogTableVisible: false,
        dialogFormVisible: false,
        copyObj: {},
        form: {
//          获取input推广计划名字的输入内容
          channelplanname: '',
//          获取input原始内容输入内容
          originalcontent: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          option: ''
        },
        formLabelWidth: '120px',
        channelplan: '',
        channelname: '',
        channelArr: []
      }
    },
    methods: {
//      页码跳转执行函数
      pageHandler (val) {
        var that = this
//      获取推广计划列表的请求
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getPlanList',
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
      handledelet (index, row) {
        var that = this
        console.log(index, row)
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/deleteChaPlan',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            chaPlanId: row.chaPlanId,
            planId: row.planId
          }
        }).then(function (res) {
          that.createChannelAxiosPlan()
        })
      },
      handllookurls (index, row) {
        this.handllookurlshow = true
        console.log(row)
        this.channelArr = row
        this.copyObj = row
        this.$refs.copyref.copychildhandler()
      },
      createchannelplan () {
        this.dialogFormVisible = true
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getBookList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken}
        }).then(function (res) {
          console.log(res.data.data.content)
        })
        this.$refs.childrefs.childrenshowhandler()
      },
      createChannelAxiosPlan () {
        var that = this
//      获取推广计划列表的请求
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getPlanList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: 0,
            pageSize: 10
          }
        }).then(function (res) {
          that.tableData = res.data.data.content
        })
      },
//      点击创建推广计划的确定按钮执行函数
      plansure () {
        this.dialogFormVisible = false
        console.log(this.form.name)
      },
//      点击查询渠道推广计划列表执行
      inquirychannelplan () {
        var that = this
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getPlanList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: 0,
            pageSize: 10,
            planName: that.channelplan,
            chaName: that.channelname
          }
        }).then(function (res) {
          that.tableData = res.data.data.content
          console.log(res.data.data.content)
        })
      },
      handleCurrentChange () {
        console.log('handleCurrentChange')
      },
      dateFormat (row, column) {
        var date = row[column.property]
        if (date === null) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      },
//      自定义事件执行函数
      creataTable () {
        console.log(2222222333333434345345345634563456)
        var that = this
//      获取推广计划列表的请求
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getPlanList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: 0,
            pageSize: 10
          }
        }).then(function (res) {
          that.tableData = res.data.data.content
          that.totalPages = res.data.data.totalPages
          console.log(res.data.data.totalPages)
        })
      }
    },
    components: {
      CreateChildren,
      CopyChildren
    },
    created () {
      var that = this
//      获取推广计划列表的请求
      Axios({
        method: 'get',
        url: '/dtbt/channelPromotion/getPlanList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
        params: {
          pageNum: 0,
          pageSize: 10
        }
      }).then(function (res) {
        that.tableData = res.data.data.content
        that.totalPages = res.data.data.totalPages
        console.log(res.data.data.totalPages)
      })
//      获取书籍计划列表的请求
      Axios({
        method: 'get',
        url: '/dtbt/channelPromotion/getBookList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken}
      }).then(function (res) {
        that.booksTableData = res.data.data.content
        console.log(res.data.data.content)
      })
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
  .primitiontitle{
    margin-right: 10px;
    line-height: 30px;
  }
   .primition{
    display: flex;
    line-height: 30px;
   }
  .primitionnumber{
    color: gray;
  }
  .planinput{
    display: flex;
    margin-bottom: 20px;
  }
  .inputchannelname{
    width: 200px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .inputchannelplan{
    width: 200px;
  }
  .block{
  margin-top: 15px;
  margin-left: -5px;
  }
</style>
