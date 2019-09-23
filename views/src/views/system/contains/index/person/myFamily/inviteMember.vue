<style lang="less" scoped>
    .deliveryAddress{
        &-form{ width: 100%; height: 100%; background-color: #f5f5f5;
            &-item{ position: relative; display: flex; justify-content: space-between; width: 100%; padding: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff; font-size: .3rem; color: #666;
                > span{ flex-shrink: 0;}
                input{ flex-grow: 1; border: 0 none; outline: 0 none; font-size: .28rem; text-align: right;}
                select{ position: absolute; top: .3rem; right: .3rem; width: 50%; font-size: .28rem; text-align: right;}
                textarea{ flex-grow: 1; height: 1.4rem; border: 0 none; outline: 0 none; font-size: .28rem;}
                &-checkbox-group{ display: flex; align-items: center;
                    span{ width: 1.9rem; padding-left: .1rem;}
                }
            }
            &-button{ display: block; margin: .3rem auto 0;}
        }
    }
</style>
<template>
    <form class="deliveryAddress-form" v-title="''">
        <div class="deliveryAddress-form-item">
            <span>姓名</span>
            <input type="text" placeholder="请输入您要邀请的成员姓名" v-model.trim="formData.name" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>手机号码</span>
            <input type="text" placeholder="请输入您要邀请的成员联系方式" v-model.trim="formData.cellphone" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>选择身份</span>
            <select v-model="formData.identity" dir="rtl">
                <option value="">请选择该成员的身份</option>
                <option :value="2">家属</option>
                <option :value="3">租户</option>
            </select>
        </div>
        <zdButton
            class="deliveryAddress-form-button"
            @click="handleInvite">邀请</zdButton>
    </form>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdButton,
        },
        data() {
            return {
                formData: {
                    name: '',
                    cellphone: '',
                    identity: ''
                }
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
                if (this.formData.name === '' || this.formData.cellphone === '' || this.formData.identity === '') {
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
            handleInvite(e) {
                // 在computed中做表单校验
                e.preventDefault();
                if (this.formValidate !== true) {
                    alert(this.formValidate);
                } else {
                    this.$http({
                        url: '/api/system/personalCenter/inviteMember',
                        data: {
                            parkId: this.info.defaultParkId,
                            roomId: this.info.defaultAddressId,
                            name: this.formData.name,
                            cellphone: this.formData.cellphone,
                            identity: this.formData.identity
                        },
                        method: 'post'
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('邀请成功！');
                            this.$router.push('/person/myFamily');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            }
        },
        mounted() {
            // if (this.isVisitor === true || (this.info.identity !== 1 && this.info.isAgent !== true)) {
            //     this.$router.replace('/index');
            // }
        }
    }
</script>
