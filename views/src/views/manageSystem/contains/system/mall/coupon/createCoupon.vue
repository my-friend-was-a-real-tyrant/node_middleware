<style lang="less" scoped>
    .scoped-contain-back {
        vertical-align: middle;
        .el-upload--picture-card {
            color: #c0ccda;
        }
    }
    .scoped-form {
        .el-input,
        .el-select {
            width: 500px;
        }
    }
    .repairmentInfo {
        &-img {
            max-width: 200px;
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
    .scoped {
        &-remark {
            font-size: 12px;
            color: #999;
        }
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>添加优惠券</span>
        </div>
        <el-form ref="formData" :model="formData" :rules="formRules" label-width="120px" class="scoped-form" label-position="left">
            <el-form-item label="券种类" prop="type">
                <el-select v-model="formData.type">
                    <el-option label="商城券" :value="1"></el-option>
                    <el-option label="生活券" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优惠种类" prop="preferentialType">
                <el-select v-model="formData.preferentialType">
                    <el-option label="满减券" :value="1"></el-option>
                    <el-option label="折扣券" :disabled="formData.type == 2" :value="2"></el-option>
                    <el-option label="兑换券" :disabled="formData.type == 2" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数量" prop="quantity" required>
                <el-input-number v-model.number="formData.quantity" :min="0"></el-input-number>
                <div>
                     <label for="quantity" class="el-form-item__label" style="width: 400px;" v-if="formData.preferentialType === 3">优惠券数量对应相同数量的兑换码</label>
                </div>
            </el-form-item>
            <el-form-item label="特定商品" prop="specificGoods" required>
                <el-cascader :options="options" v-model="formData.specificGoods" @active-item-change="handleItemChange" placeholder='请选择指定商品'></el-cascader>
            </el-form-item>
            <el-form-item label="用券最小金额" prop="amountCondition" required>
                <el-input v-model.number="formData.amountCondition"></el-input>
            </el-form-item>
            <el-form-item label="优惠金额" prop="discountAmount" required>
                <el-input v-model.number="formData.discountAmount"></el-input>
            </el-form-item>
            <el-form-item label="最大优惠金额" prop="maxDiscountAmount" v-if="formData.preferentialType === 2" required>
                <el-input v-model.number="formData.maxDiscountAmount"></el-input>
                <span class="scoped-remark">最大优惠金额为0时则无优惠上限</span>
            </el-form-item>
            <el-form-item label="折扣" prop="discountPercent" v-if="formData.preferentialType === 2" required>
                <el-input v-model.number="formData.discountPercent"></el-input>
            </el-form-item>
            <el-form-item label="发券时间" prop="startDatetime">
                <el-date-picker v-model="formData.startDatetime" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="过期时间" prop="endDatetime">
                <el-date-picker v-model="formData.endDatetime" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="formData.description" type="textarea" :autosize="{ minRows: 3}" :maxlength="500"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleSubmit" v-permit="3301">提交</el-button>
                <el-button size="small" @click="handleCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="babel">
    import { transition } from 'publicSource/dateTransition'
    export default {
        data() {
            const quantityValidate = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入数量'));
                } else if (value <= 0) {
                    callback(new Error('请输入大于0的数量'));
                } else {
                    callback();
                }
            };
            const amountConditionValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用券最小金额'));
                } else if (value < 0) {
                    callback(new Error('请输入大于0的金额'));
                } else {
                    callback();
                }
            };
            const discountAmountValidate = (rule, value, callback) => {
                if (this.formData.preferentialType === 1) {
                    if (!value) {
                        callback(new Error('请输入优惠金额'));
                    } else if (value < 0) {
                        callback(new Error('请输入大于0的金额'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            const discountPercentValidate = (rule, value, callback) => {
                if (this.formData.preferentialType === 2) {
                    if (!value) {
                        callback(new Error('请输入优惠折扣'));
                    } else if (value < 0 || value > 1) {
                        callback(new Error('请输入0-1之间的数字'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            const maxDiscountAmountValidate = (rule, value, callback) => {
                if (this.formData.preferentialType === 2) {
                    if (value === '') {
                        callback(new Error('请输入最大优惠金额'));
                    } else if (value < 0) {
                        callback(new Error('请输入大于0的金额'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                typeList: [],
                formData: {
                    preferentialType: '',
                    type: '',
                    quantity: '',
                    amountCondition: '',
                    discountAmount: '',
                    discountPercent: '',
                    maxDiscountAmount: '',
                    startDatetime: '',
                    endDatetime: '',
                    description: '',
                    specificGoods:[],
                },
                formRules: {
                    preferentialType: [
                        { type: 'number', required: true, message: '请选择优惠种类', trigger: 'blur'}
                    ],
                    type: [
                        { type: 'number', required: true, message: '请选择券种类', trigger: 'blur'}
                    ],
                    quantity: [
                        { validator: quantityValidate, trigger: 'blur'}
                    ],
                    amountCondition: [
                        { validator: amountConditionValidate, trigger: 'blur'}
                    ],
                     specificGoods:[
                        {type:'array'}
                     ],
                    discountAmount: [
                        { validator: discountAmountValidate, trigger: 'blur'}
                    ],
                    discountPercent: [
                        { validator: discountPercentValidate, trigger: 'change'}
                    ],
                    maxDiscountAmount: [
                        { validator: maxDiscountAmountValidate, trigger: 'blur'}
                    ],
                    startDatetime: [
                        { type: 'date', required: true, message: '请选择发券日期时间', trigger: 'blur'}
                    ],
                    endDatetime: [
                        { type: 'date', required: true, message: '请选择过期日期时间', trigger: 'blur'}
                    ],
                    description: [
                        { required: true, message: '请输入描述', trigger: 'blur'}
                    ]
                },
                options:[
                    {
                        value:'0',
                        label:'无特定商品'
                    }
                ]
            }
        },
        methods: {
            handleSubmit() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/mall/coupon/createCoupon',
                            method: 'post',
                            data: {
                                preferentialType: _this.formData.preferentialType,
                                type: _this.formData.type,
                                quantity: _this.formData.quantity,
                                amountCondition: _this.formData.amountCondition,
                                face: _this.formData.preferentialType === 1 ? _this.formData.discountAmount : _this.formData.discountPercent,
                                maxDiscountAmount: _this.formData.maxDiscountAmount? _this.formData.maxDiscountAmount: _this.formData.discountAmount,   
                                startDatetime: transition(_this.formData.startDatetime),
                                endDatetime: transition(_this.formData.endDatetime),
                                description: _this.formData.description,
                                sortId:_this.formData.specificGoods[0],
                                merchandiseId:_this.formData.specificGoods[1]?_this.formData.specificGoods[1]:0
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('添加成功');
                                _this.$router.push('/manageSystem/mall/coupon');
                            }
                        }).catch((response) => {});
                    } else {
                        return false;
                    }
                })
            },
            handleCancel() {
                this.$router.push('/manageSystem/mall/coupon');
            },
            handleItemChange(val){
                this.$http({
                    url:'/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseListBySortId',
                    params: {
                        sortId: val[0]
                    }
                }).then(res=>{
                    if(res.data.code=='00000'){
                        let that = null;
                        this.options.forEach(element => {
                            const arr = [];
                            if(element.value == val){
                                    res.data.data.forEach(elements => {
                                    const temp = {
                                        value:elements.id,
                                        label:elements.name,
                                    }
                                    arr.push(temp);
                                    element['children'] = arr;
                                });
                            }
                        });
                    }
                }).catch((err)=>{})
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
                            children:[]
                        }
                        this.options.push(temp)
                    });
                }
            }).catch((err)=>{})
        }
    }
</script>