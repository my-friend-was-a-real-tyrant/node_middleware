<style lang="less">
.order-serial-number .el-form-item__content {
  width: 402px;
}
.import {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  &-wrapper {
    position: relative;
  }
}
</style>
<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <div>
                <el-form-item class="order-serial-number">
                    <el-input v-model="formData.orderSerialNumber" size="small" icon="my-order" placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="formData.status" size="small" placeholder="订单状态">
                        <el-option label="全部状态" value=""></el-option>
                        <el-option label="待支付" :value="1"></el-option>
                        <el-option label="已支付" :value="2"></el-option>
                        <el-option label="已发货" :value="3"></el-option>
                        <el-option label="已完成" :value="4"></el-option>
                        <el-option label="已成团" :value="6"></el-option>
                        <el-option label="已取消" :value="8"></el-option>
                        <el-option label="已关闭" :value="9"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formData.receiverName" size="small" icon="my-addressbook_fill" placeholder="收件人姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formData.receiverCellphone" size="small" icon="my-mobile" placeholder="收件人手机号"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-input v-model="formData.purchaserName" size="small" icon="my-addressbook_fill" placeholder="下单用户姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formData.purchaserCellphone" size="small" icon="my-mobile" placeholder="下单用户手机号"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-date-picker v-model="formData.earliestPurchaseDatetime" size="small" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="最早下单时间">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker v-model="formData.latestPurchaseDatetime" size="small" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="最晚下单时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formData.name" size="small"  placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" class="import-wrapper" v-permit="3202">
                        <span>导入物流信息</span>
                        <form id="import-form">
                            <input type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="import" id="import" @change="handleUploadExcel">
                        </form>
                    </el-button>
                    <el-button size="small" class="import-wrapper" @click='exportOrder'>
                        <span>导出订单信息</span>
                    </el-button>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="排序规则">
                    <el-radio-group v-model="formData.sortRule" @change="searchFun">
                        <el-radio :label="1">按下单时间升序</el-radio>
                        <el-radio :label="2">按下单时间降序</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" ref="tableData">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="收货人姓名：">
                            <p>
                                <span>{{ props.row.receiverName }}</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="收货人手机号：">
                            <p>
                                <span>{{ props.row.receiverCellphone }}</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="收货人地址：">
                            <p>
                                <span>{{ props.row.receiverAddress }}</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="物流公司：" v-if="props.row.expressCompany">
                            <p>
                                <span>{{ props.row.expressCompany }}</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="物流单号：" v-if="props.row.expressNumber">
                            <p>
                                <span>{{ props.row.expressNumber }}</span>
                            </p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="55" v-if='isselect'>
            </el-table-column>
            <el-table-column prop="serialNumber" label="订单编号" min-width="180"></el-table-column>
            <el-table-column prop="name" label="商品名" min-width="180"></el-table-column>
            <el-table-column prop="amount" label="订单金额(元)" min-width="100"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="130"></el-table-column>
            <el-table-column label="下单时间" min-width="180">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.createDatetime }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <div class="contain-bottom-pagination">
                <el-pagination class="fr" layout="sizes, total, prev, pager, next, jumper" :current-page="pageData.currentPage" :total="pageData.totalSize" :page-sizes="[10, 20, 50, 100]" :page-size="pageData.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <div>
            <el-button type="danger" size="small" @click="export2Excel" v-if='isselect'>确定</el-button>
            <el-button type="primary" size="small" @click="cancelFun" v-if='isselect'>取消</el-button>
        </div>
    </div>
</template>
<script lang="babel">
    import { transition } from 'publicSource/dateTransition'
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage!==undefined)?(parseInt(this.$route.query.currentPage)):1;
            return {
                excelUrl: '',
                isselect:false,
                multipleSelection: [],
                formData: {
                    orderSerialNumber: '',
                    receiverName: '',
                    receiverCellphone: '',
                    purchaserName: '',
                    purchaserCellphone: '',
                    earliestPurchaseDatetime: '',
                    latestPurchaseDatetime: '',
                    sortRule: 1,
                    status: '',
                    name:''
                },
                sendData: {
                    orderSerialNumber: '',
                    receiverName: '',
                    receiverCellphone: '',
                    purchaserName: '',
                    purchaserCellphone: '',
                    earliestPurchaseDatetime: '',
                    latestPurchaseDatetime: '',
                    sortRule: 1,
                    status: '',
                    name:'',

                },
                tableData: [],
                pageData: {
                    currentPage,
                    totalSize: 1,
                    pageSize: 10
                },
              
            }
        },
        methods: {
            export2Excel() {
                require.ensure([], () => {
                const { export_json_to_excel } = require('../../../../../vender/Export2Excel')
                const tHeader = ['订单金额', '收件手机号', '收件人姓氏', '订单编号', '订单状态']; //对应表格输出的title
　　　　　　　　   const filterVal = ['amount', 'receiverCellphone', 'receiverName', 'serialNumber', 'status']; // 对应表格输出的数据
                const list = this.multipleSelection;
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '列表excel')
                this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => v[j]));
            },
            handleSelectionChange(val){ this.multipleSelection = val},
            cancelFun(){
                this.multipleSelection=[]
                this.$refs.tableData.clearSelection()
                this.isselect=false
            },
            exportOrder(){
                this.isselect=true
            },
            watchQueryFun(){
                // 监测路由中的query数据变化
                if(this.$route.query.currentPage) {
                    this.pageData.currentPage = parseInt(this.$route.query.currentPage);
                } else {
                    this.pageData.currentPage = 1;
                }
                this.ajaxFun();
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/mall/order/getOrderList',
                    params: {
                        name:this.sendData.name,
                        orderSerialNumber: this.sendData.orderSerialNumber,
                        receiverName: this.sendData.receiverName,
                        receiverCellphone: this.sendData.receiverCellphone,
                        purchaserName: this.sendData.purchaserName,
                        purchaserCellphone: this.sendData.purchaserCellphone,
                        earliestPurchaseDatetime: transition(this.sendData.earliestPurchaseDatetime),
                        latestPurchaseDatetime: transition(this.sendData.latestPurchaseDatetime),
                        sortRule: this.sendData.sortRule,
                        status: this.sendData.status,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.orderList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/mall/order'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/order',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/mall/order',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.name = this.formData.name;
                this.sendData.orderSerialNumber = this.formData.orderSerialNumber;
                this.sendData.receiverName = this.formData.receiverName;
                this.sendData.receiverCellphone = this.formData.receiverCellphone;
                this.sendData.purchaserName = this.formData.purchaserName;
                this.sendData.purchaserCellphone = this.formData.purchaserCellphone;
                this.sendData.earliestPurchaseDatetime = this.formData.earliestPurchaseDatetime;
                this.sendData.latestPurchaseDatetime = this.formData.latestPurchaseDatetime;
                this.sendData.sortRule = this.formData.sortRule;
                this.sendData.status = this.formData.status;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/order'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/order',
                        query: {
                            currentPage: 1
                        }
                    });
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
                formData.append('uploadType', 11);
                formData.append('fileSuffixType', 11);
                this.$http({
                    // baseURL: 'http://system.zhongdapuhui.com',
                    // baseURL: 'http://116.62.168.88:16130',
                    url: '/v1/file',
                    method: 'post',
                    data: formData
                }).then((response) => {
                    document.getElementById('import-form').reset();
                    if (response.data.code === 10000 && response.data.returnData.subCode === 10000) {
                        this.excelUrl = response.data.returnData.data.filePath;
                        this.handleImportOrder();
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleImportOrder() {
                this.$http({
                    url: '/api/manageSystem/system/mall/order/importOrder',
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
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted() {
            this.watchQueryFun();
        },
        watch: {
            '$route.query.currentPage': function() {
                this.watchQueryFun();
            }
        }
    }
</script>