<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="搜索分类">
                <el-input v-model="formData.keywords" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="createClassify">创建分类</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe border :data="tableData" style="width: 100%">
            <el-table-column type='index' width="50"></el-table-column>
            <el-table-column prop="url" label="icon" min-width="70">
                <template slot-scope="scope">
                    <!-- <el-upload class="upload-demo" action='' :file-list="scope.row.initImg" list-type="picture" disabled></el-upload> -->
                    <!-- <img :src="scope.row.url" alt="" style="width: auto;height: 50px"> -->
                </template>
            </el-table-column>
            <el-table-column prop="name" label="类别" min-width="150"  style="text-align:center"></el-table-column>
            <el-table-column prop="number" label="编号" min-width="150"></el-table-column>
            <el-table-column prop="count" label="数量" min-width="150"></el-table-column>
            <el-table-column label="操作" width="310">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="AddSpecifications(scope.row)">添加规格</el-button>
                    <el-button type="success" size="small" @click="CheckSpecifications(scope.row)">编辑规格</el-button>
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button el-button type="danger" size="small" @click="deleteCoupon(scope.row.id)" v-permit="3303">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <div class="contain-bottom-pagination">
                <el-pagination class="fr" layout="sizes, total, prev, pager, next, jumper" :current-page="pageData.currentPage" :total="pageData.totalSize" :page-sizes="[10, 20, 50, 100]" :page-size="pageData.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="分类操作" :visible.sync="dialogFormVisible" :before-close='createClassifyOff'>
            <el-form ref="classifyForm" :rules="classifyFormRules" :model="classifyForm" label-width="150px" label-position="left">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="classifyForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传分类图标" prop="icon">
                    <el-upload action="/v1/file" list-type="picture-card" name="file" ref="icon" size='small' accept="image/*" :data="{
                            'uploadType': 11,
                            'fileSuffixType': 1
                        }" :file-list="initImg" :on-success="handleFileUpload" :on-preview="handlePictureCardPreview" :on-change="handleImgChange" :on-remove="handleImgChange" :before-upload="handleCheckImgLength" class="editgoodsPic">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="设置序号" prop="index" size='small'>
                    <el-input-number v-model="classifyForm.index"></el-input-number>
                </el-form-item>
            </el-form>
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogFormImageUrl" alt="">
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSubmitClassify">确 定</el-button>
                <el-button @click="createClassifyOff">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加规格" :visible.sync="addSpecifications" width="400" :before-close="AddSpecificationsClose">
            <el-form ref="SpecificationsForm" :model="classifyForm" label-width="90px" label-position="left">
                <el-form-item label="规格名称：" prop="name">
                    <el-input v-model="SpecificationsForm.propertyName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addSpecifications = false">取 消</el-button>
                <el-button type="primary" @click="AddSpecificationsOk">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑规格" :visible.sync="checkSpecifications" width="400" :before-close="CheckSpecificationsClose">
            <template>
                <el-table :data="SpecificationsTableData" border style="width: 100%">
                    <el-table-column prop="propertyName" label="规格名称"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button type="danger" size="small" @click="SpecificationsDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkSpecifications = false">取 消</el-button>
                <el-button type="primary" @click="checkSpecifications = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="babel">
    import message from 'publicSource/components/message/message'
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage!==undefined)?(parseInt(this.$route.query.currentPage)):1;
            return {
                formData: {
                    keywords: '',
                    // preferentialType: '',
                    // type: ''
                },
                sendData: {
                    keywords: '',
                    // preferentialType: '',
                    // type: ''
                },
                initImg:[],
                tableData: [],
                pageData: {
                    currentPage,
                    totalSize: 1,
                    pageSize: 10
                },
                dialogFormVisible: false,
                dialogFormImageUrl: '',
                dialogVisible:false,
                classifyForm: {
                    name: '',
                    icon: '',
                    index: '',
                    sortId:'',
                    oldNumber:'',
                },
                classifyFormRules: {
                    name: [
                        { required: true, trigger: 'change', message: '请输入分类名称'}
                    ],
                    icon: [
                         { required: true, message: '请添加分类图标', trigger: 'blur'}
                    ],
                    index: [
                        { required: true, trigger: 'blur', message: '请设置序号'}
                    ]
                },
                type:'',
                addSpecifications: false,
                checkSpecifications: false,
                SpecificationsForm: {
                    sortId: "",
                    propertyName: "",
                    nameSort: "0",
                    type: "0"
                },
                SpecificationsTableData: []
            }
        },
        watch: {
            '$route.query.currentPage': function() {
                this.watchQueryFun();
            }
        },
        mounted() {
            this.watchQueryFun();
        },
        methods: {
            AddSpecifications(params) {           // 添加规格
                this.SpecificationsForm.sortId = params.id;
                this.addSpecifications = true;
            },
            CheckSpecifications(params) {         // 查看规格
                this.GetSpecifications(params);
            },
            AddSpecificationsClose() {
                this.addSpecifications = false;
            },
            AddSpecificationsOk() {
                if(this.SpecificationsForm.propertyName === "") {
                    return this.$message({
                        type: 'warning',
                        message: '分类名称不能为空'
                    });
                } else {
                    this.$http({
                        method: 'post',
                        url:'/api/manageSystem/system/mall/merchandise/merchandise/createMerchandiseSortProperty',
                        data: this.SpecificationsForm
                    }).then(response => {
                        if (response.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        }
                        this.addSpecifications = false;
                    }).catch(res => {});
                }
            },
            CheckSpecificationsClose() {
                this.checkSpecifications = false;
            },
            GetSpecifications(params) {
                this.$http({
                    method: 'get',
                    url:'/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseSortProperyList' + "?sortId=" + params.id
                }).then(res => {
                    if (res.data.code === '00000') {
                        this.SpecificationsTableData = res.data.data;
                        this.checkSpecifications = true;
                    }
                }).catch(error => {});
            },
            SpecificationsDelete(params) {
                let index = this.SpecificationsTableData.indexOf(params);
                this.$http({
                    method: 'delete',
                    url:'/api/manageSystem/system/mall/merchandise/merchandise/deleteMerchandiseSortProperty' + "?propetyId=" + params.id
                }).then(res => {
                    if (res.data.code === '00000') {
                        this.SpecificationsTableData.splice(index, 1);
                        if (this.SpecificationsTableData.length === 0) {
                            this.checkSpecifications = false;
                        }
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                }).catch(error => {});
            },
            handlePictureCardPreview(file) {
                this.dialogFormImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleCheckImgLength(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['icon'].uploadFiles.length > 1) {
                    this.$alert('限上传一张图片', '提示');
                    return false;
                }
            },
            handleImgChange(file, fileList) {
                const imgList = [];
                for (let i = 0; i < fileList.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        imgList.push(fileList[i].response.returnData.data.filePath);
                    }
                }
                this.classifyForm.icon = imgList.join();
            },
            handleFileUpload(response, file, fileList) {
                if (response.code !== 10000 || response.returnData.subCode !== 10000) {
                    if (response.code === 'E0004') {
                        this.$router.push('/manageSystem/login');
                    } else {
                        this.$alert(response.message, '提示', {
                            confirmButtonText: '确定'
                        });
                        for (let i = 0; i < fileList.length; i ++) {
                            if (fileList[i] === file) {
                                fileList.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            },
            handleSubmitClassify(){
                if(this.type=='edit'){
                    this.$http({
                        method: 'patch',
                        url:'/api/manageSystem/system/mall/merchandise/merchandise/editMerchandiseSort',
                        data: {
                                name: this.classifyForm.name,
                                newNumber: this.classifyForm.index,
                                oldNumber: this.classifyForm.oldNumber,
                                sortId:this.classifyForm.sortId,
                                url:this.classifyForm.icon,
                            }
                    }).then((response)=>{
                        if (response.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            this.createClassifyOff()
                            this.watchQueryFun();
                        }
                    }).catch((res)=>{});
                }else if(this.type=='add'){
                    this.$http({
                        method: 'post',
                        url:'/api/manageSystem/system/mall/merchandise/merchandise/createMerchandiseSort',
                        data: {
                                name: this.classifyForm.name,
                                number: this.classifyForm.index,
                                url: this.classifyForm.icon,
                            }
                    }).then((response)=>{
                        if (response.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.createClassifyOff()
                           this.watchQueryFun();
                        }
                    }).catch((res)=>{
                        console.log(res)
                    })
                }          
            },
            createClassifyOff() {
                this.classifyForm.name='';
                this.classifyForm.index='';
                this.initImg=[];
                this.dialogFormVisible = false;
            },
            createClassify(){
                this.type='add'
                this.dialogFormVisible = true;
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
                    method: 'get',
                    url:'/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseSortList',
                    params: {
                            pageNo: this.pageData.currentPage,
                            pageSize: this.pageData.pageSize,
                            keywords: this.sendData.keywords,
                        }
                    }).then((response)=>{
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.sortList;
                        this.tableData.forEach(element => {
                            element.initImg=[{
                                name: 'content',
                                url: element.hostUrl,
                            }]
                        });
                      }
                    }).catch((res)=>{
                        console.log(res)
                    })
                },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/mall/classify'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/classify',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/mall/classify',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/classify'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/classify',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleEdit(params){
                this.type='edit';
                this.classifyForm.oldNumber=params.number;
                this.classifyForm.name=params.name;
                this.classifyForm.index=params.number;
                this.classifyForm.icon=params.url;
                this.classifyForm.sortId=params.id;
                this.initImg=params.initImg
                this.dialogFormVisible = true;
            },
            deleteCoupon(id) {
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/mall/merchandise/merchandise/deleteMerchandiseSort',
                        params: {
                            sortId:id
                        },
                        method: 'delete'
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.searchFun();
                        }
                    }).catch((response) => {});
                });
            }
        }
    }
</script>