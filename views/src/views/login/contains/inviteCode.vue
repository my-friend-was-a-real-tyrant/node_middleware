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
            <!-- <zdInput
                icon="person"
                label="户主姓名"
                labelSize="large"
                placeholder="请输入户主姓名"
                v-model="formData.hostName"
            ></zdInput>
            <zdInput
                icon="cellphone"
                label="户主手机号"
                labelSize="large"
                placeholder="请输入户主手机号"
                v-model="formData.hostCellphone"
            ></zdInput> -->
            <zdInput
                icon="lock"
                label="邀请码"
                labelSize="large"
                placeholder="请输入您的邀请码"
                v-model="formData.inviteCode"
            ></zdInput>
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
        props: ['isUser', 'address', 'hostName', 'parkId', 'roomId'],
        components: {
            zdInput,
            zdButton
        },
        data() {
            return {
                formData: {
                    // hostName: '',
                    // hostCellphone: '',
                    inviteCode: ''
                },
                cellphoneReg: /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/
            }
        },
        computed: {
            formValidate() {
                if (this.formData.inviteCode === '') {
                    return '请将表单填写完整';
                } else {
                    return true;
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
                        url: '/api/login/invite',
                        data: {
                            // housemasterCellphone: this.formData.hostCellphone,
                            // housemasterName: this.formData.hostName,
                            parkId: this.parkId,
                            roomId: this.roomId,
                            authCode: this.formData.inviteCode
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            alert('认证成功，欢迎您的加入');
                            window.location.href = hostname + '/system/';
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