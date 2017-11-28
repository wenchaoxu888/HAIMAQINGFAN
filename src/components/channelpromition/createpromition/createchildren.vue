
<!-- 渠道推广 --- 推广计划 --- 创建推广计划 -->

<template>
  <div class="createchildren" v-if="childshow">
    <div class="childrencenter">
      <div class="createtitle">
        <h5>创建推广计划</h5>
      </div>
      <!--输入推广计划名称-->
      <div class="createchannelDiv">
        <span class="createChannelDivSpan">推广计划名称</span>
        <el-input size="small" class="createchananelDivInput" v-model="inputchannelplan" placeholder="请输入推广计划名称(必填)"></el-input>
      </div>
      <!--输入原始内容-->
      <div class="createBookDiv">
          <span class="createChannelDivSpan">原始内容</span>
          <div class="createChannelDivInputBtn">
            <el-input class="createBookDivInput" size="small" v-model="inputbookname" placeholder="查询书名"></el-input>
            <el-button class="createBookDivbtn" size="small" type="primary" @click="queryBookName">查询</el-button>
          </div>
      </div>
      <div class="createBookTable">
        <el-table
          height="200"
          size="small"
          :data="booksTableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            label="书名"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.bookName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="选择文案"
            width="200">
            <template slot-scope="scope">
              <el-select v-model="selectvalue" placeholder="请选择文案">
                <el-option
                  v-for="item in scope.row.copy"
                  :key="item.copyId"
                  :label="item.copyTitle"
                  :value="item.copyId"
                 >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" plain>确定</el-button>-->
              <!--<el-button size="mini" type="primary" plain>确定</el-button>-->
              <el-button size="mini" type="primary" @click="handlelookEdit(scope.$index, scope.row)" plain>查看详情</el-button>
              <div>
                <div></div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--书籍控制分页器-->
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="booktotalPages * 10"
            @current-change="bookpageHandler">
          </el-pagination>
          <div></div>
        </div>
      </div>
      <div>
        <div class="createBookDiv">
          <span class="createChannelDivSpan">关联渠道</span>
          <div class="createChannelDivInputBtn">
            <el-input class="createBookDivInput" size="small" v-model="inputchannelidname" placeholder="查询渠道ID／渠道名称"></el-input>
            <el-button class="createBookDivbtn" size="small" type="primary" @click="querychannel">查询</el-button>
          </div>
        </div>
        <div class="createBookTable">
          <el-table
            ref="multipleTable"
            height="150"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @current-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="chaId"
              label="渠道ID"
              width="120">
            </el-table-column>
            <el-table-column
              prop="chaName"
              label="渠道名字"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="chatotalPages * 10"
              @current-change="chapageHandler">
            </el-pagination>
            <div></div>
          </div>
        </div>

      </div>
      <div class="suretyle">
        <el-button class="createBookDivbtn" size="small" type="primary" @click="cancel()">取消</el-button>
        <el-button class="createBookDivbtn" size="small" type="primary" @click="sureplan()">确认并且生产链接</el-button>
      </div>

    </div>
    <div class="Copytext" v-if="knowtextShow">
    <div class="copyDIV">
      <div class="copycenterdiv">
        <div class="copycenter" v-html="copytext"></div>
      </div>
      <el-button class="knowshow" size="small" type="primary" @click="know()">知道了</el-button>
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
        booktotalPages: '',
        chatotalPages: '',
        copytext: '',
        urls: 'http://csapi.haimaqingfan.com',
        msg: 'Welcome to haimaqingfan',
        childshow: false,
        knowtextShow: false,
        radio: '1',
        inputbookname: '',
        inputchannelplan: '',
        booksTableData: [],
        selectvalue: '',
        inputchannelidname: '',
        tableData: [],
        multipleSelection: [],
        currentRow: null,
        bookId: '',
        channelIds: '',
        channelARR: []
      }
    },
    methods: {
//      控制书籍页码器
      bookpageHandler (val) {
        var that = this
        console.log(val)
//      获取推广计划列表的请求
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getBookList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: val - 1,
            pageSize: 10
          }
        }).then(function (res) {
          that.booktotalPages = res.data.data.totalPages
          that.booksTableData = res.data.data.content
        })
        console.log('点击的页数' + val)
      },
//      控制渠道页码器
      chapageHandler (val) {
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
          that.chatotalPages = res.data.data.totalPages
          that.tableData = res.data.data.content
        })
        console.log('点击的页数' + val)
      },
      cancel () {
        this.childshow = false
      },
//      点击知道了控制函数（隐藏详情）
      know () {
        this.knowtextShow = false
      },
//      点击查询书籍列表控制函数
      queryBookName () {
        var that = this
//      书籍列表
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getBookList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            search: this.inputbookname
          }
        }).then(function (res) {
          that.booksTableData = res.data.data.content
          console.log(res.data.data.content)
        })
      },
      childrenshowhandler () {
        this.childshow = true
      },
//      handleEdit (index, row) {
//        console.log(index, row)
//        this.bookId = row.bookId
//        console.log('handleedit函数' + this.selectvalue)
//        if (this.selectvalue) {
//        } else {
//          alert('请选择文案')
//        }
//      },
      handleDelete () {
        console.log('handleDelete')
      },
      handlelookEdit (index, row) {
        console.log(index, row)
        var that = this
        this.bookId = row.bookId
        if (this.selectvalue) {
          Axios({
            method: 'get',
            url: '/dtbt/channelPromotion/getCopyById',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
            params: {
              copyId: this.selectvalue
            }
          }).then(function (res) {
            that.copytext = res.data.data.copyContent
            that.knowtextShow = true
            console.log(res)
          })
        } else {
          alert('请选择文案')
        }
        console.log(index, row)
      },
//      表格单选时候执行的函数
      handleCurrentChange (val) {
        this.bookId = val.bookId
        console.log(val)
        console.log(val.bookId)
        console.log(this.selectvalue)
      },
//      选择渠道数据的时候点击多选框触发的函数
      handleSelectionChange (val) {
        console.log(val.chaId)
        console.log(this.multipleSelection)
        this.multipleSelection.push(val.chaId)
        function unique1 (arr) {
          var n = []
          for (var i = 0; i < arr.length; i++) {
            if (n.indexOf(arr[i]) === -i) n.push(arr[i])
          }
          return n
        }
        unique1(this.multipleSelection)
        console.log(this.multipleSelection.join())
        this.channelIds = this.multipleSelection.join()
      },
//      查询渠道id或者渠道名字时候执行的函数
      querychannel () {
        var that = this
        Axios({
          method: 'get',
          url: '/dtbt/channelPromotion/getChannelList',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
          params: {
            pageNum: 0,
            pageSize: 10,
            search: that.inputchannelidname
          }
        }).then(function (res) {
          that.tableData = res.data.data.content
          console.log(res.data.data.content)
        })
      },
//      点击确认生产链接时执行的函数
      sureplan () {
        var that = this
//        判断form表单输入是否有内容
        if (!this.inputchannelplan) {
          alert('请填写推广计划名称')
        } else if (!this.selectvalue || !this.bookId) {
          alert('请选择书籍以及书籍文案')
        } else if (!this.channelIds) {
          alert('请选择渠道ID')
        } else if (this.inputchannelplan && this.bookId && this.selectvalue && this.channelIds) {
          console.log('222')
          Axios({
            method: 'post',
            url: '/dtbt/channelPromotion/createPlan',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken},
            params: {
              planName: this.inputchannelplan,
              bookId: this.bookId,
              copyId: this.selectvalue,
              chaIds: this.channelIds
            }
          }).then(function (res) {
            console.log(res)
            that.childshow = false
            that.$emit('createModule')
          })
        }
        console.log('计划名称' + this.inputchannelplan)
        console.log('书籍文案Id' + this.selectvalue)
        console.log('渠道id' + this.channelIds)
        console.log('书籍id' + this.bookId)
      },
      dateFormat (row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    created () {
      var that = this
//      书籍列表
      Axios({
        method: 'get',
        url: '/dtbt/channelPromotion/getBookList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'AccessToken': localStorage.accessToken}
      }).then(function (res) {
        that.booksTableData = res.data.data.content
        that.booktotalPages = res.data.data.totalPages
        console.log(res.data.data.content)
      })
//      渠道列表
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
        that.chatotalPages = res.data.data.totalPages
        console.log(res.data.data.content)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .createchildren{
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    z-index: 80;
  }
  .childrencenter{
    overflow: scroll ;
    border-radius:5px ;
    width: 80%;
    height: 95%;
    background-color: white;
    margin-left: 10%;
    margin-top: 2%;
  }
  .createtitle{
    border-bottom: solid 1px #eee;
    font-size: 20px;
    line-height: 30px;
    padding-left: 2%;
    padding-top: 1%;
  }
  .createchannelDiv{
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-around;
  }
  .createchananelDivInput{
    width: 75%;
    text-align: center;
  }
  .createChannelDivSpan{
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    width: 10%;
  }
  .createBookDiv{
    display: flex;
    justify-content: space-around;
  }
  .createChannelDivInputBtn{
    display: flex;
    width: 75%;
    text-align: center;
  }
  .createBookDivInput{
    width: 80%;
  }
  .createBookDivbtn{
    margin-left: 5%;
  }
  .createBookTable{
    width: 75%;
    margin-left: 21.5%;
    margin-top: 2%;
    padding-bottom: 2%;
  }
  .Copytext{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    z-index: 90;
  }
  .copyDIV{
    border-radius:5px ;
    width: 80%;
    height: 95%;
    background-color: white;
    margin-left: 10%;
    margin-top: 2%;
  }
  .copycenterdiv{
    border-radius:5px ;
    width: 80%;
    height: 95%;
    background-color: white;
    margin-left: 10%;
    margin-top: 2%;
  }
  .copycenter{
    overflow: scroll ;
    width: 100%;
    height: 90%;
    background-color: white;

  }
  .knowshow{
    margin-top: -30px;
    margin-left: 90%;
  }
  .suretyle{
    margin-left: 77%;
  }
  .block{
    margin-top: 15px;
    margin-left: -5px;
  }

</style>
