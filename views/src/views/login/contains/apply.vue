<style lang="less" scoped>
    .apply{
        &-wrapper{ display: flex; flex-direction: column; width: 100%; height: 100%; padding: .3rem;}
        &-position{ flex-shrink: 0; height: .96rem; border: .01rem solid #dcdcdc; border-radius: .09rem; line-height: .94rem; font-size: 0; overflow: hidden;
            &-icon{ display: inline-block; width: .8rem; height: .94rem; background-image: url(../img/apply_position.jpg); background-size: 100% 100%; background-repeat: no-repeat; vertical-align: top;}
            &-word{ display: inline-block; max-width: 5rem; font-size: .3rem; color: #333; vertical-align: top;}
            &-arrow{ float: right; width: .65rem; height: .94rem; background-image: url(../img/apply_position_arrow.jpg); background-size: 100% 100%; background-repeat: no-repeat; vertical-align: top;}
        }
        &-form{ flex-grow: 1; flex-shrink: 0; margin-top: 1rem;
            > div{ margin-bottom: .4rem;}
        }
        &-link{ font-size: .28rem; color: #018afe; text-align: right;}
        &-visitor{ flex-shrink: 0; font-size: .3rem; color: #e9be6d; text-align: center;}
    }
</style>
<template>
    <div class="apply-wrapper" v-title="'申请加入'">
        <div class="apply-position" @click="handleChangeAddress">
            <i class="apply-position-icon"></i>
            <span class="apply-position-word">{{ address }}</span>
            <i class="apply-position-arrow"></i>
        </div>
        <div class="apply-form">
            <zdInput
                icon="identity"
                type="select"
                :selectOption="selectOption"
                label="选择身份"
                labelSize="large"
                placeholder="请选择您的身份"
                v-model="formData.identity"
            ></zdInput>
            <zdInput
                icon="person"
                label="您的姓名"
                labelSize="large"
                placeholder="请输入您的姓名"
                v-model="formData.myName"
            ></zdInput>
            <zdInput
                icon="person"
                label="户主姓名"
                labelSize="large"
                placeholder="请输入户主姓名"
                v-model="formData.hostName"
                v-show="formData.identity.value !== '1'"
            ></zdInput>
            <zdInput
                icon="cellphone"
                label="户主手机号"
                labelSize="large"
                placeholder="请输入户主手机号"
                v-model="formData.hostCellphone"
                v-show="formData.identity.value !== '1'"
            ></zdInput>
            <p class="apply-link">
                <span>我有邀请码 ></span>
            </p>
            <zdButton @click="handleSubmit">确定</zdButton>
        </div>
        <p class="apply-visitor">
            <span>我先看看</span>
        </p>
    </div>
</template>
<script lang="babel">
    import zdInput from 'publicComponents/input/input';
    import zdButton from 'publicComponents/button/button';
    import hostnameObj from 'publicSource/hostname';
    const hostname = hostnameObj.hostname;

    export default {
        props: ['isUser', 'address', 'hostName'],
        components: {
            zdInput,
            zdButton
        },
        data() {
            return {
                selectOption: [
                    {
                        label: '户主',
                        value: '1'
                    },{
                        label: '家属',
                        value: '2'
                    },{
                        label: '租户',
                        value: '3'
                    }
                ],
                formData: {
                    identity: {},
                    myName: '',
                    hostName: '',
                    hostCellphone: ''
                },
                cellphoneReg: /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/
            }
        },
        computed: {
            formValidate() {
                if (this.formData.identity.value === '') {
                    return '请选择您的身份';
                } else if (this.formData.identity.value === '1') {
                    if (this.formData.myName === '') {
                        return '请填写您的姓名';
                    } else {
                        return true;
                    }
                } else {
                    if (this.formData.hostName === '' || this.formData.hostCellphone === '' || this.formData.myName === '') {
                        return '请将表单填写完整';
                    } else if (this.cellphoneReg.test(this.formData.hostCellphone) === false) {
                        return '请填写正确的手机号';
                    } else {
                        return true;
                    }
                }
            }
        },
        methods: {
            handleChangeAddress() {
                this.$router.push('/choosePark');
            },
            handleSubmit() {
                // ....
                // ..发送请求
                if (this.formValidate === true) {
                    this.$http({
                        method: 'post',
                        url: '/api/login/apply',
                        data: {
                            identity: this.formData.identity.value,
                            myName: this.formData.myName,
                            hostName: this.formData.hostName,
                            hostCellphone: this.formData.hostCellphone,
                            roomId: this.$route.query.roomId
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            // 若是户主，将户主姓名赋值给hostName
                            if (this.formData.identity.value === '1') {
                                this.$emit('setHostName', response.data.data.realName);
                                this.$router.push('/welcome');
                            } else {
                                alert('您的申请已提交，请等待审核');
                                window.location.href = hostname + '/system/';
                            }
                            // 根据返回数据判断跳转／弹框
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else {
                    alert(this.formValidate);
                }
                // ....
            }
        },
        created() {
            if (this.isUser === false) {
                this.$router.push('/index');
            } else if (this.address === '') {
                this.$router.push('/choosePark');
            }
        }
    }
</script>