<style lang="less" scoped>
    .deliveryAddress{
        &-form{ width: 100%; height: 100%; background-color: #f5f5f5;
            &-item{ position: relative; display: flex; justify-content: space-between; width: 100%; padding: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff; font-size: .3rem; color: #666;
                > span{ flex-shrink: 0;}
                input{ flex-grow: 1; border: 0 none; outline: 0 none; font-size: .28rem; text-align: right;}
                select{ position: absolute; top: .3rem; right: .3rem; width: 50%; text-align: right; opacity: 0;}
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
    <form class="deliveryAddress-form" v-title="'活动报名'">
        <div class="deliveryAddress-form-item">
            <span>姓名</span>
            <input type="text" placeholder="请输入姓名" v-model.trim="formData.name" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>联系方式</span>
            <input type="text" placeholder="请输入联系方式" v-model.trim="formData.cellphone" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>人数</span>
            <input type="number" placeholder="请输入人数" v-model.trim="formData.count" />
        </div>
        <zdButton
            class="deliveryAddress-form-button"
            @click="handleEnroll">我要报名</zdButton>
    </form>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import zdCheckbox from 'publicComponents/checkbox/checkbox';

    export default {
        components: {
            zdButton,
            zdCheckbox
        },
        data() {
            return {
                formData: {
                    name: '',
                    cellphone: '',
                    count: 1
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
                if (this.formData.name === '' || this.formData.address === '' || this.formData.cellphone === '' || this.formData.count === '' || this.formData.sex === '') {
                    return '请将表单填写完整';
                } else {
                    const cellphoneReg = /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/;
                    const countReg = /^\d*$/;
                    if (cellphoneReg.test(this.formData.cellphone) === false) {
                        return '请填写正确的手机号';
                    } else if (countReg.test(this.formData.count) === false) {
                        return '请填写正确的人数';
                    } else if (this.formData.count <= 0) {
                        return '请填写正确的人数';
                    }
                }
                return true;
            }
        },
        methods: {
            handleEnroll(e) {
                // 在computed中做表单校验
                e.preventDefault();
                if (this.formValidate !== true) {
                    alert(this.formValidate);
                } else {
                    this.$http({
                        url: '/api/system/service/activity/enrollActivity',
                        data: {
                            parkId: this.info.defaultParkId,
                            roomId: this.info.defaultAddressId,
                            id: this.$route.query.id,
                            name: this.formData.name,
                            cellphone: this.formData.cellphone,
                            count: this.formData.count
                        },
                        method: 'post'
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('报名成功！');
                            this.$router.push('/service/activity');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            } else {
                this.formData.name = this.info.userName;
                this.formData.cellphone = this.info.cellphone;
            }
        }
    }
</script>
