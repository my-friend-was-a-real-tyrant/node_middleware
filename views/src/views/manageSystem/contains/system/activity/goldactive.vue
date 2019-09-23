<template>
	<div id="coupon">
		<div>
			<el-form :inline="true" class="demo-form-inline">
	            <el-form-item label="关键字：">
	                <el-input v-model="formData.keywords" placeholder="请输入关键字" size="small"></el-input>
	            </el-form-item>
	            <el-form-item>
	                <el-button type="primary" class="el-icon-search" size="small" @click="Query">查询</el-button>
	            </el-form-item>
	            <el-form-item>
	                <el-button type="success" class="el-icon-plus" size="small" @click="Add">添加</el-button>
	            </el-form-item>
	        </el-form>
		</div>
		<div>
			<el-table stripe border :data="tableData" style="width: 100%">
	            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
	            <el-table-column prop="code" label="优惠券码" min-width="120" align="center"></el-table-column>
	            <el-table-column prop="userId" label="使用人" min-width="80" align="center"></el-table-column>
	            <el-table-column label="状态" align="center">
	            	<template scope="props">
	            		<span>{{ props.row.status == 1 ? "未领取" : props.row.status == 2 ? "待使用" : "已使用" }}</span>
	            	</template>
	            </el-table-column>
	            <el-table-column prop="create_time" label="创建时间" min-width="150" align="center"></el-table-column>
	            <el-table-column prop="upload_time" label="修改时间" min-width="150" align="center"></el-table-column>
	            <el-table-column prop="" label="编辑" width="100" align="center">
	            	<template scope="props">
	            		<el-button type="warning" class="el-icon-edit" size="small" @click="Exit(props.row)">编辑</el-button>
	            	</template>
	            </el-table-column>
	        </el-table>
	        <div style="padding-top: 20px;">
	        	<el-pagination class="fr" layout="total, prev, pager, next, jumper" :current-page="pageData.currentPage" :total="pageData.totalSize" :page-size="pageData.pageSize" @current-change="handleCurrentChange">
	            </el-pagination>
	        </div>
	        <el-dialog title="修改状态" :visible.sync="dialogVisible" width="20%" :before-close="handleClose">
			  	<div>
			  		<el-form class="demo-form-inline">
			  			<el-form-item label="优惠券码：">
			  				<span>{{ formData.code }}</span>
			  			</el-form-item>
			            <el-form-item label="状态：">
			                <el-select v-model="formData.select" placeholder="请选择">
							    <el-option key="1" label="未领取" value="1"></el-option>
							    <el-option key="2" label="待使用" value="2"></el-option>
							    <el-option key="3" label="已使用" value="3"></el-option>
							</el-select>
			            </el-form-item>
			        </el-form>
			  	</div>
			  	<span slot="footer" class="dialog-footer">
			    	<el-button type="primary" @click="Confirm">确定</el-button>
			  	</span>
			</el-dialog>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				tableData: [],
				pageData: {
					currentPage: 1,
					totalSize: 0,
					pageSize: 10
				},
				formData: {
					keywords: "",
					select: "",
					code: "",
					id: ""
				},
				dialogVisible: false
			}
		},
        mounted(){
            this.Get();
        },
		methods: {
			Get() {
				this.$http({
                    url: '/api/manageSystem/system/property/externalActivity/getActivityGoldList',
                    params: {
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize,
                        keywords: this.formData.keywords
                    }
                }).then(res => {
                    if (res.data.code === '00000') {
                    	let result = res.data.data;
                    	this.pageData.totalSize = result.total;
                        result.list.forEach(element => {
                            element.create_time = this.ParseTime(element.createTime, '{y}-{m}-{d} {h}:{i}:{s}');
                            element.upload_time = this.ParseTime(element.updateTime, '{y}-{m}-{d} {h}:{i}:{s}');
                        });
                        this.tableData = result.list;
                    }
                }).catch(error => {});
			},
			handleCurrentChange(val) {
				this.pageData.currentPage = val;
				this.Get();
			},
			Query() {
				this.Get();
			},
			Add() {
				this.$prompt('请输入新建优惠券的数量', '新建优惠券', {
          			confirmButtonText: '确定',
          			inputPattern: /^[0-9]*$/,
          			inputErrorMessage: '请输入正确的数量'
        		}).then(({ value }) => {
        			this.$http({
	                    url: '/api/manageSystem/system/property/externalActivity/createCoupon',
	                    method: 'post',
	                    data: {
	                    	quantity: value
	                    }
	                }).then(res => {
	                	if (res.status === 200) {
	                		if (res.data.code === '00000') {
	                			this.$message({
			            			type: 'success',
			            			message: '添加成功',
			            			center: true
			          			});
	                			this.Get();
	                		} else {
	                			this.$message({
			            			type: 'error',
			            			message: '添加失败',
			            			center: true
			          			});
	                		}
	                	}
	                }).catch(error => {});
       			}).catch(() => {
          			this.$message({
            			type: 'info',
            			message: '已取消',
            			center: true
          			});      
        		});
			},
			handleClose() {
				this.dialogVisible = false;
			},
			Exit(params) {
				this.formData.select = String(params.status);
				this.formData.id = params.id;
				this.formData.code = params.code;
				this.dialogVisible = true;
			},
			Confirm() {
				let data = {
					activityGoldId: this.formData.id,
					// status: this.formData.select
				}
				this.$http({
                    url: '/api/manageSystem/system/property/externalActivity/updateCouponStatu',
                    method: 'patch',
                    data: data
                }).then(res => {
                	if (res.status === 200) {
                		if (res.data.code === '00000') {
                			this.$message({
		            			type: 'success',
		            			message: '修改成功',
		            			center: true
		          			});
                			this.Get();
                		} else {
                			this.$message({
		            			type: 'error',
		            			message: '修改失败',
		            			center: true
		          			});
                		}
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