<style lang="less">
    .el-upload--picture-card{ color: #c0ccda;}
</style>
<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .scoped-form{ padding-right: 80px;
        .el-input, .el-select{ width: 375px;}
    }
    .scoped-form .addgoods-input { 
        display: flex; justify-content: space-between; margin: 15px 0; 
    }
    .scoped-form .addgoods-inputcount { 
        display: flex; margin: 15px 0; justify-content: space-between;
        .addgoods-input-count span{ padding-right: 280px; }
        .addgoods-input-countdes { width: 80px;}
    }
    .repairmentInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
    .contain-title { padding: 0; }
    .addgoods-contain {  border-top: 1px solid #E9E9E9; padding: 0 0 0 30px;  }
    .addgoods-btn button { margin: 0 15px 20px 0; width: 80px; }
</style>
<template>
    <div class="contain-main addgoods">
        <!-- <div class="addgoods-title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- <div class="addgoods-gap"></div> -->
        <div class="addgoods-contain">
            <div class="contain-title">
                <span>添加商品</span>
            </div>
            <el-form ref="formData" :model="formData" :rules="formRules" label-width="95px" class="scoped-form" label-position="left">
                <div class="addgoods-input">
                    <el-form-item label="商品名称:" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入商品价格"></el-input>
                    </el-form-item>
                    <el-form-item label="原价(元):" label-width="75px" prop="price">
                        <el-input placeholder="请输入原价" v-model="formData.price"></el-input>
                    </el-form-item>
                </div>
                <div class="addgoods-input">
                    <el-form-item label="单买价格(元):" prop="specialPrice">
                        <el-input placeholder="请输入单买价格" v-model="formData.specialPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="净含量:" label-width="75px" prop="content">
                        <el-input placeholder="请输入净含量" v-model="formData.content"></el-input>
                    </el-form-item>
                </div>
                <div class="addgoods-inputcount">
                    <el-form-item label="商品详情:" prop="description">
                        <el-input placeholder="请输入商品详情" v-model="formData.description"></el-input>
                    </el-form-item>
                    <el-form-item label="单买最多购买份数:" label-width="140px" class="addgoods-input-count" prop="maxQuantity">
                        <el-input v-model="formData.maxQuantity" class="addgoods-input-countdes" prop="maxQuantity"></el-input>
                        <span>份</span>
                    </el-form-item>
                </div>
                <div class="addgoods-input">
                    <el-form-item label="商品分类:" prop="sortId">
                        <el-select v-model="formData.sortId" placeholder="请选择商品分类">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="addgoods-input" v-if="formData.sortId !== 0">
                    <el-form-item label="商品规格:">
                        <el-button type="primary" size="small" @click="addSpecs">添加规格 </el-button>
                        <el-form-item v-for="(item, index) in specs" :key="index">
                            <div class="el-input el-input--small" style="width: 240px" v-for="(value, key, index) of item" :key="index" v-if="key !== 'id'">
                                <span>{{ key === "price" ? "价格：" : key + "：" }}</span>
                                <el-input type="text" v-model="item[key]" placeholder="请输入属性值" style="width: 160px"></el-input>
                            </div>
                            <el-button @click.prevent="removeDomain(index, item)" size="small" type="danger">删除</el-button>
                        </el-form-item>
                    </el-form-item>
                </div>
                <el-form-item label="商品图片:">
                    <el-upload
                        action="/v1/file"
                        list-type="picture-card"
                        name="file"
                        ref="uploadImg"
                        accept="image/*"
                        :data="{
                            'uploadType': 11,
                            'fileSuffixType': 1
                        }"
                        :on-success="handleFileUpload"
                        :on-preview="handlePictureCardPreview"
                        :on-change="handleImgChange"
                        :on-remove="handleImgChange"
                        :before-upload="handleCheckImgLength"
                        class="editgoodsPic">
                        <i class="el-icon-plus"></i> 
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情:">
                    <el-upload
                        action="/v1/file"
                        list-type="picture-card"
                        name="file"
                        ref="uploadDetailImg"
                        accept="image/*"
                        :data="{
                            'uploadType': 11,
                            'fileSuffixType': 1
                        }"
                        :on-success="handleFileUpload"
                        :on-preview="handlePictureCardPreview"
                        :on-change="handleDetailImgChange"
                        :on-remove="handleDetailImgChange"
                        :before-upload="handleClearBeforeDetailImg">
                        <span>更改图片</span>
                    </el-upload>
                </el-form-item>
                <div class="addgoods-btn">
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                    <el-button type="danger"  @click="handleCancel">返回</el-button>
                </div>
            </el-form>
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const imgListValidate = (rule, value, callback) => {
                if (this.formData.imgList.length === 0) {
                    callback(new Error('请添加商品图片'));
                } else {
                    callback();
                }
            };
            var validatePrice = (rule, value, callback) => {
                let oldVal = value
                let now = oldVal.toString().replace(/[^\d\.]/g,'');
                if (now.indexOf('.') != -1) {
                    if (now.split('.')[1].length > 1) {
                        now = now.split('.')[0] + '.' + now.split('.')[1].substr(0,2);
                    }
                }  
                now = now > 99999.99 ?  99999.99 : now;
                if (oldVal != now) {
                    callback(new Error('限制100000.00元以内'));
                } else {
                    callback();
                }
            };
            var validateQuantity = (rule, value, callback) => {
                  if (value.toString().indexOf('.') === -1) {
                    if (value < 1000 && value > 0) {
                        callback();
                    } else {
                        return callback(new Error('限制1000份'))
                    }
                } else {
                    return callback(new Error('请输入整数'))
                }
            };
            return {
                options: [],
                formData: {
                    name: '',
                    price: '',
                    content: '',
                    description: '',
                    imgList: [],
                    detailImg: '',
                    maxQuantity: '',
                    specialPrise: '',
                    sortId:''
                },
                specs: [],
                formRules: {
                    name: [
                       { min: 1, max: 50, message: '限制50字以内', trigger: 'blur' }
                    ],
                    price: [
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    specialPrice: [
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    content: [
                        { trigger: 'blur' }
                    ],
                    maxQuantity: [
                        { validator: validateQuantity, trigger: 'blur' }
                    ],
                    description: [
                        { min: 1, max: 500, message: '限制500字以内', trigger: 'blur' }
                    ],
                    imgList: [
                        { type: 'array', required: true, message: '请添加商品图片', trigger: 'blur'},
                        { validator: imgListValidate, trigger: 'blur'}
                    ],
                    detailImg: [
                        { required: true, message: '请添加商品详情图片', trigger: 'blur'}
                    ]
                },
                dialogVisible: false,
                dialogImageUrl: ''
            }
        },
        watch: {
            "formData.sortId"(newv, oldv) {
                if (newv !== oldv) {
                    this.$http({
                        url:'/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseProperyBySortId',
                        method: 'get',
                        params:{
                            sortId: newv
                        }
                    }).then(res=>{
                        if(res.data.code=='00000'){
                            this.specs = [];
                            let obj = {};
                            let data = res.data.data;
                            data.forEach((item, index) => {
                                obj[item] ="";
                            });
                            obj["price"] = "";
                            this.specs.push(obj);
                        }
                    }).catch((err)=>{});
                }
            }
        },
        mounted(){
            this.$http({
                url:'/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseSortLists',
                params:{
                    keywords:''
                }
            }).then(res=>{
                if(res.data.code=='00000'){
                    res.data.sortList.forEach(element => {
                        const temp={
                            value:element.id,
                            label:element.name,
                        }
                        this.options.push(temp)
                    });
                }
            }).catch((err)=>{});
        },
        methods: {
            removeDomain(index, params) {
                this.specs.splice(index, 1);
            },
            addSpecs() {
                if (this.specs.length > 0) {
                    let str = JSON.stringify(this.specs[0]);
                    let json = JSON.parse(str);
                    delete json.id;
                    Object.keys(json).forEach((key, index) => {
                        json[key] = "";
                    });
                    this.specs.push(json);
                }
            },
            limitNumber() {
                let oldVal = this.formData.maxQuantity;
                if (this.formData.maxQuantity.replace(/[^\d]/g,'')) {
                    this.formData.maxQuantity = this.formData.maxQuantity.replace(/[^\d]/g,'')
                }
                if (oldVal != this.formData.maxQuantity) {
                    this.$message('请输入整数');
                }
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
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDetailImgChange(file, fileList) {
                this.formData.detailImg = '';
                for (let i = 0; i < fileList.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        this.formData.detailImg = fileList[i].response.returnData.data.filePath;
                        break;
                    }
                }
            },
            handleImgChange(file, fileList) {
                const imgList = [];
                for (let i = 0; i < fileList.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        imgList.push(fileList[i].response.returnData.data.filePath);
                    }
                }
                this.formData.imgList = imgList;
            },
            handleClearBeforeDetailImg(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['uploadDetailImg'].uploadFiles.length > 1) {
                    this.$refs['uploadDetailImg'].handleRemove(this.$refs['uploadDetailImg'].uploadFiles[0]);
                }
            },
            handleCheckImgLength(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['uploadImg'].uploadFiles.length > 6) {
                    this.$alert('限上传六张图片', '提示');
                    return false;
                }
            },
            handleSubmit() {
                const _this = this;
                let price = null;
                let arr = [];
                this.specs.forEach(item => {
                    let obj = {
                        spece: "",
                        price: item.price
                    };
                    if (item.id) {
                        delete item.id;
                    }
                    obj.spece = JSON.parse(JSON.stringify(item));
                    delete obj.spece.price;
                    arr.push(obj);
                });
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/mall/merchandise/merchandise/addMerchandise',
                            method: 'post',
                            data: {
                                name: _this.formData.name,
                                price: _this.formData.price,
                                content: _this.formData.content,
                                description: _this.formData.description,
                                imgList: _this.formData.imgList,
                                detailImg: _this.formData.detailImg,
                                specialPrice: _this.formData.specialPrice,
                                maxQuantity: _this.formData.maxQuantity,
                                sortId:_this.formData.sortId,
                                specsList: JSON.stringify(arr)
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('添加成功');
                                _this.$router.push('/manageSystem/mall/merchandise/merchandise');
                            }
                        }).catch((response) => {});
                    } else {
                        return false;
                    }
                });
            },
            handleCancel() {
                this.$router.push('/manageSystem/mall/merchandise/merchandise');
            }
        }
    }
</script>