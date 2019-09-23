<template>
    <div class="submit-list" id="submitlist">
        <div class="submit-list-topNav">
			<el-form :inline="true" class="demo-form-inline">
	            <el-form-item label="手机号：">
	                <el-input v-model="formData.keywords" placeholder="请输入关键字" size="small"></el-input>
	            </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="formData.status" placeholder="请选择" size="small">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="未领取" value="1"></el-option>
                        <el-option label="已领取" value="2"></el-option>
                    </el-select>
	            </el-form-item>
	            <el-form-item>
	                <el-button type="primary" class="el-icon-search" size="small" @click="Query">查询</el-button>
                    <el-button type="danger" @click="BackToList" size="small">问卷列表</el-button>
	            </el-form-item>
	        </el-form>
		</div>
        <div class="submit-list">
            <el-table stripe border :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" min-width="80" align="center"></el-table-column>
                <el-table-column prop="cellphone" label="手机号" min-width="110" align="center"></el-table-column>
                <el-table-column prop="simpleName" label="小区" min-width="150" align="center"></el-table-column>
                <el-table-column label="状态" min-width="100" align="center">
                    <template scope="props">
                        <el-tag :type="props.row.status === 1 ? 'danger' : 'success'">{{ props.row.status === 1 ? "未领取" : "已领取" }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="message" label="信息" min-width="100" align="center"></el-table-column>
                <el-table-column prop="createDatetime" label="创建时间" min-width="150" align="center"></el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template scope="props">
                        <el-button type="primary" size="small" @click="Exit(props.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="padding-top: 20px;">
            <el-pagination class="fr" layout="total, prev, pager, next, jumper" :current-page="pageData.currentPage" :total="pageData.totalSize" :page-size="pageData.pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formData: {
                    keywords: "",
                    status: "0"
                },
                pageData: {
					currentPage: 1,
					totalSize: 0,
					pageSize: 10
                },
                tableData: []
            }
        },
        mounted() {
            this.Get();
        },
        methods: {
            Query() {
                this.Get();
            },
            Exit(params) {
                if (params.status === 2) {
                    this.$message({
                        type: 'warning',
                        message: '已经使用，无法修改'
                    });
                    return;
                } else {
                    this.$confirm('此操作将会修改该条列表的状态, 是否继续?', '消息提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http({
                            url: '/api/manageSystem/system/property/questionnaire/updateStatus',
                            method: 'patch',
                            data: {
                                id: params.id
                            }
                        }).then(res => {
                            if (res.data.code === '00000') {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                });
                                this.Get();
                            } else {
                                this.$message({
                                    type: 'danger',
                                    message: '操作失败'
                                });
                            }
                        }).catch(error => {
                            this.$message({
                                type: 'danger',
                                message: '操作失败'
                            });
                        });
                    }).catch(() => {});
                }
            },
            handleCurrentChange(params) {
                this.pageData.currentPage = params;
                this.Get();
            },
            BackToList() {
                this.$router.push({
                    path: "/manageSystem/property/questionnaire"
                });
            },
            Get() {
                let data = {
                    pageNo: this.pageData.currentPage,
                    pageSize: this.pageData.pageSize,
                    id: this.$route.query.id,
                    status: +this.formData.status
                };
                if (Boolean(this.formData.keywords)) {
                    data["keywords"] = this.formData.keywords;
                } else {
                    data["keywords"] = "";
                }
				this.$http({
                    url: '/api/manageSystem/system/property/questionnaire/getQuestionnaireUserList',
                    params: data
                }).then(res => {
                    if (res.data.code === '00000') {
                        let result = res.data;
                    	this.pageData.totalSize = result.count;
                        this.tableData = result.userList;
                    }
                }).catch(error => {});
            }
        }
    }
</script>
<style lang="less">
    #submitlist{
        .el-table .cell{
            padding-left: 5px;
            padding-right: 5px;
        }
    }
</style>
