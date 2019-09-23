<style lang="less" scoped>
    .changePhoneCall{
        background: #f5f5f5; font-size:.3rem; height: 100%;
        &-top{height: .3rem; background: #f5f5f5}
        &-phone{
            display: flex; justify-content: space-between; height: .96rem; background: #ffffff; align-items: center; padding:0 .3rem; border-top: 1px solid #cccccc; border-bottom: 1px solid #cccccc;
            div{ display: flex; justify-content: space-between; align-items: center;
                 p{width: 1.5rem}
                 input{width: 3.3rem}
            }
            &-get{font-size:.26rem; width: 1.7rem; height: .76rem; flex-shrink: 0;}
        }
        &-code{
            display: flex; height: .96rem; background: #ffffff; align-items: center; padding:0 .3rem; border-bottom: 1px solid #cccccc;
            p{width: 1.5rem}
        }
        &-button{margin: .3rem}
    }
</style>
<template>
    <div class="changePhoneCall">
        <div class="changePhoneCall-top"></div>
        <div class="changePhoneCall-phone">
            <div>
                <p>手机号码 : </p>
                <input type="text" placeholder="请输入您要绑定的手机号码" v-model="cellphone">
            </div>
            <zdButton class="changePhoneCall-phone-get" @click="phoneGetCode" :disabled="phoneCodeBool">{{phoneCode}}</zdButton>
        </div>
        <div class="changePhoneCall-code">
            <p>验证码 :</p>
            <input type="text" placeholder="请输入验证码" v-model="smscode">
        </div>
        <zdButton class="changePhoneCall-button" @click="submitPhoneCall" :disabled="phoneCallButton">{{phoneCallSubmit}}</zdButton>   
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import hostnameObj from 'publicSource/hostname';
    const hostname = hostnameObj.hostname;
    
    export default {
        components: {
            zdButton
        },
        data() {
            return {
                phoneCallButton: false,
                phoneCallSubmit: '提交信息',
                phoneCodeBool: false,
                phoneCode: '获取验证码',
                smscode: '',
                cellphone:'',
                timeRun: 0,
                cellphoneReg: /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/,
            }
        },
        computed: {
            info() {
                return this.$store.state.info;
            },
            cellphoneValidate() {
                if (this.cellphoneReg.test(this.cellphone) === true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            submitPhoneCall(){
                if (this.cellphone !== '' && this.smscode !== '') {
                    if (this.cellphoneValidate) {
                        this.$http({
                            url: '/api/system/personalCenter/changeCellphone',
                            method: 'patch',
                            data: {
                                parkId: this.info.defaultParkId,
                                cellphone: this.cellphone,
                                smsCode: this.smscode
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                this.$message('修改成功！');
                                window.location.href = hostname + '/system/';
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    }
                } else {
                    alert('请填写完整表单');
                }
            },
            phoneGetCode(){
                if (this.cellphoneValidate === true) {
                    if (this.phoneCodeBool === false) {
                        this.$http({
                            method: 'post',
                            url: '/api/login/getSmscode',
                            data:{
                                cellphone: this.cellphone,
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                // this.$router.push('/person/editMyMessage')
                                // this.$router.go(-1)
                            } else {
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                        //设置验证码按钮是否可以点击
                        this.phoneCodeBool = true;
                        setTimeout(() => {
                            this.phoneCodeBool = false;
                        }, 60000);
                        this.phoneCode = "重新获取:" + (60 - this.timeRun) + "s";
                        this.timeRun ++;
                        let time = setInterval(() => {
                            this.phoneCode = "重新获取:"+(60 - this.timeRun) + "s";
                            this.timeRun ++;
                            if (this.timeRun == 61) {
                                this.phoneCode = '获取验证码';
                                this.timeRun = 0;
                                clearInterval(time);
                            }
                        },1000)
                    }
                } else {
                    this.error = '您的手机号格式有误，请重新输入';
                    alert('您的手机号格式有误，请重新输入')
                }
            }
        }
    }
</script>