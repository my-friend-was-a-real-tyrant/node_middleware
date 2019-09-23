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
                <el-button type="primary" size="small" @click="handleAddParkShow">添加园区</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="200"></el-table-column>
            <el-table-column prop="cityName" label="所在城市" min-width="200"></el-table-column>
            <el-table-column prop="name" label="园区名" min-width="150"></el-table-column>
            <el-table-column prop="address" label="地址" min-width="150"></el-table-column>
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
        <el-dialog title="添加园区" :visible.sync="dialogFormVisible">
            <el-form ref="addParkForm" :rules="addParkFormRules" :model="addParkForm" label-width="100px" label-position="left" >
                <el-form-item label="园区名称" prop="name">
                    <el-input v-model="addParkForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属地区" prop="districtId">
                    <el-cascader
                        :options="cascaderOptions"
                        @active-item-change="handleCascaderItemChange"
                        @change="handleCascaderChange"
                        :style="{width: '100%'}"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="addParkForm.address" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleAddParkShowOff">取 消</el-button>
                <el-button type="primary" @click="handleSubmitAddPark">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) : 1;
            return {
                formData: {
                    keywords: ''
                },
                sendData: {
                    keywords: ''
                },
                tableData: [],
                pageData: {
                    currentPage,
                    totalSize: 1,
                    pageSize: 10
                },
                dialogFormVisible: false,
                addParkForm: {
                    name: '',
                    districtId: '',
                    address: ''
                },
                addParkFormRules: {
                    name: [
                        { required: true, trigger: 'change', message: '请输入园区名称'}
                    ],
                    districtId: [
                        { required: true, type: 'number', trigger: 'change', message: '请选择园区所在地区'}
                    ],
                    address: [
                        { required: true, trigger: 'change', message: '请输入园区详细地址'}
                    ]
                },
                cascaderOptions: [
                    // {
                    //     label: '',
                    //     value: '',
                    //     children: []
                    // }
                ]
            }
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
                    url: '/api/manageSystem/system/system/park/getParkList',
                    params: {
                        keywords: this.sendData.keywords,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.parkList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/system/park'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/system/park',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/system/park',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/system/park'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/system/park',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleAddParkShow() {
                this.$http('/api/common/getProvinceList').then((response) => {
                    for (let i = 0; i < response.data.provinceList.length; i ++) {
                        const temp = {
                            label: response.data.provinceList[i].provinceName,
                            value: response.data.provinceList[i].provinceId,
                            children: []
                        };
                        this.cascaderOptions.push(temp);
                    }
                    this.dialogFormVisible = true;
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleAddParkShowOff() {
                this.dialogFormVisible = false;
            },
            handleCascaderItemChange(val) {
                if (val.length === 1) {
                    // 点击省
                    let index = 0;
                    for (let i = 0; i < this.cascaderOptions.length; i ++) {
                        if (val[0] === this.cascaderOptions[i].value) {
                            index = i;
                            break;
                        }
                    }
                    if (this.cascaderOptions[index].children.length === 0) {
                        this.$http({
                            url: '/api/common/getCityList',
                            params: {
                                provinceId: this.cascaderOptions[index].value
                            }
                        }).then((response) => {
                            for (let i = 0; i < response.data.cityList.length; i ++) {
                                const temp = {
                                    label: response.data.cityList[i].cityName,
                                    value: response.data.cityList[i].cityId,
                                    children: []
                                };
                                this.cascaderOptions[index].children.push(temp);
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    }
                } else {
                    // 点击市
                    let provinceIndex = 0;
                    let cityIndex = 0;
                    for (let i = 0; i < this.cascaderOptions.length; i ++) {
                        if (val[0] === this.cascaderOptions[i].value) {
                            provinceIndex = i;
                            for (let j = 0; j < this.cascaderOptions[i].children.length; j ++) {
                                if (val[1] === this.cascaderOptions[i].children[j].value) {
                                    cityIndex = j;
                                    break
                                }
                            }
                            break;
                        }
                    }
                    if (this.cascaderOptions[provinceIndex].children[cityIndex].children.length === 0) {
                        this.$http({
                            url: '/api/common/getDistrictList',
                            params: {
                                cityId: this.cascaderOptions[provinceIndex].children[cityIndex].value
                            }
                        }).then((response) => {
                            for (let i = 0; i < response.data.districtList.length; i ++) {
                                const temp = {
                                    label: response.data.districtList[i].districtName,
                                    value: response.data.districtList[i].districtId
                                };
                                this.cascaderOptions[provinceIndex].children[cityIndex].children.push(temp);
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    }
                }
            },
            handleCascaderChange(val) {
                this.addParkForm.districtId = val[2];
            },
            handleSubmitAddPark() {
                const _this = this;
                this.$refs['addParkForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/system/park/addPark',
                            method: 'post',
                            data: {
                                name: _this.addParkForm.name,
                                address: _this.addParkForm.address,
                                districtId: _this.addParkForm.districtId
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                _this.handleAddParkShowOff();
                                _this.searchFun();
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                })
            }
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