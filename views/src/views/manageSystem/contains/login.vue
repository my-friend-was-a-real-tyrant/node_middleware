<style lang="less" scoped>
    /*login*/
    .login-wrapper{ position: relative; width: 100%; height: 100%; background-size: 100% auto;}
    .login-box{ position: absolute; top: 25%; left: 50%; width: 400px; margin-left: -200px; padding: 30px 50px; background-color: rgba(255, 255, 255, 0.8); text-align: center;}
    .login-title{ margin-bottom: 20px; font-size: 20px;}
    .login-rows{ height: 50px; padding: 6px 0; box-sizing: border-box;}
    .login-input{ width: 300px; height: 36px; padding: 6px 12px; border: 1px solid #d1d5e0; border-radius: 15px; font-size: 14px; vertical-align: middle;}
    .login-input:focus{ border-color: #15a4fa;}
    .login-button{ width: 300px; height: 36px; padding: 0 20px; border: 1px solid #15a4fa; border-radius: 4px; background-color: #15a4fa; font-size: 14px; color: #fff; cursor: pointer;}
    .login-button:hover{ opacity: 0.8;}
    .login-button-disabled{ border-color: #aaa; background-color: #aaa; cursor: default;}
    .login-button-disabled:hover{ opacity: 1;}
    .login-err{ color: red; font-size: 12px;}
    .login-browser{ position: absolute; bottom: -60px; left: 0; width: 100%; color: #aaa; font-size: 14px; line-height: 20px;}

    /*loading*/
    .loading{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3);}

    .copyright{ position: absolute; bottom: 0; left: 0; width: 100%; text-align: center; color: #aaa; font-size: 12px; line-height: 50px;}
</style>
<template>
    <div class="login-wrapper" :style="{ backgroundImage: background}">
        <form class="login-box">
            <div class="login-title">浙江中大普惠物业后台管理</div>
            <div class="login-rows">
                <el-input type="cellphone" placeholder="手机号" v-model.trim="formData.userName"></el-input>
            </div>
            <div class="login-rows">
                <el-input type="password" placeholder="密码" v-model="formData.password"></el-input>
            </div>
            <div class="login-rows">
                <el-cascader
                    style="width: 100%"
                    :options="chooseParkOptions"
                    v-model="formData.park"
                    expand-trigger="hover"
                ></el-cascader>
            </div>
            <div class="login-rows">
                <button class="login-button" :class="{'login-button-disabled': loginButtonDisabled}" @click.prevent="handleLogin" :disabled="loginButtonDisabled">{{ loginButtonDisabled ? '正在登录...' : '登录' }}</button>
            </div>
            <span class="login-err">{{ errorMessage }}</span>
            <div class="login-browser">
                <p>最低支持IE10浏览器</p>
                <p>推荐使用最新版chrome浏览器</p>
            </div>
        </form>
        <div class="copyright">
            Copyright 2017 浙江中大普惠物业有限公司 版权所有 | 浙ICP备17037447号-1
        </div>
    </div>
</template>
<script lang="babel">
    import md5 from 'js-md5';

    export default {
        data() {
            return {
                background: '',
                chooseParkOptions: [],
                formData: {
                    userName: '',
                    password: '',
                    park: []
                },
                loginButtonDisabled: false,
                errorMessage: ''
            }
        },
        computed: {
            parkName() {
                const _this = this;
                let parkName = '';
                for (let i = 0; i < _this.chooseParkOptions.length; i ++) {
                    if (_this.formData.park[0] === _this.chooseParkOptions[i].value) {
                        parkName += _this.chooseParkOptions[i].label + '/';
                        for (let j = 0; j < _this.chooseParkOptions[i].children.length; j ++) {
                            if (_this.formData.park[1] === _this.chooseParkOptions[i].children[j].value) {
                                parkName += _this.chooseParkOptions[i].children[j].label;
                                break;
                            }
                        }
                        break;
                    }
                }
                return parkName;
            }
        },
        methods: {
            clearSession() {
                this.$http({
                    url: '/api/manageSystem/login/clearSession',
                    method: 'delete'
                }).then((response) => {
                    // console.log(this.$route);
                }).catch((response) => {
                    console.log(response)
                });
            },
            handleLogin() {
                if (this.formData.userName !== '' && this.formData.password !== '') {
                    this.errorMessage = '';
                    this.$http({
                        url: '/api/manageSystem/login/loginPc',
                        method: 'post',
                        data: {
                            userName: this.formData.userName,
                            password: md5(this.formData.password),
                            parkId: this.formData.park[1],
                            parkName: this.parkName
                        }
                    }).then((response) => {
                        if (response.data.code !== '00000') {
                            this.errorMessage = response.data.message;
                        } else {
                            this.$router.push('/manageSystem/');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else {
                    this.errorMessage = '用户名或密码不得为空'
                }
            }
        },
        mounted() {
            // 清除session
            this.clearSession();
            this.$http({
                url: '/api/manageSystem/login/getBackgroundImg'
            }).then((response) => {
                this.background = 'url("' + response.data.backgroundUrl + '")';
            }).catch((response) => {
                console.log(response);
            });
            // 获取园区列表
            this.$http({
                url: '/api/manageSystem/login/getParkList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.chooseParkOptions = response.data.data;
                    this.formData.park = [response.data.data[0].value, response.data.data[0].children[0].value];
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>