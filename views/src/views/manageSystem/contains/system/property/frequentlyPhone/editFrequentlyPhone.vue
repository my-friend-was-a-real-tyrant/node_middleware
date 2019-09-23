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
            <span>编辑组</span>
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
                    <el-button type="danger" size="small" class="fl" @click="handleDeleteContact(contact, index)">删除</el-button>
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
                contactList: [],
                deleteContactList: []
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
            handleDeleteContact(contact, i) {
                this.$confirm('您确定删除该条联系方式吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (contact.id) {
                        this.deleteContactList.push(contact.id);
                    }
                    this.contactList.splice(i, 1);
                });
            },
            editGroup(id) {
                return this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/editFrequentlyPhoneGroup',
                    method: 'patch',
                    data: {
                        id,
                        name: this.groupForm.name
                    }
                });
            },
            addContact(id, list) {
                return this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/addFrequentlyPhoneContact',
                    method: 'post',
                    data: {
                        id,
                        contactList: list
                    }
                });
            },
            editContact(id, list) {
                return this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/editFrequentlyPhoneContact',
                    method: 'patch',
                    data: {
                        id,
                        contactList: list
                    }
                });
            },
            deleteContact(list) {
                return this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/deleteFrequentlyPhoneContact',
                    method: 'delete',
                    params: {
                        contactList: JSON.stringify(list)
                    }
                });
            },
            handleSubmit() {
                const groupId = this.$route.query.id;
                const addContactList = [];
                const contactList = [];
                for (let i = 0; i < this.contactList.length; i ++) {
                    if (this.contactList[i].id == null) {
                        addContactList.push(this.contactList[i]);
                    } else {
                        contactList.push(this.contactList[i]);
                    }
                }
                // 先提交组，
                // 再新增联系人
                // 再编辑联系人
                // 再删除联系人
                this.editGroup(groupId).then((response) => {
                    if (response.data.code === '00000') {
                        return this.addContact(groupId, addContactList);
                    }
                    return Promise.reject();
                }).then((response) => {
                    if (response.data.code === '00000') {
                        return this.editContact(groupId, contactList)
                    }
                    return Promise.reject();
                }).then((response) => {
                    if (response.data.code === '00000') {
                        return this.deleteContact(this.deleteContactList)
                    }
                    return Promise.reject();
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$message('编辑成功');
                        this.$router.push('/manageSystem/property/frequentlyPhone');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/frequentlyPhone/getFrequentlyPhoneListInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.groupForm.name = response.data.groupInfo.name;
                    this.contactList = response.data.groupInfo.contactList;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>