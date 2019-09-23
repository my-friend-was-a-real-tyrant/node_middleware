<style lang="less">
  .waterDetail {
    .el-table td {
      height: 80px;
    }
    .el-table th>.cell { font-size: 16px; line-height: 45px; }
    .el-table th.is-leaf { border-bottom: 0 }
    .waterDetail-dia-con-pay .el-input__inner { height: 30px }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #666666;
      background: #fff;
    }
    .el-radio__inner {
      width: 14px;
      height: 14px;
    }
    .el-radio__inner::after {
      background-color: #666666;
    }
  }
  
</style>

<style lang="less" scoped>
  .contain {  }
  .waterDetail {
    background: #F0F2F5;padding: 0;
    .el-table::after {width: 0}
    .el-table { border-left: 0; }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: red;
      background: red;
    }
    &-leftMoney {
      display: flex; justify-content: space-between; background: #fff; line-height: 108px; margin: 30px 0; padding: 0 30px; 
      span { font-size: 18px; }
      .el-button { width: 100px;   }
    }
    &-head {
      display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 30px 30px 0;
      &-title { font-size: 26px; }
    }
    &-block { font-size: 14px; }
    &-address { font-size: 14px; background: #fff; padding: 10px 30px; }
    &-table {
      position: relative; padding: 0 30px 250px; background: #fff;
      &-page { position: absolute; right: 30px; bottom: 60px; }
    }
    &-table-operate { color: #3290FC; cursor: pointer; }
    &-dia {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, .3); font-size: 14px; z-index: 999;
      &-con {
        padding: 30px 40px; position: fixed; top: 30%; left: -120px; margin-left: 50%; width: 450px; height: 350px;border: 1px solid #797979; background: #fff; border-radius: 10px;
        &-title { text-align: center; font-size: 20px; padding-bottom: 20px; }
        .dialogblock {
          padding: 40px 0 60px 0; width: 180px; margin: 0 auto;
          .el-input, .el-input__inner { width: 70% }
        }
        &-btn { 
          margin: 0 auto; width: 240px; padding-top: 20px;
          .el-button { width: 100px; }
          .el-button:nth-of-type(2) {
            margin-left: 30px;
          }
        }
        &-pay {
          display:flex; margin-left: 40px;
          .el-input { width: 120px; }
          span { color: #495769; padding-left: 10px; display: black; line-height: 35px; }
        }
      }
      &-con1 { height: 250px; }
    }
  }
</style>
<template>
  <div class="waterDetail">
    <div class="waterDetail-leftMoney">
      <div>
        <span>预存金额：</span>
        <span>{{ leftMoney }}</span>
      </div>
      <div>
        <el-button type="primary" @click="leftshow = true">编辑</el-button>
      </div>
    </div>
    <div class="waterDetail-head">
      <div class="waterDetail-head-title">
        明细 
      </div>
      <div class="waterDetail-head-choseTime">
        <div>
          <div class="waterDetail-block">
            <span class="demonstration">选择日期：</span>
            <el-date-picker
                v-model="monthstart"
                type="month"
                placeholder="开始时间"
                @change="startChange">
            </el-date-picker>
            至
            <el-date-picker
                v-model="monthend"
                type="month"
                placeholder="结束时间"
                @change="endChange">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="waterDetail-address">
      {{ $store.state.info.parkName }}
    </div>
    <div class="waterDetail-table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        >
        <el-table-column
          prop="billYear"
          label="年份">
        </el-table-column>
        <el-table-column
          prop="billMonth"
          label="月份">
        </el-table-column>
        <el-table-column
          prop="waterCost"
          label="水费">
        </el-table-column>
        <el-table-column
          prop="electricityCost"
          label="电费">
        </el-table-column>
        <el-table-column
          prop="airCost"
          label="空调费">
        </el-table-column>
        <el-table-column
          prop="costType"
          label="缴纳情况">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <span class="waterDetail-table-operate" @click="diashow = true; id = scope.row.id">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="waterDetail-table-page">
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
    
    <!-- 预存金额编辑弹窗 -->
    <div class="waterDetail-dia" v-show="leftshow">
      <div class="waterDetail-dia-con waterDetail-dia-con1">
        <div class="waterDetail-dia-con-title">
          编辑
        </div>
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <div class="waterDetail-dia-con-pay">
            <el-form-item label="预存余额：" prop="cost">
              <el-input v-model.number="ruleForm1.cost"></el-input>
            </el-form-item>
          <!-- <span>元</span> -->
        </div>
        <div class="waterDetail-dia-con-btn">
          <el-button type="primary" @click="submitFormLeft('ruleForm1')">确定</el-button>
          <el-button type="danger" @click="cancelLeft()">取消</el-button>
        </div>
        </el-form>
      </div>
    </div>

    <!-- 表单编辑弹窗 -->
    <div class="waterDetail-dia" v-show="diashow">
      <div class="waterDetail-dia-con">
        <div class="waterDetail-dia-con-title">
          编辑
        </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <div class="waterDetail-dia-con-pay">
            <el-form-item label="水费：" prop="waterCost">
              <el-input v-model.number="ruleForm2.waterCost"></el-input>
            </el-form-item>
          <span>元</span>
        </div>
        <div class="waterDetail-dia-con-pay">
            <el-form-item label="电费：" prop="electricityCost">
              <el-input v-model.number="ruleForm2.electricityCost"></el-input>
            </el-form-item>
          <span>元</span>
        </div>
        <div class="waterDetail-dia-con-pay">
            <el-form-item label="空调费：" prop="airCost">
              <el-input v-model.number="ruleForm2.airCost"></el-input>
            </el-form-item>
          <span>元</span>
        </div>
        <div class="waterDetail-dia-con-btn">
          <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
          <el-button type="danger" @click="cancel()">取消</el-button>
        </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      var checkcost = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('金额不能为空'));
        }
        if (!Number(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0) {
            callback(new Error('请输入正数'));
          } else {
            callback();
          }
        }
      };
      return {
        // pickerOptions1: {
        //   disabledDate(time) {
        //     return time.getTime() < Date.now() - 8.64e7;
        //   }
        // },  
        id: '',
        leftMoneyId: '',
        leftshow: false,
        leftMoney: '',
        timerange: '',
        monthend: '',
        monthendform: '',
        monthstart: '',
        monthstartform: '',
        radio2: 1,
        diashow: false,
        tableData: [],
        pageData: {
          currentPage: 1  ,
          totalSize: 0,
          pageSize: 10
        },
        ruleForm1: {
          age: ''
        },
        ruleForm2: {
          waterCost: '',
          electricityCost: '',
          airCost: '',
        },
        rules1: {
          cost: [
            { validator: checkcost, trigger: 'blur' }
          ]
        },
        rules2: {
          waterCost: [
            { validator: checkcost, trigger: 'blur' }
          ],
          electricityCost: [
            { validator: checkcost, trigger: 'blur' }
          ],
          airCost: [
            { validator: checkcost, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitFormLeft(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              url: '/api/manageSystem/system/property/payment/waterLeftEdit',
              method: 'post',
              data: {
                roomId: this.$route.query.roomId,
                id: this.leftMoneyId,
                preStorage: this.ruleForm1.cost,
              }
            }).then((res) => {
              if(res.data.code === '00000') { 
                this.leftMoney = res.data.data.returnData.preStorage;
                this.leftshow = false;
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              url: '/api/manageSystem/system/property/payment/waterDetailEdit',
              method: 'post',
              data: {
                id: this.id,
                waterCost: this.ruleForm2.waterCost,
                electricityCost: this.ruleForm2.electricityCost,
                airCost: this.ruleForm2.airCost,
              }
            }).then((res) => {
              if(res.data.code === '00000') {
                this.ajaxFun();
                this.diashow = false;
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelLeft() {
        this.leftshow = false;
      },
      cancel() {
        this.diashow = false;
      },
      startChange() {
        this.monthstartform = this.monthstart.getFullYear() + '-' + (this.monthstart.getMonth() + 1) + '-' + 1;
        if(this.monthend && this.monthstart) {
          if(this.monthend.getTime() <= this.monthstart.getTime()) {
            this.$message('开始时间应早于结束时间')
            this.monthstart = '';
            this.monthstartform = '';
          }
        }
        if(this.monthstartform && this.monthendform) {
          this.ajaxFun(1)
        }
      },
      endChange() {
        this.monthendform = this.monthend.getFullYear() + '-' + (this.monthend.getMonth() + 1) + '-' + 1;
        if(this.monthend && this.monthstart) {
          if(this.monthend.getTime() <= this.monthstart.getTime()) {
            this.$message('结束时间应晚于开始时间')
            this.monthend = '';
            this.monthendform = '';
          }
        }
        if(this.monthstartform && this.monthendform) {
          this.ajaxFun(1)
        }
      },
      handleSizeChange(val) {
        this.pageData.pageSize = val;
      },
      handleCurrentChange(currentPage) {
        this.pageData.currentPage = currentPage;
      },
      ajaxFun(time) {
        this.$http({
          url: '/api/manageSystem/system/property/payment/waterDetail',
          methods: 'get',
          params: {
            roomId: this.$route.query.roomId,
            pageNumber: time ? 1 : this.pageData.currentPage,
            pageSize: time ? 10 : this.pageData.pageSize,
            start: this.monthstartform,
            end: this.monthendform
          }
        }).then((res) => {
          if(res.data.code === '00000') {
            this.tableData = res.data.data.returnData.list;
            this.pageData.totalSize = res.data.data.returnData.total
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.ajaxFun();
      this.$http({
        url: '/api/manageSystem/system/property/payment/waterLeft',
        methods: 'get',
        params: {
          roomId: this.$route.query.roomId
        }
      }).then(res => {
        if(res.data.code === '00000') {
          this.leftMoney = res.data.data.returnData.preStorage;
          this.leftMoneyId = res.data.data.returnData.id;
        }
      }).catch(err => {

      })
    },
    computed: {
      
    },
    watch: {
      'pageData.currentPage': function() {
        this.ajaxFun();
      },
      'pageData.pageSize': function() {
        this.ajaxFun();
      },
    }
  }
</script>


