<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .repairment{ width: 100%; height: 100%; padding-top: .3rem; background-color: #f5f5f5;
        &-personal{
            &-tips{ height: .5rem; padding: 0 .3rem; background-color: #fff; font-size: .22rem; color: #ff4c4c; line-height: .5rem;}
        }
        &-area{ display: flex; justify-content: space-between; align-items: center; height: .96rem; margin-bottom: .3rem; padding: 0 .3rem; border-top: @border; border-bottom: @border; background-color: #fff; font-size: .28rem; color: #333;
            span{ flex-shrink: 0;}
            input{ flex-grow: 1; border: 0 none; outline: 0 none; font-size: .28rem; color: #333; text-align: right;}
            select{ flex-grow: 1; border: 0 none; outline: 0 none; background-color: #fff; font-size: .28rem; color: #333; text-align: right; direction: rtl;}
        }
        &-content{ margin-bottom: .3rem; padding: .3rem; border-top: @border; border-bottom: @border; background-color: #fff; font-size: 0;
            textarea{ width: 100%; min-height: 1.5rem; border: 0 none; outline: 0 none; font-size: .28rem; color: #333;}
        }
        &-info{ border-top: @border; background-color: #fff;
            li{ display: flex; align-items: center; height: .96rem; padding: 0 .3rem; border-bottom: @border;
                span{ flex-shrink: 0; width: 1.45rem; font-size: .28rem; color: #333;}
                input{ flex-grow: 1; border: 0 none; outline: 0 none; font-size: .28rem; color: #333;}
            }
        }
        &-button{ display: block; margin: .3rem auto 0;}
    }
</style>
<template>
    <div class="repairment" v-title="'园区报事'">
        <div class="repairment-area">
            <span>报事类型</span>
            <select v-model="formData.type">
                <option value="1">服务报事</option>
                <option value="2">安保报事</option>
                <option value="3">绿化报事</option>
                <option value="4">设备报事</option>
            </select>
        </div>
        <div class="repairment-area">
            <span>标题</span>
            <input type="text" placeholder="请填写您的标题" v-model.trim="formData.title" />
        </div>
        <div class="repairment-content">
            <textarea placeholder="请输入您的内容"
                v-model.trim="formData.content"
            ></textarea>
            <zdUpload
                ref="commonRepairUpload"
                v-model="formData.imgList"
                uploadId="img-02"
                uploadType="2"
                uploadFileType="1"
                annotation="最多6张"
                :maxLength="6"
            ></zdUpload>
        </div>
        <ul class="repairment-info">
            <li>
                <span>姓名</span>
                <input type="text" placeholder="请输入您的姓名" v-model.trim="formData.name" />
            </li>
            <li>
                <span>手机号</span>
                <input type="text" placeholder="请输入您的手机号" v-model.trim="formData.cellphone" />
            </li>
        </ul>
        <zdButton class="repairment-button" @click="handleSubmitCommonRepairment" :disabled="commonRepairButton">提交信息</zdButton>
    </div>
</template>
<script lang="babel">
    import zdUpload from 'publicComponents/upload/upload';
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdUpload,
            zdButton
        },
        data() {
            return {
                formData: {
                    roomId: '',
                    type: 1,
                    title: '',
                    content: '',
                    imgList: [],
                    name: '',
                    cellphone: ''
                },
                commonRepairButton: false
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            info() {
                return this.$store.state.info;
            },
            formValidate() {
                if (this.formData.type === '' || this.formData.title === '' || this.formData.content === '' || this.formData.name === '' || this.formData.cellphone === '') {
                    return '请将表单填写完整';
                } else {
                    const cellphoneReg = /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/;
                    if (cellphoneReg.test(this.formData.cellphone) === false) {
                        return '请填写正确的手机号';
                    }
                }
                return true;
            }
        },
        methods: {
            handleSubmitCommonRepairment() {
                if (this.formValidate === true) {
                    this.$http({
                        url: '/api/system/service/report/submitReport',
                        method: 'post',
                        data: {
                            parkId: this.info.defaultParkId,
                            roomId: this.formData.roomId,
                            type: this.formData.type,
                            title: this.formData.title,
                            content: this.formData.content,
                            imgList: this.formData.imgList,
                            name: this.formData.name,
                            cellphone: this.formData.cellphone
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('提交成功');
                            this.$router.replace('/person/myReport');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else {
                    alert(this.formValidate);
                }
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                alert("本功能只对业主开放，请到“个人中心”完善信息");
                this.$router.replace('/index/visitorPerson');
            } else {
                // 手机号
                this.formData.roomId = this.info.defaultAddressId;
                this.formData.name = this.info.userName;
                this.formData.cellphone = this.info.cellphone;

                this.$watch('$refs.commonRepairUpload.onProgressCount', (newVal, oldVal) => {
                    if (newVal === 0) {
                        this.commonRepairButton = false;
                    } else {
                        this.commonRepairButton = true;
                    }
                });
            }
        }
    }
</script>