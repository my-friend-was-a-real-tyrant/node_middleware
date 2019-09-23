<style lang="less">
    /*wrapper*/
    .wrapper {
        height: 100%;
        width: 100%;
    }
    .wrapper-in {
        height: 100%;
        padding-top: 70px;
    }
    .sidebar {
        float: left;
        width: 240px;
        height: 100%;
        border-radius: 0;
        overflow-x: scroll;
    }
    /*.contain{ width: auto; height: 100%; overflow-x: hidden;}*/
    .contain {
        width: auto;
        padding: 12px;
        height: 100%;
        overflow-x: hidden;
    }
    .contain-title {
        margin-bottom: 30px;
        padding: 0 20px;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        color: #333;
        line-height: 60px;
    }
    .contain-bottom-pagination {
        padding: 20px 0;
        overflow: hidden;
    }
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        padding: 0 30px;
        background-color: #324157;
        color: #bfcbd9;
        line-height: 70px;
        &-logo {
            height: 75%;
            vertical-align: middle;
            cursor: pointer;
            div& {
                width: 210px;
            }
        }
        &-park {
            &-change {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    .header-admin {
        font-size: 14px;
        .el-dropdown {
            color: #bfcbd9;
            &-link {
                cursor: pointer;
            }
        }
    }
    .header-logout,
    .header-logout {
        text-decoration: none;
    }
    .scoped-pointer {
        cursor: pointer;
    }
</style>
<template>
    <div class="wrapper">
        <div class="header clearFix">
            <div class="header-logo fl">
                <img src="../img/logo.png" class="header-logo" />
            </div>
            <div class="header-park fl">
                <span>当前园区：{{ $store.state.info.parkName }}</span>
                <span class="header-park-change" @click="getParkList(true)">切换</span>
            </div>
            <div class="header-admin fr">
                <span style="padding-right: 10px;">欢迎</span>
                <el-dropdown trigger="click" @command="handlePersonalInfoChange">
                    <span class="el-dropdown-link" style="padding-right: 20px;">
                        <span>{{ $store.state.info.userName }}</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="changeCellphone">修改手机号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span class="scoped-pointer" @click="logOut">注销</span>
            </div>
        </div>
        <div class="wrapper-in">
            <navMenuComponent :active="activeIndex" :navMenu="navMenu"></navMenuComponent>
            <router-view class="contain"></router-view>
        </div>
        <el-dialog title="修改密码" :visible.sync="passwordChangeDialogVisible" size="tiny" @close="handleResetPasswordChange">
            <el-form :model="passwordChangeFormData" :rules="passwordChangeFormRules" ref="passwordChangeForm">
                <el-form-item prop="oldPassword">
                    <el-input type="password" v-model="passwordChangeFormData.oldPassword" placeholder="旧密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input type="password" v-model="passwordChangeFormData.newPassword" placeholder="新密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClosePasswordChange">取 消</el-button>
                <el-button type="primary" @click="handleSubmitPasswordChange">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改手机号" :visible.sync="cellphoneChangeDialogVisible" size="tiny" @close="handleResetCellphoneChange">
            <el-form :model="cellphoneChangeFormData" :rules="cellphoneChangeFormRules" ref="cellphoneChangeForm">
                <el-form-item prop="oldCellphone">
                    <el-input type="cellphone" v-model="cellphoneChangeFormData.oldCellphone" placeholder="请输入老手机号"></el-input>
                </el-form-item>
                <el-form-item prop="cellphone">
                    <el-input type="cellphone" v-model="cellphoneChangeFormData.cellphone" placeholder="请输入新手机号"></el-input>
                    <el-button type="primary" size="small" :disabled="getSmscodeDisabled" @click="getSmsCode">{{ getSmscodeButtonWord }}</el-button>
                </el-form-item>
                <el-form-item prop="smsCode">
                    <el-input v-model="cellphoneChangeFormData.smsCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseCellphoneChange">取 消</el-button>
                <el-button type="primary" @click="handleSubmitCellphoneChange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="babel">
    import md5 from 'js-md5';
    import navMenuComponent from './system/menu.vue';

    export default {
        components: {
            navMenuComponent
        },
        data() {
            const oldPasswordValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    callback();
                }
            };
            const newPasswordValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (value === this.passwordChangeFormData.oldPassword) {
                    callback(new Error('两次输入密码不可相同'));
                } else {
                    callback();
                }
            };

            return {
                activeIndex: '',
                chooseParkOptions: [],
                chooseParkItem: [],
                passwordChangeDialogVisible: false,
                passwordChangeFormData: {
                    oldPassword: '',
                    newPassword: ''
                },
                passwordChangeFormRules: {
                    oldPassword: [
                        { validator: oldPasswordValidate, trigger: 'blur'}
                    ],
                    newPassword: [
                        { validator: newPasswordValidate, trigger: 'blur'}
                    ]
                },
                cellphoneChangeDialogVisible: false,
                cellphoneChangeFormData: {
                    oldCellphone: '',
                    cellphone: '',
                    smsCode: ''
                },
                cellphoneChangeFormRules: {
                    oldCellphone: [
                        { required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    cellphone: [
                        { required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    smsCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                getSmscodeDisabled: false,
                countDown: 0,
            }
        },
        computed: {
            navMenu() {
                const navMenu = [
                    {
                        name: '首页',
                        index: '/manageSystem/index',
                        icon: 'el-icon-my-homepage_fill',
                        permissions: 0,
                        permit: true
                    }, {
                        name: '物业管理',
                        index: '/manageSystem/property',
                        icon: 'el-icon-my-decoration_fill',
                        children: [
                            {
                                name: '房屋管理',
                                index: '/manageSystem/property/room',
                                permissions: 400,
                                permit: false
                            }, {
                                name: '缴费管理',
                                index: '/manageSystem/property/payment',
                                permissions: 3800,
                                permit: false
                            },{
                                name: '报修管理',
                                index: '/manageSystem/property/repairment',
                                permissions: 1100,
                                permit: false
                            }, {
                                name: '报事管理',
                                index: '/manageSystem/property/report',
                                permissions: 1300,
                                permit: false
                            }, {
                                name: '表扬投诉',
                                index: '/manageSystem/property/complaint',
                                permissions: 1200,
                                permit: false
                            }, {
                                name: '园区公告管理',
                                index: '/manageSystem/property/announcement',
                                permissions: 1800,
                                permit: false
                            }, {
                                name: '咨询建议管理',
                                index: '/manageSystem/property/suggestion',
                                permissions: 1700,
                                permit: false
                            }, {
                                name: '活动管理',
                                index: '/manageSystem/property/activity',
                                permissions: 1500,
                                permit: false
                            }, {
                                name: '常用电话管理',
                                index: '/manageSystem/property/frequentlyPhone',
                                permissions: 3600,
                                permit: false
                            }, {
								name: '问卷调查',
								index: '/manageSystem/property/questionnaire',
								permissions: 3600,
								permit: false
							}
                        ]
                    }, {
                        name: '商城管理',
                        index: '/manageSystem/mall',
                        icon: 'el-icon-my-shop_fill',
                        children: [
                            {
                                name: '商品管理',
                                index: '/manageSystem/mall/merchandise/merchandise',
                                permissions: 3100,
                                permit: false
                            }, {
                                name: '订单管理',
                                index: '/manageSystem/mall/order',
                                permissions: 3200,
                                permit: false
                            }, {
                                name: '优惠券管理',
                                index: '/manageSystem/mall/coupon',
                                permissions: 3300,
                                permit: false
                            }, {
                                name: '分类管理',
                                index: '/manageSystem/mall/classify',
                                permissions: 3400,
                                permit: false
                            }
                        ]
                    }, {
                        name: '系统管理',
                        index: '/manageSystem/system',
                        icon: 'el-icon-my-computer',
                        children: [
                            {
                                name: '短信列表',
                                index: '/manageSystem/system/sms',
                                permissions: -1,
                                permit: false
                            }, {
                                name: '异常日志',
                                index: '/manageSystem/system/exception',
                                permissions: -1,
                                permit: false
                            }, {
                                name: '接口日志',
                                index: '/manageSystem/system/access',
                                permissions: -1,
                                permit: false
                            }
                        ]
                    }, {
                        name: '基础信息管理',
                        index: '/manageSystem/manager',
                        icon: 'el-icon-my-manage_fill',
                        children: [
                            {
                                name: '园区管理',
                                index: '/manageSystem/system/park',
                                permissions: -1,
                                permit: false
                            },  {
                                name: '次级管理员',
                                index: '/manageSystem/system/submanager',
                                permissions: -2,
                                permit: false
                            },{
                                name: '部门管理',
                                index: '/manageSystem/manager/department',
                                permissions: 200,
                                permit: false
                            }, {
                                name: '员工管理',
                                index: '/manageSystem/manager/manager',
                                permissions: 300,
                                permit: false
                            }, {
                                name: '大楼管理',
                                index: '/manageSystem/manager/building',
                                permissions: 400,
                                permit: false
                            }, {
                                name: '操作记录',
                                index: '/manageSystem/manager/logs',
                                permissions: -1,
                                permit: false
                            }
                        ]
                    }, {
                        name: '用户管理',
                        index: '/manageSystem/user',
                        icon: 'el-icon-my-addressbook_fill',
                        children: [
                            {
                                name: '活跃用户',
                                index: '/manageSystem/user/activityUser',
                                permissions: -1,
                                permit: false
                            }, {
                                name: '用户统计',
                                index: '/manageSystem/user/userStatistics',
                                permissions: -1,
                                permit: false
                            }, {
                                name: '操作记录',
                                index: '/manageSystem/user/operationLogs',
                                permissions: 100,
                                permit: false
                            }, {
                                name: '功能使用统计',
                                index: '/manageSystem/user/functionStatistics',
                                permissions: -1,
                                permit: false
                            }
                        ]
                    }, {
                        name: '意见反馈',
                        index: '/manageSystem/feedback',
                        icon: 'el-icon-my-document_fill',
                        permissions: -1,
                        permit: false
                    },{
                        name: '活动脚本',
                        index: '/manageSystem/activity',
                        icon: 'el-icon-star-on',
                       children:[
                            {
                                name: '活动脚本',
                                index: '/manageSystem/activity/index',
                                permissions: 100,
                                permit: false
                            },
                            {
                                name: '黄金活动',
                                index: '/manageSystem/activity/goldactive',
                                permissions: 100,
                                permit: false
                            }
                       ]
                    }
                ];
                for (let i = 0; i < navMenu.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(navMenu[i], 'children') === false) {
                        // 一级菜单
                        if (navMenu[i].permissions === 0) {
                            // 所有人都可见
                            navMenu[i].permit = true;
                        } else if (navMenu[i].permissions === -9) {
                            // 不开放
                            navMenu[i].permit = false;
                        } else if (navMenu[i].permissions === -1) {
                            // 超级次级管理员可见
                            if (this.$store.state.isSuper === true||this.$store.state.isSecondary=== true) {
                                navMenu[i].permit = true;
                            } else {
                                navMenu[i].permit = false;
                            }
                        } else {
                            if (this.$store.state.isParkManager === true || this.$store.state.isSuper === true||this.$store.state.isSecondary=== true) {
                                // 园区经理
                                navMenu[i].permit = true;
                            } else {
                                // 判断权限
                                for (let j = 0; j < this.$store.state.permissions.length; i ++) {
                                    if (this.$store.state.permissions[j] === navMenu[i].permissions) {
                                        navMenu[i].permit = true;
                                        break;
                                    }
                                    navMenu[i].permit = false;
                                }
                            }
                        }
                    } else {
                        //  二级菜单
                        navMenu[i].permit = false;
                        for (let j = 0; j < navMenu[i].children.length; j ++) {
                            if (navMenu[i].children[j].permissions === 0) {
                                // 所有人都可见
                                navMenu[i].children[j].permit = true;
                            } else if (navMenu[i].children[j].permissions === -9) {
                                // 不开放
                                navMenu[i].children[j].permit = false;
                            } else if (navMenu[i].children[j].permissions === -2) {
                                 // 超级管理员可见
                                if (this.$store.state.isSuper === true) {
                                    navMenu[i].children[j].permit = true;
                                } else {
                                    navMenu[i].children[j].permit = false;
                                }
                            } else if (navMenu[i].children[j].permissions === -1) {
                                // 超级次级管理员可见
                                if (this.$store.state.isSuper === true||this.$store.state.isSecondary=== true) {
                                    navMenu[i].children[j].permit = true;
                                } else {
                                    navMenu[i].children[j].permit = false;
                                }
                            } else {
                                if (this.$store.state.isParkManager === true || this.$store.state.isSuper === true||this.$store.state.isSecondary=== true) {
                                    navMenu[i].children[j].permit = true;
                                } else {
                                    // 判断权限
                                    for (let k = 0; k < this.$store.state.permissions.length; k ++) {
                                        if (this.$store.state.permissions[k] === navMenu[i].children[j].permissions) {
                                            navMenu[i].children[j].permit = true;
                                            break;
                                        }
                                        navMenu[i].children[j].permit = false;
                                    }
                                }
                            }
                            if (navMenu[i].children[j].permit === true) {
                                navMenu[i].permit = true;
                            }
                        }
                    }
                }
                return navMenu;
            },
            getSmscodeButtonWord() {
                if (this.getSmscodeDisabled === false) {
                    return '获取验证码';
                } else {
                    return '已发送(' + this.countDown + ')';
                }
            },
            cellphoneValidate() {
                const cellphoneReg = /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/;
                if (cellphoneReg.test(this.cellphoneChangeFormData.cellphone) === true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            activePathCheck(path) {
                let params = this.$route.fullPath;
                if (params.indexOf("addquestionnaire") > -1) {
                    this.activeIndex = "/manageSystem/property/questionnaire";
                } else if (params.indexOf("questionnairesubmitlist") > -1) {
                    this.activeIndex = "/manageSystem/property/questionnaire";
                } else if (params.indexOf("questionnairecensus") > -1) {
                    this.activeIndex = "/manageSystem/property/questionnaire";
                } else if (params.indexOf("questionnairedetail") > -1) {
                    this.activeIndex = "/manageSystem/property/questionnaire";
                } else if (params.indexOf("createCoupon") > -1) {
                    this.activeIndex = "/manageSystem/mall/coupon";
                } else {
                    this.activeIndex = params;
                }
            },
            getParkList(bool) {
                this.$http({
                    url: '/api/manageSystem/system/getParkList'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.chooseParkOptions = response.data.data;
                        this.chooseParkItem = [response.data.data[0].value, response.data.data[0].children[0].value];
                        this.chooseParkMessageBox(bool);
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            chooseParkMessageBox(bool) {
                const _this = this;
                _this.$msgbox({
                    title: '选择园区',
                    message: (
                        <div>
                            <el-cascader
                                style="width: 100%"
                                options={ _this.chooseParkOptions }
                                value={ _this.chooseParkItem }
                                expand-trigger="hover"
                                onInput={ _this.selectPark }
                            ></el-cascader>
                        </div>
                    ),
                    showClose: bool, // 文档里面竟然没有这个参数。。
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    callback(action) {
                        if (action === 'confirm') {
                            let parkName = '';
                            for (let i = 0; i < _this.chooseParkOptions.length; i ++) {
                                if (_this.chooseParkItem[0] === _this.chooseParkOptions[i].value) {
                                    parkName += _this.chooseParkOptions[i].label + '/';
                                    for (let j = 0; j < _this.chooseParkOptions[i].children.length; j ++) {
                                        if (_this.chooseParkItem[1] === _this.chooseParkOptions[i].children[j].value) {
                                            parkName += _this.chooseParkOptions[i].children[j].label;
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            
                            _this.$http({
                                url: '/api/manageSystem/system/choosePark',
                                method: 'post',
                                data: {
                                    parkId: _this.chooseParkItem[1],
                                    parkName
                                }
                            }).then((response) => {
                                if (response.data.code === '00000') {
                                    // vuex存储权限
                                    _this.$store.commit('choosePark', response.data);
                                    if (_this.$route.path !== '/manageSystem/index') {
                                        _this.$router.push('/manageSystem/index');
                                    } else {
                                        _this.$router.go(0);
                                    }
                                }
                            }).catch((response) => {
                                console.log(response);
                            });
                        }
                    },
                    beforeClose(action, instance, done) {
                        if (action === 'confirm') {
                            if (_this.chooseParkOptions.length === 0) {
                                this.$message.error('园区不可为空');
                            } else {
                                done();
                            }
                        } else {
                            done();
                        }
                    }
                });
            },
            selectPark(item) {
                this.chooseParkItem = item;
            },
            handlePersonalInfoChange(command) {
                if (command === 'changePassword') {
                    // this.changePasswordMessageBox();
                    this.passwordChangeDialogVisible = true;
                } else if (command === 'changeCellphone') {
                    // this.changeCellphoneMessageBox();
                    this.cellphoneChangeDialogVisible = true;
                }
            },
            changePasswordMessageBox() {
                
            },
            handleSubmitPasswordChange() {
                const _this = this;
                _this.$refs['passwordChangeForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/changePassword',
                            method: 'patch',
                            data: {
                                oldPassword: md5(_this.passwordChangeFormData.oldPassword),
                                newPassword: md5(_this.passwordChangeFormData.newPassword)
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                _this.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                setTimeout(() => {
                                    _this.$router.push('/manageSystem/login');
                                    _this.handleClosePasswordChange();
                                }, 1500);
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleClosePasswordChange() {
                this.passwordChangeDialogVisible = false;
            },
            handleResetPasswordChange() {
                this.passwordChangeFormData.oldPassword = '';
                this.passwordChangeFormData.newPassword = '';
            },
            async getSmsCode() {
                if (this.cellphoneValidate) {
                    this.$http({
                        url: '/api/manageSystem/system/getSmsCode',
                        method: 'post',
                        data: {
                            cellphone: this.cellphoneChangeFormData.cellphone,
                        }
                    });
                    // 期间按钮无法点击
                    this.getSmscodeDisabled = true;
                    // 60s后恢复可点击
                    setTimeout(() => {
                        this.getSmscodeDisabled = false;
                    }, 60000);
                    // 倒计时
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
                    this.$alert('请输入正确的手机号');
                }
            },
            handleSubmitCellphoneChange() {
                const _this = this;
                _this.$refs['cellphoneChangeForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/changeCellphone',
                            method: 'patch',
                            data: {
                                oldCellphone: this.cellphoneChangeFormData.oldCellphone,
                                cellphone: _this.cellphoneChangeFormData.cellphone,
                                smsCode: this.cellphoneChangeFormData.smsCode
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                _this.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                _this.$router.push('/manageSystem/login');
                                _this.handleCloseCellphoneChange();
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleCloseCellphoneChange() {
                this.cellphoneChangeDialogVisible = false;
            },
            handleResetCellphoneChange() {
                this.cellphoneChangeFormData.cellphone = '';
            },
            logOut() {
                this.$router.push('/manageSystem/login');
            }
        },
        mounted() {
            this.activePathCheck(this.$route.path);
        },
        watch: {
            '$route.path': function(newPath) {
                this.activePathCheck(newPath);
            }
        }
    }
</script>