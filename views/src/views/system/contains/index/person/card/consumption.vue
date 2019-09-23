<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .3rem;
        padding: 10px;
        border-bottom: 1px solid #E5E5E9;
        img {
            vertical-align: middle;
        }
    }
    section {
        padding: 10px;
        .item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            font-size: .3rem;
            border-bottom: 1px solid #E5E5E9;
        }
        .search {
            background-color: #EB5A54;
            color: #fff;
            border-radius: 5px;
        }
    }
</style>
<template>
    <div class="container" v-title="'消费记录'">
        <header>
            <i class="el-icon-arrow-left" @click="back"></i>
            <p>消费记录</p>
            <div>
                <i class="el-icon-search"></i>
                <span>查询</span>
            </div>
        </header>
        <section>
            <div class="item" style="border-bottom: 0;">
                <el-date-picker
                    style="flex-basis: 48%;"
                    v-model="value1"
                    type="date"
                    placeholder="开始日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                <el-date-picker
                    style="flex-basis: 48%;"
                    v-model="value2"
                    type="date"
                    placeholder="结束日期"
                    :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
            <div class="item">
                <el-input placeholder="金额" style="flex-basis: 48%;"></el-input>
                <button class="search" style="flex-basis: 48%;">查询</button>
            </div>
            <div class="item">
                <div>
                    <p>景园小区食堂消费</p>
                    <span style="color: #B8B8B8; font-size: .2rem;">8月12日 12:35</span>
                </div>
                <p style="color: #E4B247">-20.00</p>
            </div>
        </section>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                value1: '',
                value2: '',
            }
        },
        methods: {
            back() {
                history.go(-1);
            }
        }
    }
</script>