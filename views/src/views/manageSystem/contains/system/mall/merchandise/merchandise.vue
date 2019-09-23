<style lang="less" scoped>
    // .scoped-display-none{ display: none;}
    
    .manageMall { background: #F0F2F5; padding: 0; padding-top: 30px; padding-bottom: 30px;
        // &-title { background: #fff; padding: 20px 30px; }
        &-tab { margin: 30px; margin-top: 0;
            ul {
               display: flex; width: 100%; height: 110px; background: #fff; align-items: center;
               li {
                   flex-grow: 1; text-align: center; margin: 30px 0; border-right: 1px solid #E9E9E9;
                   p { font-size: 14px; color: #8D8D8D; margin-bottom: 5px; }
               }
               li:last-of-type { border: 0; }
            }
        }
        &-tasklist { margin: 30px; padding: 30px; background: #fff; position: relative; padding-bottom: 120px;
            &-page { position: absolute; right: 30px; bottom: 30px; }
            &-title { 
                display: flex; justify-content: space-between; 
                &-search { 
                     width: 250px; height: 30px; position: relative;
                    i { color: #D9D9D9; position: absolute; right: 7px; top: 7px; cursor: pointer; }
                    input { width: 100%; border: 1px solid #D9D9D9; height: 100%; padding: 0 10px;  border-radius: 5px; padding-right: 30px;}
                    input:focus { border: 1px solid #38A0FC; }
                    input::-webkit-input-placeholder{ color:#D9D9D9; }
                }
                
            }
            &-add { border: 1px dashed #EBEBEB; text-align: center; color: #999999; margin: 30px 0 20px; height: 30px; line-height: 30px; font-size: 14px; border-radius: 5px; cursor: pointer; }
            &-list { 
                ul {
                    border-bottom: 1px solid #E9E9E9; display: flex; padding: 20px 0px 20px 30px; align-items: center;
                    li { width: 15%;
                        p { color: #8D8D8D; padding-top: 5px; font-size: 14px; height: 24px;overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width: 80%;  }
                        a { color: #3290FC; font-size: 14px; cursor: pointer; }
                        span { font-size: 14px; color: #DAE3F1; padding: 0 5px; }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="manageMall">
        <!-- <div class="manageMall-title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="manageMall-tab">
            <ul>
                <li>
                    <p>商品总数</p>
                    <h3>{{count.merchandiseTotalCount}}</h3>
                </li>
                <li>
                    <p>团购总数</p>
                    <h3>{{count.groupTotalCount}}</h3>
                </li>
                <li>
                    <p>拼团总数</p>
                    <h3>{{count.spellTotalCount}}</h3>
                </li>
            </ul>
        </div>

        <div class="manageMall-tasklist">
            <div class="manageMall-tasklist-title">
                <h5>
                    任务列表
                </h5>
                <div class="manageMall-tasklist-title-search">
                    <input type="text" v-model="formData.keywords" placeholder="请输入"><i class="el-icon-search" @click="searchFun"></i>
                </div>
            </div>
            <div class="manageMall-tasklist-add" @click="addMerchandise" v-permit="3101">
                + 添加商品
            </div>
            <div class="manageMall-tasklist-list" v-for="(item, i) in tableData" :key="i">
                <ul>
                    <li>
                        <h5>商品编号</h5>
                        <p> {{item.sku}} </p>
                    </li>
                    <li>
                        <h5>商品名称</h5>
                        <p> {{item.name}} </p>
                    </li>
                    <li>
                        <h5>单买价格</h5>
                        <p> {{item.specialPrice}} </p>
                    </li>
                    <li>
                        <h5>拼团价格</h5>
                        <p>{{item.spellPrice }}</p>
                    </li>
                    <li>
                        <h5>净含量</h5>
                        <p> {{item.content}} </p>
                    </li>
                    <li>
                        <h5>状态</h5>
                        <p> {{item.status}} </p>
                    </li>
                    <li>
                        <a @click="editMerchandise(item.id)">编辑</a><span>|</span><a @click="merchandiseInfo(item.id)">详情</a>
                    </li>
                </ul>
            </div>
            <div class="manageMall-tasklist-page">
                <el-pagination 
                    layout="sizes, total, prev, pager, next, jumper" 
                    :current-page="pageData.currentPage"
                    :total="pageData.totalSize" 
                    :page-sizes="[10, 20, 50, 100]" 
                    :page-size="pageData.pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) : 1;
            return {
                formData: {
                    keywords: ''
                },
                count: {
                    merchandiseTotalCount: 0,
                    groupTotalCount: 0,
                    spellTotalCount: 0
                },
                sendData: {
                    keywords: '',
                    status: ''
                },
                tableData: [],
                pageData: {
                    currentPage,
                    totalSize: 10,
                    pageSize: 10
                },
            }
        },
        methods: {
            watchQueryFun(){
                // 监测路由中的query数据变化
                if(this.$route.query.currentPage) {
                    this.pageData.currentPage = parseInt(this.$route.query.currentPage);
                } else {
                    this.pageData.currentPage = 1;
                }
                this.ajaxFun();
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseList',
                    params: {
                        keywords: this.sendData.keywords,
                        status: this.sendData.status ? this.sendData.status : '',
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.merchandiseList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){

                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/mall/merchandise/merchandise',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            filterFun(obj) {
                if (Array.isArray(obj['status'])) {
                    this.sendData.status = obj['status'][0];
                }
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            merchandiseInfo(id) {
                // this.$router.push({
                //     path: '/manageSystem/mall/merchandise/merchandise/merchandiseInfo',
                //     query: {
                //         id: id
                //     }
                // });
                window.location.href = '/manageSystem/mall/merchandise/merchandise/merchandiseInfo?id='+id;
            },
            editMerchandise(id) {
                this.$router.push({
                    path: '/manageSystem/mall/merchandise/merchandise/editMerchandise',
                    query: {
                        id: id
                    }
                });
            },
            addMerchandise() {
                this.$router.push('/manageSystem/mall/merchandise/merchandise/addMerchandise');
            }
        },
        mounted(){
            this.watchQueryFun();
            this.$http({
                method: 'get',
                url: '/api/manageSystem/system/mall/merchandise/merchandise/getUserCount',
            }).then((res) => {
                if (res.data.code === '00000') {
                    this.count = res.data.data;
                }
            }).catch((err) => {
                console.log(err)
            })
            // this.$http({
            //         method: 'get',
            //         url: '/api/manageSystem/system/mall/merchandise/merchandise/getAloneInfo',
            //         params: {
            //             merchandiseId: 11,
            //             status: 0,
            //             pageNo: 1,
            //             pageSize: 10
            //         }
            //     }).then((response) => {
            //         console.log(response)
            //         if (response.data.code === '00000') {
            //             // this.pageData.totalSize = response.data.count;
            //             // this.tableData = response.data.merchandiseList;
            //         }
            //     }).catch((response) => {
            //         console.log(response);
            //     });
            // this.$http({
            //     url: '/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseInfo',
            //     params: {
            //         id: 11
            //     }
            // }).then((response) => {
            //     if (response.data.code === '00000') {
            //         this.info = response.data.merchandiseInfo;
            //     }
            // }).catch((response) => {
            //     console.log(response);
            // });
        },
        watch: {
            '$route.query.currentPage': function(){
                this.watchQueryFun();
            }
        }
    }
</script>