<style lang="less" scoped>
    .scoped-form{
        .el-input, .el-select{ width: 500px;}
    }
    .scoped{
        &-contact{ width: 45%; margin-bottom: 30px; margin-right: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;
            .el-input, .el-select{ width: 100%;}
        }
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>添加组</span>
        </div>
        <el-form ref="formData" label-width="120px" class="scoped-form" label-position="left">
            <el-form-item label="组名称">
                <el-input v-model="groupForm.name"></el-input>
                <el-button type="primary" size="small" @click="handleAddContact">添加常用电话</el-button>
            </el-form-item>
            <div class="clearFix">
                <div class="fl scoped-contact" v-for="(contact, index) in contactList" :key="index">
                    <el-form-item label="联系名称">
                        <el-input v-model="contact.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="contact.cellphone"></el-input>
                    </el-form-item>
                    <el-button type="danger" size="small" class="fl" @click="handleDeleteContact(index)">删除</el-button>
                </div>
            </div>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
                <el-button type="danger" size="small" @click="handleCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                groupForm: {
                    name: ''
                },
                contactList: []
            }
        },
        methods: {
            handleCancel() {
                this.$router.push('/manageSystem/property/frequentlyPhone');
            },
            handleAddContact() {
                this.contactList.push({
                    cellphone: '',
                    name: ''
                });
            },
            handleDeleteContact(i) {
                this.$confirm('您确定删除该条联系方式吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.contactList.splice(i, 1);
                });
            },
            addGroup() {
                return this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/addFrequentlyPhoneGroup',
                    method: 'post',
                    data: {
                        name: this.groupForm.name
                    }
                });
            },
            addContact(id) {
                return this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/addFrequentlyPhoneContact',
                    method: 'post',
                    data: {
                        id,
                        contactList: this.contactList
                    }
                });
            },
            handleSubmit() {
                let groupId = '';
                // 先提交组，再提交联系方式
                this.addGroup().then((response) => {
                    if (response.data.code === '00000') {
                        groupId = response.data.id;
                        return this.addContact(groupId);
                    }
                    return false;
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$message('新建成功');
                        this.$router.push('/manageSystem/property/frequentlyPhone');
                    } else {
                        this.handleDeleteGroup(groupId)
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleDeleteGroup(id) {
                this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/deleteFrequentlyPhoneGroup',
                    method: 'delete',
                    params: {
                        id
                    }
                });
            }
        },
    }
</script>