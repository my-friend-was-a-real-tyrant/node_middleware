<style lang="less" scoped>
    .import{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0;
        &-wrapper{ position: relative;}
    }
</style>
<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formData.keywords" size="small" placeholder="关键字搜索"></el-input>
            </el-form-item>
            <el-input class="displayNone"></el-input>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <!-- <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="权限：">
                            <p>
                                <ol class="clearFix" v-for="permission in props.row.permissions" :key="permission.id">
                                    <p class="fl">{{ permission.name }}：</p>
                                    <li class="fl scoped-li" v-for="subPermission in permission.children" :key="subPermission.id">{{ subPermission.name }}</li>
                                </ol>
                            </p>
                        </el-form-item>
                    </el-form> -->
                    <el-table stripe :data="props.row.unitList" style="width: 100%" :show-header="false">
                        <el-table-column prop="unitName" label="楼栋" min-width="100"></el-table-column>
                        <el-table-column prop="managerRealName" label="管家" min-width="120"></el-table-column>
                        <el-table-column prop="managerCellphone" label="联系方式" min-width="150"></el-table-column>
                        <el-table-column label="操作" min-width="120">
                            <template scope="scope">
                                <el-button type="primary" size="small" icon="my-people" @click="handleDistributeBuildingManager(scope.row)" v-permit="402">分配管家</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="buildingName" label="楼栋" min-width="100"></el-table-column>
            <el-table-column prop="buildingManager" label="管家" min-width="120"></el-table-column>
            <el-table-column prop="cellphone" label="联系方式" min-width="150"></el-table-column>
            <el-table-column label="操作" min-width="120">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="my-people" @click="handleDistributeBuildingManager(scope.row)" v-permit="402">分配管家</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <div class="contain-bottom-pagination">
                <el-pagination
                    class="fr"
                    layout="sizes, total, prev, pager, next, jumper"
                    :current-page="pageData.currentPage"
                    :total="pageData.totalSize"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageData.pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="选择员工"
            :visible.sync="distributeBuildingManagerDialogVisible"
            size="tiny"
            @close="handleResetDistributeBuildingManager">
            <el-form 
                :model="distributeBuildingManagerFormData"
                :rules="distributeBuildingManagerFormRules"
                ref="distributeBuildingManagerForm"
            >
                <el-form-item prop="chooseManager">
                    <el-select v-model="distributeBuildingManagerFormData.chooseManager" filterable :style="{'width':'100%'}">
                        <el-option v-for="option in managerList" :key="option.value" :value="option.value" :label="option.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseDistributeBuildingManager">取 消</el-button>
                <el-button type="primary" @click="handleSubmitDistributeBuildingManager">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) : 1;
            return {
                tableData: [],
                formData: {
                    keywords: ''
                },
                sendData: {
                    keywords: ''
                },
                pageData: {
                    currentPage,
                    totalSize: 1,
                    pageSize: 10
                },
                distributeBuildingManagerDialogVisible: false,
                distributeBuildingManagerFormData: {
                    buildingId: '',
                    chooseManager: ''
                },
                distributeBuildingManagerFormRules: {
                    chooseManager: [
                        { type: 'number', required: true, message: '请选择一名管理员', trigger: 'blur'}
                    ]
                },
                managerList: []
            };
        },
        methods: {
            watchQueryFun() {
                // 监测路由中的query数据变化
                if (this.$route.query.currentPage) {
                    this.pageData.currentPage = parseInt(this.$route.query.currentPage);
                } else {
                    this.pageData.currentPage = 1;
                }
                this.ajaxFun();
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/manager/building/getBuildingList',
                    params: {
                        keywords: this.sendData.keywords,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.buildingList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/manager/building'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/manager/building',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/manager/building'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/manager/building',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/manager/building',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            getSimpleManagerList() {
                this.$http({
                    url: '/api/manageSystem/system/manager/manager/getSimpleManagerList'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.managerList = response.data.managerList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleResetDistributeBuildingManager() {
                this.$refs['distributeBuildingManagerForm'].resetFields();
            },
            handleCloseDistributeBuildingManager() {
                this.distributeBuildingManagerDialogVisible = false;
            },
            handleSubmitDistributeBuildingManager() {
                const _this = this;
                _this.$refs['distributeBuildingManagerForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/manager/building/distributeBuildingManager',
                            method: 'patch',
                            data: {
                                buildingId: _this.distributeBuildingManagerFormData.buildingId,
                                managerId: _this.distributeBuildingManagerFormData.chooseManager
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                _this.$message({
                                    message: '分配成功!',
                                    type: 'success'
                                });
                                _this.handleCloseDistributeBuildingManager();
                                _this.watchQueryFun();
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleDistributeBuildingManager({ id }) {
                const _this = this;
                _this.distributeBuildingManagerDialogVisible = true;
                _this.distributeBuildingManagerFormData.buildingId = id;
            }
        },
        mounted(){
            this.watchQueryFun();
            this.getSimpleManagerList();
        },
        watch: {
            '$route.query.currentPage': function(){
                this.watchQueryFun();
            }
        }
    }
</script>