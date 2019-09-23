<style lang="less" scoped>
    .scoped{
        &-contact{ border-bottom: 1px solid #ddd; line-height: 2.4;
            &:last-child{ border-bottom: 0 none;}
            &-name{ margin-right: 50px;}
        }
        &-form{ margin: -20px 0;}
    }
</style>
<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="关键字">
                <el-input v-model="formData.keywords" size="small"></el-input>
            </el-form-item>
            <el-input class="displayNone"></el-input>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleAddGroup" v-permit="3601">添加组</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="scoped-form">
                        <ul>
                            <li class="clearFix scoped-contact" v-for="contact in props.row.contactList" :key="contact.contactId">
                                <p class="fl scoped-contact-name">名称: {{ contact.contactName }}</p>
                                <p class="fl">联系方式: {{ contact.contactCellphone }}</p>
                            </li>
                        </ul>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="组名称" min-width="200"></el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="edit" @click="handleEditGroup(scope.row)" v-permit="3602">编辑</el-button>
                    <el-button type="danger" size="small" icon="delete" @click="handleDeleteGroup(scope.row)" v-permit="3603">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                formData: {
                    keywords: ''
                },
                sendData: {
                    keywords: ''
                },
                tableData: []
            };
        },
        methods: {
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/property/frequentlyPhone/getFrequentlyPhoneList',
                    params: {
                        keywords: this.sendData.keywords
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.tableData = response.data.frequentlyPhoneList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                this.ajaxFun();
            },
            handleAddGroup() {
                this.$router.push('/manageSystem/property/frequentlyPhone/addFrequentlyPhone');
            },
            handleEditGroup({ groupId: id }) {
                this.$router.push({
                    path: '/manageSystem/property/frequentlyPhone/editFrequentlyPhone',
                    query: {
                        id
                    }
                });
            },
            handleDeleteGroup({ groupId: id }) {
                this.$confirm('您确定删除该组的所有联系方式吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/property/frequentlyPhone/deleteFrequentlyPhoneGroup',
                        method: 'delete',
                        params: {
                            id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('删除成功');
                            this.ajaxFun();
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                });
            }
        },
        mounted(){
            this.ajaxFun();
        }
    }
</script>