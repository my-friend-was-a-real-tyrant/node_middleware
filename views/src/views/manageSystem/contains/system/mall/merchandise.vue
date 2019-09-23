<style lang="less" scoped>
    .scoped-display-none{ display: none;}
    .mallManage { padding: 0; }
</style>
<template>
    <div class="mallManage">
        <!--tabs【商品、商品类别、团购】跳转路由  -->
        <!-- <el-tabs v-model="currentRoute" @tab-click="handleClick" class="scoped-display-none">
            <el-tab-pane label="商品管理" name="/manageSystem/mall/merchandise/merchandise"></el-tab-pane>
            <el-tab-pane label="团购管理" name="/manageSystem/mall/merchandise/groupPurchase"></el-tab-pane>
        </el-tabs> -->
        <router-view></router-view>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const merchandiseReg = /^\/manageSystem\/mall\/merchandise\/merchandise/;
            const groupPurchaseReg = /^\/manageSystem\/mall\/merchandise\/groupPurchase/;
            const currentRoute = this.$route.path;
            let activeTab = '';
            if (merchandiseReg.test(currentRoute) === true) {
                activeTab = '/manageSystem/mall/merchandise/merchandise';
            } else if (groupPurchaseReg.test(currentRoute) === true) {
                activeTab = '/manageSystem/mall/merchandise/groupPurchase';
            }

            return {
                currentRoute: activeTab
            }
        },
        methods: {
            handleClick(tab) {
                this.$router.push(tab.name);
            }
        }
    }
</script>