<style lang="less" scoped>
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
    .contain-el-editMessage {
        width: 80%;
    }
    .scoped {
        &-expand {
            line-height: 3;
            text-align: left;
            &:first-child {
                margin-top: -20px;
            }
            &:last-child {
                margin-bottom: -20px;
            }
        }
    }
</style>
<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="关键字">
                <el-input v-model="formData.keywords" size="small"></el-input>
            </el-form-item>
            <el-input class="displayNone"></el-input>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" class="import-wrapper" v-permit="402">
                    <span>导入房屋列表</span>
                    <form id="import-form">
                        <input type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            class="import" id="import" @change="handleUploadExcel">
                    </form>
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" class="import-wrapper" v-permit="402" @click="exportRoom">
                    导出房屋列表
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="downTemplate">下载模板</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-row class="scoped-expand" v-for="member in props.row.memberList" :key="member.cellphone">
                        <el-col :span="4">身份：{{ member.identity === 1 ? '户主' : ((member.identity === 2 ? '家属' : '租户') +
                            (member.isResponsible ? '(代理人)' : '')) }}</el-col>
                        <el-col :span="3">姓名：{{ member.realName }}</el-col>
                        <el-col :span="5">联系方式：{{ member.cellphone }}</el-col>
                        <el-col :span="3">性别：{{ member.sex === 1 ? '男' : (member.sex === 2 ? '女' : '保密') }}</el-col>
                        <el-col :span="5">出生日期：{{ member.birthday }}</el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="management" label="管理处" min-width="100"></el-table-column>
            <el-table-column prop="roomProperty" label="房屋性质" min-width="100"></el-table-column>
            <el-table-column prop="buildingName" label="楼栋" min-width="100"></el-table-column>
            <el-table-column prop="unitName" label="单元" min-width="100"></el-table-column>
            <el-table-column prop="roomCode" label="房号" min-width="100"></el-table-column>
            <!-- <el-table-column prop="buildingName" label="面积" min-width="100"></el-table-column> -->
            <el-table-column prop="proprietorName" label="户主" min-width="100"></el-table-column>
            <el-table-column prop="cellphone" label="联系方式" min-width="100"></el-table-column>
            <el-table-column prop="edit" label="操作" min-width="120">
                <template scope="scope">
                    <el-button type="danger" size="small" @click="editRoom(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <div class="contain-bottom-pagination">
                <el-pagination class="fr" layout="total, prev, pager, next, jumper" :current-page="pageData.currentPage"
                    :total="pageData.totalSize" :page-size="pageData.pageSize"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog size="tiny" top="32%" title="编辑信息 :" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="户主姓名 :" :label-width="formLabelWidth" class="contain-el-editMessage">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式 :" :label-width="formLabelWidth" class="contain-el-editMessage">
                    <el-input v-model="form.call" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="containSureSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) :
                1;
            return {
                excelUrl: '',
                formData: {
                    keywords: ''
                },
                sendData: {
                    keywords: ''
                },
                tableData: [],
                pageData: {
                    currentPage: 1,
                    totalSize: 1,
                    pageSize: 15
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    call: '',
                    roomId: ''
                },
                formLabelWidth: '80px',
                cellphoneReg: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
            };
        },
        methods: {
            exportRoom() {
                let _this = this
                this.$http({
                    url: '/api/manageSystem/system/property/room/outRoomList',
                    method: 'get',
                    params: {
                        keywords: ''
                    }
                }).then((res) => {
                    if (res.data.code === '00000') {
                        _this.$alert('导出成功', '提示');
                        window.open(res.data.path)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            downTemplate() {
                this.$http({
                    url: '/api/manageSystem/system/property/payment/downTemplate',
                    method: 'post',
                    data: {
                        templateId: 3
                    }
                }).then((res) => {
                    if (res.data.code === '00000') {
                        window.open(res.data.data.returnData)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
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
                    url: '/api/manageSystem/system/property/room/getRoomList',
                    params: {
                        keywords: this.sendData.keywords,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.roomList;
                    }
                }).catch((response) => {});
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/property/room'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/room',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/property/room',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/property/room'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/room',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleUploadExcel() {
                const file = document.getElementById('import').files[0];
                const excelReg = /(.(xls|xlsx))+$/i;
                console.log(file.name)
                if (excelReg.test(file.name) === false) {
                    this.$alert('请导入文件类型为excel格式的表格文件。', '提示');
                    return false;
                }
                const formData = new FormData();
                formData.append('file', document.getElementById('import').files[0]);
                formData.append('uploadType', 21);
                this.$http({
                    url: '/v1/file',
                    method: 'post',
                    data: formData,
                }).then((response) => {
                    document.getElementById('import-form').reset();
                    if (response.data.code === 10000 && response.data.returnData.subCode === 10000) {
                        this.excelUrl = response.data.returnData.data.filePath;
                        this.handleImportRoom();
                    }
                }).catch((response) => {});
            },
            handleImportRoom() {
                this.$http({
                    url: '/api/manageSystem/system/property/room/importRoomList',
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
                        this.searchFun();
                    }
                }).catch((response) => {});
            },
            editRoom(row) {
                this.dialogFormVisible = true;
                this.form.name = row.proprietorName;
                this.form.call = row.cellphone;
                this.form.roomId = row.roomId;
            },
            containSureSubmit(done) {
                this.dialogFormVisible = false;
                if (this.cellphoneReg.test(this.form.call)) {
                    this.$http({
                        url: "/api/manageSystem/system/property/room/editHostInfo",
                        method: 'patch',
                        data: {
                            roomId: this.form.roomId,
                            cellphone: this.form.call,
                            name: this.form.name
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.ajaxFun();
                        }
                    });
                } else {
                    this.$confirm('你的手机号码格式错误').catch(_ => {});
                }
            },
        },
        mounted() {
            this.watchQueryFun();
        },
        watch: {
            '$route.query.currentPage': function () {
                this.watchQueryFun();
            }
        }
    }
</script>