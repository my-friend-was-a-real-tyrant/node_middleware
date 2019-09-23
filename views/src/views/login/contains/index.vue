<style lang="less" scoped>
    .index{
        &-wrapper{ padding: .4rem .3rem 0;}
        &-logo{ padding-bottom: .63rem; text-align: center;
            img{ width: 2rem; height: 2.5rem;}
        }
        &-input{ margin-bottom: .4rem;}
        &-error{ padding: .2rem 0; font-size: .2rem; color: red; text-align: center;}
    }
</style>
<template>
    <div class="index-wrapper" v-title="'登录'">
        <div class="index-logo">
            <img src="../img/index_logo.png" />
        </div>
        <div class="index-form">
            <zdInput
                icon="cellphone"
                label="手机号"
                placeholder="请输入手机号"
                v-model.trim="cellphone"
                class="index-input"
            ></zdInput>
            <zdInput
                icon="lock"
                label="验证码"
                placeholder="请输入验证码"
                v-model.trim="smscode"
                class="index-input"
            >
                <zdButton
                    size="normal"
                    :disabled="getSmscodeDisabled"
                    @click="handleGetSmscode"
                >{{ getSmscodeButtonWord }}</zdButton>
            </zdInput>
            <zdButton 
                :disabled="loginDisabled"
                @click="handleLogin"
            >登录</zdButton>
            <p class="index-error">{{ error }}</p>
        </div>
    </div>
</template>
<script lang="babel">
    import zdInput from 'publicComponents/input/input';
    import zdButton from 'publicComponents/button/button';
    import hostnameObj from 'publicSource/hostname';
    const hostname = hostnameObj.hostname;

    export default {
        components: {
            zdInput,
            zdButton
        },
        data() {
            return {
                cellphone: '',
                smscode: '',
                getSmscodeDisabled: false,
                loginDisabled: false,
                countDown: 0,
                cellphoneReg: /^1[0-9]{10}$/,
                error: ''
            }
        },
        computed: {
            getSmscodeButtonWord() {
                if (this.getSmscodeDisabled === false) {
                    return '获取验证码';
                } else {
                    return '已发送(' + this.countDown + ')';
                }
            },
            loginButtonWord() {
                if (this.loginDisabled === false) {
                    return '登录';
                } else {
                    return '正在登录...';
                }
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
            async handleGetSmscode() {
                if (this.cellphoneValidate === true) {
                    this.error = '';
                    this.$http({
                        method: 'post',
                        url: '/api/login/getSmscode',
                        data: {
                            cellphone: this.cellphone
                        }
                    }).then((response) => {}).catch((response) => {});
                    this.getSmscodeDisabled = true;
                    setTimeout(() => {
                        this.getSmscodeDisabled = false;
                    }, 60000);
                    this.countDown = 60;
                    while (this.countDown > 0) {
                        await new Promise((resolve, reject) => {
                            setTimeout(() => {
                                this.countDown -- ;
                                resolve(this.countDown);
                            }, 1000);
                        });
                    }
                } else {
                    this.error = '您的手机号格式有误，请重新输入';
                }
            },
            handleLogin() {
                if (this.cellphoneValidate === true) {
                    // 如果先登录了后台管理系统且cookie没有过期的话登录前台系统就会报错
                    // 所以在登陆之前先清除cookie否则验证失败
                    clearCookie();
                    this.error = '';
                    this.$http({
                        method: 'post',
                        //url: '/api/login/bindCellphone',        // 正式的
                        url: '/api/login/appBindCellphone',     // 测试用
                        data: {
                            cellphone: this.cellphone,
                            smscode: this.smscode
                        }
                    }).then((response) => {
                        this.loginDisabled = false;
                        if (response.data.code === '00000') {
                            this.$emit('beingUser');
                            if (response.data.type === 1) {
                                this.$router.push('/choosePark');
                            } else {
                                window.location.href = hostname + '/system/';
                            }
                        }
                    }).catch((response) => {});
                    this.loginDisabled = true;
                } else {
                    this.error = '您的手机号格式有误，请重新输入';
                }
                function clearCookie() {
                    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                    if (keys) {
                        for(let i = keys.length; i--;) {
                            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                        }
                    }
                }
            }
        }
    }
</script>