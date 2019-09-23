<style>
  .pay .el-radio__input.is-checked .el-radio__inner {
    border-color: #666666;
    background: #fff;
  }
  .pay .el-radio__inner {
    width: 14px;
    height: 14px;
  }
  .pay .el-table td {
    height: 80px;
  }
  .pay .el-radio__inner::after {
    background-color: #666666;
  }
  
</style>

<style lang="less" scoped>
  .pay { background: #F0F2F5;
    .el-table::after {width: 0}
    .el-table { border-left: 0; }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: red;
      background: red;
    }
    &-head {
      border: 1px solid #E9E9E9; background: #fff;
      &-title { font-size: 32px; padding: 40px 0 20px 40px; margin: 10px; border-bottom:1px solid #C9C9C9 }
      &-time { 
        display: flex; padding: 15px 0 20px 50px; 
        &-rule { padding-right: 20px; }
      }
    }
    &-history {
      padding: 30px; border: 1px solid #E9E9E9; margin-top: 30px; position: relative; padding-bottom: 250px; background: #fff;
      &-head {
        padding: 10px 0 20px 20px; display: flex; justify-content: space-between;position: relative;
        &-title { font-size: 26px; }
        &-search { 
          input { border: 1px solid #D9D9D9; padding-right: 25px; border-radius: 5px; line-height: 28px; width: 230px; padding-left: 10px; }
          input:focus { border: 1px solid rgb(108, 177, 255) }
          i { position: absolute; right: 8px; top: 16px; cursor: pointer; color: #D9D9D9; }
        } 
      }
      &-flex { display: flex; justify-content: space-between; align-items: center; }
      &-tab {
         display: flex; font-size: 0;
         >span {  font-size: 14px; padding: 3px 20px; cursor: pointer; }
         &-propay { border: 1px solid; border-radius: 5px 0 0 5px; border-right: 0; }
         &-waterpay { border: 1px solid; border-radius: 0 5px 5px 0; border-left: 1px solid #3290FC }
      }
      .greycolor { color: #5A5A5A; border-color: #DEDEDE; }
      .greycolorR { color: #5A5A5A; border-color: #DEDEDE; border-left: 1px solid #3290FC }
      .bluecolor { color: #3290FC; border-color: #3290FC }
      .bluecolorright { color: #3290FC; border-color: #3290FC; }
      &-table {  padding-top: 30px;
        &-operate { color: #3290FC; cursor: pointer; }
        &-line { font-size: 12px; color: #DFE9FF; padding: 0 5px; }
      }
      &-page {
        position: absolute; right: 30px; bottom: 60px;  
      }
    }
    &-outputDialog {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, .3); font-size: 14px; z-index: 999;
      &-con {
        padding: 30px 40px; position: fixed; top: 30%; left: -120px; margin-left: 50%; width: 450px; height: 280px;border: 1px solid #797979; background: #fff; border-radius: 10px;
        &-title { text-align: center; font-size: 20px; }
        .dialogblock {
          padding: 40px 0 60px 0; width: 180px; margin: 0 auto;
          .el-input, .el-input__inner { width: 70% }
        }
        &-btn { 
          margin: 0 auto; width: 240px;
          .el-button { width: 100px; }
          .el-button:nth-of-type(2) {
            margin-left: 30px;
          }
        }
      }
    }
    .import{ position: absolute; top: 0; left: 0; width: 100%; height: 100%;opacity: 0;
        &-wrapper{ position: relative; }
    }
  }
</style>
<template>
  <div class="pay">
    <div class="pay-head">
      <div class="pay-head-title">
        缴费管理
      </div>
      <div class="pay-head-time">
        <div class="pay-head-time-rule">
          支付规则：
        </div>
        <div class="pay-head-time-t">
          <el-radio-group v-model="radio2" @change="savePayrule">
            <el-radio :label="1">月份</el-radio>
            <!-- <el-radio :label="2">季度</el-radio> -->
            <!-- <el-radio :label="3">半年</el-radio> -->
            <el-radio :label="4">年份</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

    <div class="pay-history">
      <div class="pay-history-head">
        <div class="pay-history-head-title">
          缴费记录
        </div>
        <div class="pay-history-head-search">
          <input type="text" @keyup.13="search($event)" v-model="keywords">
          <i class="el-icon-search" @click="search"></i>
        </div>
      </div>
      <div class="pay-history-flex">
        <div class="pay-history-tab">
          <span class="pay-history-tab-propay" :class="[page === 1 ? 'bluecolor' : 'greycolor']" @click="propay">物业费</span>
          <span class="pay-history-tab-waterpay" :class="[page === 2 ? 'bluecolorright' : 'greycolorR']" @click="waterpay">水电费</span>
        </div>
        <div class="pay-history-btn">
          <el-button type="primary" @click="ouputDia = true">导出全部</el-button>
          <!-- <el-button type="primary">导入</el-button> -->
          <el-button class="import-wrapper" type="primary" v-permit="402">
              <span>导入</span>
              <form id="import-form">
                  <input type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="import" id="import" @change="handleUploadExcel">
              </form>
          </el-button>
          <el-button @click="downTemplate">模板下载</el-button>
        </div>
      </div>
      <!-- 物业费 -->
      <div class="pay-history-table" v-if="page === 1">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="roomProperty"
            label="房屋性质">
          </el-table-column>
          <el-table-column
            prop="roomSimpleName"
            label="房间号">
          </el-table-column>
          <el-table-column
            prop="houseHolder"
            label="户主">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="联系方式">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <span class="pay-history-table-operate" @click="ouputDia = true; roomId = scope.row.roomId">导出</span><span class="pay-history-table-line">|</span><span class="pay-history-table-operate" @click="goDetail(scope.row.roomId)">明细</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 水电费 -->
    <div class="pay-history-table" v-else>
      <el-table
          :data="tableDataWater"
          stripe
          style="width: 100%">
          <el-table-column
          prop="roomSimpleName"
          label="房间号">
          </el-table-column>
          <el-table-column
          prop="houseHolder"
          label="户主">
          </el-table-column>
          <el-table-column
          prop="mobile"
          label="联系方式">
          </el-table-column>
          <el-table-column
          prop="notPay"
          label="未付金额">
          </el-table-column>
          <el-table-column label="操作">
          <template scope="scope">
              <span class="pay-history-table-operate" @click="ouputDia = true; roomId = scope.row.roomId">导出</span><span class="pay-history-table-line">|</span><span class="pay-history-table-operate" @click="goDetail(scope.row.roomId)">明细</span>
          </template>
          </el-table-column>
      </el-table>
      </div>
      <div class="pay-history-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.totalSize">
        </el-pagination>
      </div>
    </div>
    
    <!-- 导出弹窗 -->
    <div class="pay-outputDialog" v-show="ouputDia">
      <div class="pay-outputDialog-con">
        <div class="pay-outputDialog-con-title">
          请选择年份
        </div>
        <div class="dialogblock">
          <span class="demonstration">年份：</span>
          <el-date-picker
            v-model="year"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <div class="pay-outputDialog-con-btn">
          <el-button type="primary" @click="sureOutpot">确定</el-button>
          <el-button type="danger" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        excelUrl: '',
        radio2: '',
        id: '',
        keywords: '',
        roomId: '',
        page: 1,
        year: '2018',
        tableData: [],
        tableDataWater: [],
        pageData: {
          currentPage: 1,
          totalSize: 0,
          pageSize: 10
        },
        ouputDia: false,
      };
    },
    methods: {
      search(e) {
        this.pageData.currentPage = 1;
        e.target.blur()
        this.ajaxFun()
      },
      propay() {
        if(this.page != 1) {
          this.page = 1;
          this.keywords = '';
          this.getPropertyList()
        }
      },
      waterpay() {
        if(this.page != 2) {
          this.page = 2;
          this.keywords = '';
          this.getWaterList()
        }
      },
      sureOutpot() {
        let path = '';
        if(!this.roomId) {
          path = this.page == 1 ? '/api/manageSystem/system/property/payment/downPropertyAll' : '/api/manageSystem/system/property/payment/downWaterAll';
          this.$http({
            url: path,
            method: 'post',
            data: {
              year: this.year
            }
          }).then((res) => {
            if(res.data.code === '00000') {
              console.log(res.data.data.returnData)
              // window.location.href = res.data.data.returnData
              window.open(res.data.data.returnData) 
              this.ouputDia = false;
              this.roomId = '';
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          path = this.page == 1 ? '/api/manageSystem/system/property/payment/downPropertySin' : '/api/manageSystem/system/property/payment/downWaterSin';
          this.$http({
            url: path,
            method: 'post',
            data: {
              year: this.year,
              roomId: this.roomId
            }
          }).then((res) => {
            if(res.data.code === '00000') {
              // window.location.href = res.data.data.returnData
              window.open(res.data.data.returnData) 
              this.ouputDia = false;
              this.roomId = '';
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      cancel() {
        this.ouputDia = false;
        this.roomId = '';
      },
      handleSizeChange(val) {
        this.pageData.pageSize = val;
      },
      handleCurrentChange(currentPage) {
        this.pageData.currentPage = currentPage;
      },
      ajaxFun() {
        if(this.page === 1) {
          this.getPropertyList()
        } else {
          this.getWaterList()
        }
      },
      goDetail(roomId) {
        if(this.page === 1) {
          this.$router.push({
              path: '/manageSystem/property/payment/propertyDetail',
              query: {
                  roomId
              }
          })
        } else {
            this.$router.push({
              path: '/manageSystem/property/payment/waterDetail',
              query: {
                  roomId
              }
          })
        }
      },
      handleUploadExcel() {
        const file = document.getElementById('import').files[0];
        const excelReg = /(.(xls|xlsx))+$/i;
        if (excelReg.test(file.name) === false) {
            this.$alert('请导入文件类型为excel格式的表格文件。', '提示');
            return false;
        }
        const formData = new FormData();
        formData.append('file', document.getElementById('import').files[0]);
        formData.append('uploadType', 21);
        // formData.append('fileSuffixType', 11);
        this.$http({
            // baseURL: 'http://test.zhongdapuhui.com',
            // baseURL: 'http://192.168.100.49:16130',
            url: '/v1/file',
            method: 'post',
            data: formData,
            // data: {
            //     a: 1
            // },
            // onUploadProgress(e) {
                // _this.imgArr[finalIndex].progressingWidth = (e.loaded / e.total) * 1.8;
            // }
        }).then((response) => {
            document.getElementById('import-form').reset();
            if (response.data.code === 10000 && response.data.returnData.subCode === 10000) {
                this.excelUrl = response.data.returnData.data.filePath;
                this.handleImportRoom();
            }
        }).catch((response) => {
            console.log(response);
        });
      },
      handleImportRoom() {
        let url = ''
        if(this.page === 1) {
          url = '/api/manageSystem/system/property/payment/importPropertyList'
        } else {
          url = '/api/manageSystem/system/property/payment/importWaterList'
        }
        this.$http({
            url: url,
            method: 'post',
            data: {
                filePath: this.excelUrl
            }
        }).then((response) => {
            if (response.data.code === '00000') {
                this.$message({
                    message: '导入成功',
                    type: 'success'
                });
                this.ajaxFun();
            }
        }).catch((response) => {
            console.log(response);
        });
      },
      getWaterList() {
        this.$http({
          url: '/api/manageSystem/system/property/payment/getWaterList',
          methods: 'get',
          params: {
            pageNo: this.pageData.currentPage,
            pageSize: this.pageData.pageSize,
            keywords: this.keywords
          }
        }).then((res) => {
          if(res.data.data.code === 10000) {
            this.tableDataWater = res.data.data.returnData.list;
            this.pageData.totalSize = res.data.data.returnData.total
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getPropertyList() {
        this.$http({
          url: '/api/manageSystem/system/property/payment/getPropertyList',
          methods: 'get',
          params: {
            pageNo: this.pageData.currentPage,
            pageSize: this.pageData.pageSize,
            keywords: this.keywords,
          }
        }).then((res) => {
          if(res.data.data.code === 10000) {
            this.tableData = res.data.data.returnData.list;
            this.pageData.totalSize = res.data.data.returnData.total
          }
        }).catch(err => {
          console.log(err)
        })
      },
      savePayrule() {
        this.$http({
          url: '/api/manageSystem/system/property/payment/payRulesave',
          method: 'post',
          data: {
            payType: this.radio2,
            id: this.id
          }
        }).then((res) => {
          
        }).catch(err => {
          console.log(err)
        })
      },
      downTemplate() {
        this.$http({
          url: '/api/manageSystem/system/property/payment/downTemplate',
          method: 'post',
          data: {
            templateId: this.page
          }
        }).then((res) => {
          if(res.data.code === '00000') {
            console.log(res.data.data.returnData)
            // window.location.href = res.data.data.returnData
            window.open(res.data.data.returnData) 
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.getPropertyList();
      this.$http({
        url: '/api/manageSystem/system/property/payment/payRuleinit',
        methods: 'get'
      }).then((res) => {
        if(res.data.data.code === 10000) {
          this.radio2 = res.data.data.returnData.payType;
          this.id = res.data.data.returnData.id;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    computed: {
      // change() {
      //   if(this.pageData.currentPage || this.pageData.pageSize) {
      //     console.log(this.pageData.totalSize)
      //     return Math.random()
      //   }
      // }
    },
    watch: {
        // 'change': function(){
        //   console.log(this.pageData.totalSize)
        //     this.ajaxFun();
        // }
        'pageData.currentPage': function() {
          this.ajaxFun();
        },
        'pageData.pageSize': function() {
          this.ajaxFun();
        }
    }
  }
</script>