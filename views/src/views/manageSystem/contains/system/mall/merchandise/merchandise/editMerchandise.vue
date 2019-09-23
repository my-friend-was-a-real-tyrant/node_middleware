<style lang="less" scoped>
    .el-upload--picture-card {
        color: #c0ccda;
    }
    .scoped-contain-back {
        vertical-align: middle;
    }
    .scoped-form {
        padding-right: 80px;
        .el-input,
        .el-select {
            width: 375px;
        }
    }
    .scoped-form .addgoods-input {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
    }
    .scoped-form .addgoods-inputcount {
        display: flex;
        margin: 15px 0;
        justify-content: space-between;
        .addgoods-input-count span {
            padding-right: 280px;
        }
        .addgoods-input-countdes {
            width: 80px;
        }
    }
    .repairmentInfo {
        &-img {
            max-width: 200px;
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
    .contain-title {
        padding: 0;
    }
    .addgoods-contain {
        border-top: 1px solid #e9e9e9;
        padding: 0 0 0 30px;
    }
    .addgoods-btn button {
        margin: 0 15px 20px 0;
        width: 80px;
    }
    .el-input--small{
        display: inline-block;
    }
</style>
<template>
    <div class="contain-main addgoods">
        <!-- <div class="addgoods-title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- <div class="addgoods-gap"></div> -->
        <div class="addgoods-contain">
            <div class="contain-title">
                <span>编辑商品</span>
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
                    <el-upload action="/v1/file" list-type="picture-card" name="file" ref="uploadImg" accept="image/*" :file-list="initImg" :data="{
                            'uploadType': 11,
                            'fileSuffixType': 1
                        }" :on-success="handleFileUpload" :on-preview="handlePictureCardPreview" :on-change="handleImgChange" :on-remove="handleImgChange" :before-upload="handleCheckImgLength" class="editgoodsPic">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情:">
                    <el-upload action="/v1/file" list-type="picture-card" name="file" ref="uploadDetailImg" :file-list="initDetailImg" accept="image/*" :data="{
                            'uploadType': 11,
                            'fileSuffixType': 1
                        }" :on-success="handleFileUpload" :on-preview="handlePictureCardPreview" :on-change="handleDetailImgChange" :on-remove="handleDetailImgChange" :before-upload="handleClearBeforeDetailImg">
                        <span>更改图片</span>
                    </el-upload>
                </el-form-item>
                <div class="addgoods-btn">
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                    <el-button type="danger" @click="handleCancel">返回</el-button>
                </div>
            </el-form>
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </div>
</template>
<script lang="babel">
    import message from 'publicSource/components/message/message'
    export default {
        data() {
            const imgListValidate = (rule, value, callback) => {
                if (this.formData.imgList.length === 0) {
                    callback(new Error('请添加商品图片'));
                } else {
                    callback();
                }
            };
            var validateName = (rule, value, callback) => {
                if (value == '') {
                    return callback(new Error('请输入商品名称'))
                } else if (value.toString().length > 50) {
                    return callback(new Error('限制50字以内'))
                } else {
                    callback();
                }
            };
            var validateCon = (rule, value, callback) => {
                if (value == '') {
                    return callback(new Error('请输入净含量'))
                } else {
                    callback();
                }
            };
            var validatePrice = (rule, value, callback) => {
                let oldVal = value
                let now = oldVal.toString().replace(/[^\d\.]/g, '');
                if (now.indexOf('.') != -1) {
                    if (now.split('.')[1].length > 1) {
                        now = now.split('.')[0] + '.' + now.split('.')[1].substr(0, 2);
                    }
                }
                now = now > 99999.99 ? 99999.99 : now;
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
                options: [{
                    value: 0,
                    label: '暂无分类',
                }],
                ruleForm2: {
                    pass: '',
                    count: '',
                    age: ''
                },
                initImg: [],
                initDetailImg: [{
                    name: 'content',
                    url: ''
                }],
                fileList1: [],
                fileList2: [],
                formData: {
                    name: '',
                    price: '',
                    specialPrice: '',
                    content: '',
                    description: '',
                    imgList: [],
                    detailImg: '',
                    maxQuantity: '',
                    sortId: '',
                },
                specs: [], //规格
                formRules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    price: [
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    specialPrice: [
                        { validator: validatePrice, trigger: 'blur' }
                    ],
                    content: [
                        { validator: validateCon, trigger: 'blur' }
                    ],
                    maxQuantity: [
                        { validator: validateQuantity, trigger: 'blur' }
                    ],
                    description: [
                        { min: 1, max: 500, message: '限制500字以内', trigger: 'blur' }
                    ],
                    imgList: [
                        { type: 'array', required: true, message: '请添加商品图片', trigger: 'blur' },
                        { validator: imgListValidate, trigger: 'blur' }
                    ],
                    detailImg: [
                        { required: true, message: '请添加商品详情图片', trigger: 'blur' }
                    ],
                    specs: [
                        { type: 'array' },
                    ],
                },
                dialogVisible: false,
                dialogImageUrl: ''
            }
        },
        methods: {
            removeDomain(index, params) {
                if (params.price === "") {
                    this.specs.splice(index, 1);
                } else {
                    this.specs.splice(index, 1);
                    this.$http({
                        url: '/api/manageSystem/system/mall/merchandise/merchandise/deleteMerchandiseSpecs?specsId=' + params.id,
                        method: 'delete'
                    }).then((res) => {
                        if (res.data.code === "00000") {
                            this.$message('删除成功');
                        }
                    }).catch((response) => {});
                }
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
                this.formData.maxQuantity = parseInt(this.formData.maxQuantity) || 1;
                this.formData.maxQuantity = this.formData.maxQuantity > 100 ? 100 : 100;
                if (oldVal != this.formData.maxQuantity) {
                    this.$message('请输1-100的正整数');
                }
            },
            handleFileUpload(response, file, fileList) {
                if (response.code !== 10000 || response.returnData.subCode !== 10000) {
                    if (response.code === 'E0004') {
                        this.$router.push('/manageSystem/login');
                    } else {
                        this.$alert(response.message, '错误', {
                            confirmButtonText: '确定'
                        });
                        for (let i = 0; i < fileList.length; i++) {
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
                for (let i = 0; i < fileList.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        this.formData.detailImg = fileList[i].response.returnData.data.filePath;
                        break;
                    }
                }
            },
            handleImgChange(file, fileList) {
                const imgList = [];
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].status === 'success') {
                        if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                            imgList.push(fileList[i].response.returnData.data.filePath);
                        } else {
                            imgList.push(fileList[i].urlNoHostname);
                        }
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
                            url: '/api/manageSystem/system/mall/merchandise/merchandise/editMerchandise',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                name: _this.formData.name,
                                price: _this.formData.price,
                                content: _this.formData.content,
                                description: _this.formData.description,
                                imgList: _this.formData.imgList,
                                detailImg: _this.formData.detailImg,
                                specialPrice: _this.formData.specialPrice,
                                maxQuantity: _this.formData.maxQuantity,
                                sortId: _this.formData.sortId,
                                specification: str,
                                specsList: JSON.stringify(arr)
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('编辑成功');
                                // _this.$router.push('/manageSystem/mall/merchandise/merchandise');
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
        },
        mounted() {
            let _this = this
            this.$http({
                url: '/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.initDetailImg[0].url = response.data.merchandiseInfo.detailImg;
                    // this.initDetailImg[0].urlNoHostname = response.data.merchandiseInfo.detailImgNoHostname;
                    for (let i = 0; i < response.data.merchandiseInfo.img.length; i++) {
                        const temp = {
                            name: 'content' + i,
                            url: response.data.merchandiseInfo.img[i],
                            urlNoHostname: response.data.merchandiseInfo.imgNoHostname[i]
                        };
                        this.initImg.push(temp);
                    }
                    if (response.data.merchandiseInfo.specsList.length > 0) {
                        const arr = response.data.merchandiseInfo.specsList;
                        _this.specs = arr;
                    }
                    this.formData = response.data.merchandiseInfo;
                    this.formData.imgList = response.data.merchandiseInfo.imgNoHostname;
                    this.formData.detailImg = response.data.merchandiseInfo.detailImgNoHostname;
                }
            }).catch((response) => {
                console.log(response);
            });
            this.$http({
                url: '/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseSortLists',
                params: {
                    keywords: ''
                }
            }).then(res => {
                if (res.data.code == '00000') {
                    res.data.sortList.forEach(element => {
                        const temp = {
                            value: element.id,
                            label: element.name,
                        }
                        this.options.push(temp)
                    });
                }
            }).catch((err) => {});
        }
    }
</script>