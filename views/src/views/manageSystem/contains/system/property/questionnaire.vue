<template>
    <div id="questionnaire">
        <div class="topNav">
			<el-form :inline="true" class="demo-form-inline">
	            <el-form-item label="关键字：">
	                <el-input v-model="formData.keywords" placeholder="请输入关键字" size="small"></el-input>
	            </el-form-item>
                <el-form-item label="时间：">
	                <el-date-picker v-model="formData.startDate" size="small" type="date" placeholder="选择起始日期"></el-date-picker>
                    <span>--</span>
                    <el-date-picker v-model="formData.endDate" size="small" type="date" placeholder="选择结束日期"></el-date-picker>
	            </el-form-item>
	            <el-form-item>
	                <el-button type="primary" class="el-icon-search" size="small" @click="Query">查询</el-button>
	            </el-form-item>
	            <el-form-item>
	                <el-button type="success" class="el-icon-plus" size="small" @click="Add">添加</el-button>
	            </el-form-item>
	        </el-form>
		</div>
		<div class="table">
			<el-table stripe border :data="tableData" style="width: 100%">
	            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
	            <el-table-column prop="title" label="标题" min-width="200" align="center"></el-table-column>
                <el-table-column label="封面图片" width="110" align="center">
                    <template scope="props">
                        <img class="image" :src="props.row.image" alt="">
                    </template>
                </el-table-column>
	            <el-table-column prop="groupType" label="针对版本" min-width="80" align="center"></el-table-column>
                <el-table-column label="上线/下线" min-width="100" align="center">
                    <template scope="props">
                        <el-tag :type="props.row.isShow ? 'success' : 'danger'">{{ props.row.isShow ? "上线" : "下线" }}</el-tag>
                    </template>
                </el-table-column>
	            <el-table-column prop="createDatetime" label="创建时间" min-width="150" align="center"></el-table-column>
	            <el-table-column prop="endDatetime" label="结束时间" min-width="150" align="center"></el-table-column>
	            <el-table-column label="操作" width="358" align="center">
	            	<template scope="props">
	            		<el-button type="primary" size="small" @click="Exit(props.row)">编辑</el-button>
                        <el-button type="warning" size="small" @click="Detail(props.row)">详情</el-button>
                        <el-button type="danger" v-if="props.row.isShow" size="small" @click="OutLine(props.row)">下线</el-button>
	            		<el-button type="success" v-else size="small" @click="OnLine(props.row)">上线</el-button>
                        <el-button type="info" size="small" @click="CheckList(props.row)">列表</el-button>
                        <el-button type="warning" size="small" @click="LookCensus(props.row)">统计</el-button>
                        <el-button type="success" size="small" @click="Export(props.row)">导出</el-button>
	            	</template>
	            </el-table-column>
	        </el-table>
	        <div style="padding-top: 20px;">
	        	<el-pagination class="fr" layout="total, prev, pager, next, jumper" :current-page="pageData.currentPage" :total="pageData.totalSize" :page-size="pageData.pageSize" @current-change="handleCurrentChange"></el-pagination>
	        </div>
		</div>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                tableData: [],
				pageData: {
					currentPage: 1,
					totalSize: 0,
					pageSize: 10
                },
                formData: {
                    keywords: "",
                    startDate: "",
                    endDate: ""
                }
            }
        },
        mounted() {
            this.Get();
        },
        methods: {
            Query() {
                this.Get();
            },
            Add() {
                this.$router.push({
                    path: "/manageSystem/property/addquestionnaire",
                    query: {
                        type: 1
                    }
                });
            },
            handleCurrentChange(params) {
                this.pageData.currentPage = params;
                this.Get();
            },
            // 编辑
            Exit(params) {
                this.$router.push({
                    path: "/manageSystem/property/addquestionnaire",
                    query: {
                        id: params.id,
                        type: 2
                    }
                });
            },
            // 查看详情
            Detail(params) {
                this.$router.push({
                    path: "/manageSystem/property/questionnairedetail",
                    query: {
                        id: params.id
                    }
                });
            },
            // 下线
            OutLine(params) {     
                this.$confirm('此操作将会将该问卷下线, 是否继续?', '消息提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/property/questionnaire/downlineQuestionnaire',
                        method: 'patch',
                        data: {
                            id: params.id,
                            isShow: false
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
            },
            // 上线
            OnLine(params) {
                this.$http({
                    url: '/api/manageSystem/system/property/questionnaire/downlineQuestionnaire',
                    method: 'patch',
                    data: {
                        id: params.id,
                        isShow: true
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
            },
            CheckList(params) {
                this.$router.push({
                    path: "/manageSystem/property/questionnairesubmitlist",
                    query: {
                        id: params.id
                    }
                });
            },
            LookCensus(params) {
                this.$router.push({
                    path: "/manageSystem/property/questionnairecensus",
                    query: {
                        id: params.id
                    }
                });
            },
            Export(params) {
                this.$http({
                    url: '/api/manageSystem/system/property/questionnaire/exportUnsatisfactory?id=' + params.id,
                    method: 'get'
                }).then(res => {
                    if (res.data.code === "00000") {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        window.location.href = res.data.path;
                    }
                }).catch(error => {});
            },
            Get() {
                let data = {
                    pageNo: this.pageData.currentPage,
                    pageSize: this.pageData.pageSize
                };
                if (Boolean(this.formData.keywords)) {
                    data["keywords"] = this.formData.keywords;
                } else {
                    data["keywords"] = "";
                }
                if (Boolean(this.formData.startDate)) {
                    data["startDate"] = this.ParseTime(this.formData.startDate, '{y}-{m}-{d}');
                } else {
                    data["startDate"] = "";
                }
                if (Boolean(this.formData.endDate)) {
                    data["endDate"] = this.ParseTime(this.formData.endDate, '{y}-{m}-{d}');
                } else {
                    data["endDate"] = "";
                }
				this.$http({
                    url: '/api/manageSystem/system/property/auestionnaire/getQuestionnaireList',
                    params: data
                }).then(res => {
                    if (res.data.code === '00000') {
                        let result = res.data;
                    	this.pageData.totalSize = result.count;
                        this.tableData = result.questionnaireList;
                    }
                }).catch(error => {});
            },
			ParseTime(time, cFormat) {
				if (arguments.length === 0) return null;
				const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
				let date;
				if (typeof time === 'object') {
					date = time;
				} else {
					if (('' + time).length === 10) time = parseInt(time) * 1000;
					date = new Date(time);
				}
				const formatObj = {
					y: date.getFullYear(),
					m: date.getMonth() + 1,
					d: date.getDate(),
					h: date.getHours(),
					i: date.getMinutes(),
					s: date.getSeconds(),
					a: date.getDay()
				}
				const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
					if (formatObj.a == 0) formatObj.a = 7;
					let value = formatObj[key];
					if (key === 'a') return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1];
					if (result.length > 0 && value < 10) value = '0' + value;
					return value || 0;
				});
				return time_str;
			}
        }
    }
</script>
<style lang="less">
    #questionnaire{
        .image{
            width: 80px;
            height: 80px;
            margin: 10px;
        }
        .el-table .cell{
            padding-left: 5px;
            padding-right: 5px;
        }
        .el-form-item{
            margin-bottom: 12px;
        }
    }
</style>
