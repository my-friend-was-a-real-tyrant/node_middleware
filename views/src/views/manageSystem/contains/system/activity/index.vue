<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <div>
                <el-form-item label="男性人数">
                    <el-input v-model="formData.womanCount" size="small"></el-input>
                </el-form-item>
                <el-form-item label="女性人数">
                    <el-input v-model="formData.womanCount" size="small"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item prop="date" label="报名时间">
                    <el-date-picker v-model="formData.applyStarTime" type="date" placeholder="请选择报名开始日期" size="small">
                    </el-date-picker>
                    -----
                    <el-date-picker v-model="formData.applyEndTime" type="date" placeholder="请选择报名结束日期" size="small">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div>
                <el-form-item prop="date" label="选号时间">
                    <el-date-picker v-model="formData.selectStarTime" type="date" placeholder="请选择选号开始日期" size="small">
                    </el-date-picker>
                    -----
                    <el-date-picker v-model="formData.selectEndTime" type="date" placeholder="请选择选号结束日期" size="small">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div>
                <el-form-item prop="date" label="开始时间">
                    <el-date-picker v-model="formData.activityStarTime" type="date" placeholder="请选择活动开始日期" size="small">
                    </el-date-picker>
                    -----
                    <el-date-picker v-model="formData.activityEndTime" type="date" placeholder="请选择活动结束日期" size="small">
                    </el-date-picker>
                </el-form-item>
            </div>
            <el-form-item >
                <el-button type="primary"  size="small" @click="handlesubmit">确定</el-button>
                <el-button  icon="upload" size="small" @click="EXPORT">导出excel</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="success"  size="small" @click="searchFun(3)">全部信息</el-button>
                <el-button type="info"  size="small" @click="searchFun(1)">男性</el-button>
                <el-button type="danger"  size="small" @click="searchFun(0)">女性</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%"  max-height="400">
             <el-table-column prop="number" label="编号" min-width="120"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="120"></el-table-column>
            <el-table-column prop="SEX" label="性别" min-width="80"></el-table-column>
            <el-table-column prop="time" label="发放时间" min-width="130"></el-table-column>
            <el-table-column prop="mobie" label="手机号" min-width="150"></el-table-column>
            <el-table-column prop="unit" label="单位" min-width="150"></el-table-column>
        </el-table>
        <!-- <div>
            <div class="contain-bottom-pagination">
                <el-pagination class="fr" layout="sizes, total, prev, pager, next, jumper" :current-page="pageData.currentPage" :total="pageData.totalSize" :page-sizes="[10, 20, 50, 100]" :page-size="pageData.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div> -->
    </div>
</template>
<script lang="babel">
    import { transition } from 'publicSource/dateTransition'
    export default {
        data() {
            //const currentPage = (this.$route.query.currentPage!==undefined)?(parseInt(this.$route.query.currentPage)):1;
            return {
                formData: {
                   
                },
                sendData: {
                    keywords: '',
                    startDate: '',
                    endDate: ''
                },
                tableData: [],
                // pageData: {
                //     currentPage:1,
                //     totalSize: 1,
                //     pageSize: 10
                // },
                sex:3
            }
        },
    
        methods: {
            EXPORT(){
                let _this=this
                this.$http({
                    url: '/api/manageSystem/system/property/activity/outExternalActivityApplyList',
                    method: 'get',
                }).then((res) => {
                    if(res.data.code === '00000') {
                        _this.$alert('导出成功', '提示');
                        window.open(res.data.path)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            searchFun(SEX){
                this.sex=SEX;
                this.ajaxFun(this.sex);  
            },
            ajaxFun(SEX) {
                this.$http({
                    url: '/api/manageSystem/system/property/activity/getExternalActivityList',
                    params: {
                        sex:SEX
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.tableData = response.data.data.qxActivityApplyList;
                        this.tableData.forEach(element => {
                            if(element.sex==1){
                                element.SEX='男'
                            }else{
                                element.SEX='女'
                            }
                            element.time=new Date(element.createDatetime).getFullYear()+'-'+(new Date(element.createDatetime).getMonth()+1)+'-'+new Date(element.createDatetime).getDate()+' '+new Date(element.createDatetime).getHours()+':'+new Date(element.createDatetime).getMinutes()+':'+new Date(element.createDatetime).getSeconds()
                        });
                        this.formData=response.data.data.qxActivity
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            // handleSizeChange(val) {
            //     this.pageData.pageSize = val;
            //     if(this.$route.query.currentPage){
            //         this.$router.push({
            //             path: '/manageSystem/property/announcement'
            //         });
            //     } else {
            //         this.$router.push({
            //             path: '/manageSystem/property/announcement',
            //             query: {
            //                 currentPage: 1
            //             }
            //         });
            //     }
            // },
            // handleCurrentChange(currentPage) {
            //     this.$router.push({
            //         path: '/manageSystem/property/announcement',
            //         query: {
            //             currentPage: currentPage
            //         }
            //     });
            // },
           handlesubmit() {
               let data={
                    externalActivityId:1,
                    manCount:this.formData.womanCount,
                    womanCount:this.formData.womanCount,
                    activityStartime:this.formData.activityStarTime,
                    activityEndtime:this.formData.activityEndTime,
                    applyStarTime:this.formData.applyStarTime,
                    applyEndtime:this.formData.applyEndTime,
                    selectStarTime:this.formData.selectStarTime,
                    selectEndTime:this.formData.selectEndTime
               }
                this.$http({
                    url:'/api/manageSystem/system/property/activity/editExternalActivity',
                    method: 'patch',
                    data:data
                }).then(res=>{
                   if (res.data.code === '00000') {
                       this.formData=response.data.data
                   }
                }).catch(res=>{
                    console.log(res)
                })
            },
            
           
        },
        mounted(){
            this.ajaxFun(this.sex);
        },
        // watch: {
        //     '$route.query.currentPage': function(){
        //         this.watchQueryFun();
        //     }
        // }
    }
</script>