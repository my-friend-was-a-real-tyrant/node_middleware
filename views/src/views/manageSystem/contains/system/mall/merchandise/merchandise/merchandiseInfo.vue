<style lang="less" id="a">
    .goodsdetail-history {
        .el-table .el-table_1_column_19 div.cell, .el-table .el-table_1_column_11 div.cell, .el-table .el-table_1_column_10 div.cell, .el-table .el-table_1_column_3 div.cell, .el-table .el-table_1_column_18 div.cell{ width: 120px; }
        // .el-table div.cell{ width: 120px; }
        .el-table td　{ height: 80px; }
    }
</style>
<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .el-table__expanded-cell .demo-table-expand .el-form-item { width: 33% }
    .repairmentInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
    
    .el-message-box { width: 320px; height: 260px; border-radius: 20px }
    .demo-table-expand {
    }
    .demo-table-expand label {
        width: 90px; color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-table__column-resize-proxy { border: 0}
    .el-table::before {height: 0}
    .el-table::after {width: 0}
    .el-table { border: none; }
    .scoped-form .scoped-form-input .el-input{ width: 160px }
    .contain-main { background: #F0F2F5; padding-bottom: 30px; padding-top: 30px;
        // .goodsdetail-title {  background: #fff; padding: 20px 30px; border-bottom: 1px solid #E9E9E9; }
        .goodsdetail-detail { margin: 30px; background: #fff; padding-left: 30px; margin-top: 0;
            .contain-title { display: flex; align-items: center;
                padding-left: 0; font-size: 26px; 
                button { margin-left: 25px; }
            }
            .goodsdetail-form { 
                display: flex;
                .el-form-item { width: 50%; }
            }
            .goodsdetail-formins {
                display: flex; font-size: 14px;
                >div {
                    width: 33%;
                    padding: 10px 0 30px 0;
                }
            }
            .goodsdetail-group { 
                border-top: 1px solid #F4F4F4;
                h5 { padding: 25px 0 10px 0;}
                .goodsdetail-group-btn { 
                    padding-bottom: 30px; 
                    
                }
            }
        }
        .goodsdetail-history { 
            margin: 0 30px; position: relative; background: #fff;padding: 30px; padding-bottom: 150px;
            .goodsdetail-history-page {  position: absolute; right: 30px; bottom: 30px;    }
            .goodsdetail-history-title { display: flex; margin-bottom: 30px; display: flex; align-items: center;
                p { font-size: 26px; margin-right: 40px }
                .goodsdetail-history-title-tab { display: flex; font-size: 0;
                    span { width: 75px; height: 28px; display: block;line-height: 28px; text-align: center; cursor: pointer; font-size: 12px;}
                }
                .goodsdetail-history-title-singlebuy { border: 1px solid; border-right: 0; border-radius: 5px 0 0 5px;}
                .goodsdetail-history-title-groupbuy { border: 1px solid; }
                .goodsdetail-history-title-playbuy { border: 1px solid; border-left: 0; border-radius: 0 5px 5px 0;}
                .greycolor { color: #5A5A5A; border-color: #DEDEDE }
                .redcolor {  border-color: red; }
                .bluecolor { color: #3290FC; border-color: #3290FC }
            }
            .goodsdetail-history-operate{
               a { color: #3290FC; cursor: pointer; } 
               a.greyC { color: #ccc; cursor:not-allowed; }
               a.blueC { color: #419EFB }
               span { font-size: 12px; color: #DAE3F1; }
            }
             
        }
        .goodsdetail-dialog-special {
            input { width: 100; border: 1px solid #C0CBD9; width: 100px; height: 30px; border-radius: 5px; padding: 0 10px 0 10px;}
            input.errinput { border: 1px solid red; }
                input:focus { border: 1px solid #38A0FC; }  
        }
        .goodsdetail-dialogbg {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, .3); font-size: 14px; z-index: 999;
            .goodsdetail-dialog {
                padding: 30px 40px; position: fixed; top: 30%; left: -120px; margin-left: 50%; width: 340px; height: 280px;border: 1px solid #797979; background: #fff; border-radius: 10px;
                span { margin-right: 8px; margin-left: 8px }
                .goodsdetail-dialog-prise { width: 100px }
                >div { margin-bottom: 30px; display: flex; align-items: center; }
                button { margin-left: 20px; margin-right: 20px; width: 80px; }
            }
            .goodsdetail-dialog-count { 
                position: relative; width: 100px;
                input { width: 100; border: 1px solid #C0CBD9; width: 100px; height: 30px; border-radius: 5px; padding: 0 30px 0 10px;}
                input.errinput { border: 1px solid red; }
                input:focus { border: 1px solid #38A0FC; }                
            }
            .goodsdetail-dialog-add { 
                position: absolute; right: 1px; top: 1px; width: 25px; height: 14px; border-left: 1px solid #D9D9D9; display: flex; align-items: center; border-bottom: 1px solid #D9D9D9; cursor: pointer;
                i { font-size: 12px; transform: scale(.7); display: block; margin: 0 auto; color: #5e5e5e;}
            }
            .goodsdetail-dialog-down { 
                position: absolute; right: 1px; bottom: 1px; width: 25px; height: 14px;border-left: 1px solid #D9D9D9; display: flex; align-items: center; cursor: pointer;
                i { font-size: 12px; transform: scale(.7); display: block; margin: 0 auto; color: #5e5e5e; }
            }
            .iconCanbg i { color: #5e5e5e; }
            .iconNobg i { color: #D9D9D9; cursor:not-allowed; }
            .iconCanbg:hover i { color: #409EFF }
        }
        
    }
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<template>
    <div class="contain-main">
        <!-- <div class="goodsdetail-title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品详情页商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="goodsdetail-detail">
            <div class="contain-title">
                <span>商品详情页</span>
                <el-button type="primary" size="small" @click="editMerchandise" v-permit="3102">编辑</el-button>
                <el-button type="primary" size="small" @click="upMerchandise" v-permit="3102">{{ info.status === "已上架" ? '下架' : '上架' }}</el-button>
                <el-button type="primary" size="small" @click="groupPurchaseDialog" v-permit="3102" :disabled="info.grouped === 0">发起团购</el-button>
                <el-button size="small" @click="routerBack">返回</el-button>
            </div>
            <el-form label-width="120px" label-position="left">
                <div class="goodsdetail-form">
                    <el-form-item label="商品编码:">
                        <span>{{ info.sku }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称:">
                        <span>{{ info.name }}</span>
                    </el-form-item>
                </div>    
                <div class="goodsdetail-form">
                    <el-form-item label="商品净含量:">
                        <span>{{ info.content }}</span>
                    </el-form-item>
                
                
                    <el-form-item label="商品描述:">
                        <span>{{ info.description }}</span>
                    </el-form-item>
                </div>
                <div class="goodsdetail-form">
                    <el-form-item label="原价(元):">
                        <span>{{ info.price }}</span>
                    </el-form-item>
                    <el-form-item label="单买价(元)：">
                        <span>{{ info.specialPrice }}</span>
                    </el-form-item>
                </div>
                <div class="goodsdetail-form">
                    <el-form-item label="状态：">
                        <pre>{{ info.status }}</pre>
                    </el-form-item>
                    <el-form-item label="商品介绍：">
                        <img class="repairmentInfo-img" :src="info.detailImg" @click="handleBigImage(info.detailImg)" />
                    </el-form-item>
                </div>    
                <el-form-item label="商品轮播图：">
                    <img class="repairmentInfo-img" :src="item" v-for="item in info.img" :key="item" @click="handleBigImage(item)" />
                </el-form-item>
                <div class="goodsdetail-group">
                    <h5>
                        商品拼团信息
                    </h5>
                    <div class="goodsdetail-formins">
                        <div>
                            <span>拼团价(元)：</span>
                            <span>
                                {{ goodGroupMes.prise }}
                            </span>
                        </div>
                        <div>
                            <span>成团份数：</span>
                            <span>
                                {{ goodGroupMes.count }}
                            </span>
                        </div>
                        <div>
                            <span>拼团有效期(小时)：</span>
                            <span>
                                {{ goodGroupMes.date }}
                            </span>
                        </div>
                    </div>
                    <div class="goodsdetail-group-btn" v-if="info.spelled == 1">
                        <el-button type="primary" size="small" @click.stop="dialogFormVisible = true">编辑</el-button>
                        <el-button type="primary" size="small" @click="cancelMerchandise" v-permit="3102">取消拼团</el-button>
                    </div>
                    <div class="goodsdetail-dialogbg" v-show="dialogFormVisible">
                        <div class="goodsdetail-dialog">
                            <div class="goodsdetail-dialog-special">
                                <span>拼团价格:</span>
                                <input autocomplete="off" v-model="goodstartMes.prise" class="goodsdetail-dialog-prise" placeholder="请输入" :class="[priceErr ? 'errinput' : '']" @change="limitpriceNumber">
                                <span>元</span>
                            </div>
                            <div>
                                <span>成团数量:</span>
                                <div class="goodsdetail-dialog-count">
                                    <input autocomplete="off" v-model="goodstartMes.count" type="text" @change="limitNumber" :class="[countErr ? 'errinput' : '']">
                                    <div class="goodsdetail-dialog-add" @click="(goodstartMes.count < countMax && !countErr) ? goodstartMes.count++ : ''" :class="[(goodstartMes.count < countMax && !countErr) ? 'iconCanbg' : 'iconNobg']">
                                        <i class="el-icon-arrow-up"></i>
                                    </div>
                                    <div class="goodsdetail-dialog-down" @click="(goodstartMes.count > 0 && !countErr) ?goodstartMes.count-- : '';" :class="[(goodstartMes.count && !countErr) > 0 ? 'iconCanbg' : 'iconNobg']">
                                        <i class="el-icon-arrow-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span>拼团有效时间:</span>
                                <div class="goodsdetail-dialog-count">
                                    <input autocomplete="off" v-model="goodstartMes.date" type="text" @change="limitdate" :class="[dateErr ? 'errinput' : '']">
                                    <div class="goodsdetail-dialog-add" @click="(goodstartMes.date < dateMax && !dateErr) ? goodstartMes.date++ : ''" :class="[(goodstartMes.date < dateMax && !dateErr) ? 'iconCanbg' : 'iconNobg']">
                                        <i class="el-icon-arrow-up"></i>
                                    </div>
                                    <div class="goodsdetail-dialog-down" @click="(goodstartMes.date > 0 && !dateErr) ?goodstartMes.date-- : '';" :class="[(goodstartMes.date > 0 && !dateErr) ? 'iconCanbg' : 'iconNobg']">
                                        <i class="el-icon-arrow-down"></i>
                                        
                                    </div>
                                </div>
                                <span>小时</span>
                            </div>
                            <div>
                                <el-button type="primary" @click="sureGroupMes">确定</el-button>
                                <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="goodsdetail-group-btn" v-if="!info.spelled">
                        <el-button type="primary" size="small" @click="dialogFormVisible = true">开启拼团</el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="goodsdetail-history">
            <div class="goodsdetail-history-title">
                <p>历史记录</p>
                <div class="goodsdetail-history-title-tab">
                    <span class="goodsdetail-history-title-singlebuy" :class="[bg.singlebg ? 'bluecolor' : 'greycolor']" @click="singlebuy">单买</span>
                    <span class="goodsdetail-history-title-groupbuy" :class="[bg.groupbg ? 'bluecolor' : 'greycolor']" @click="groupbuy">团购</span>
                    <span class="goodsdetail-history-title-playbuy" :class="[bg.playbg ? 'bluecolor' : 'greycolor']" @click="playbuy">拼团</span>
                </div>
            </div>
            <el-form>
                <el-form-item v-show="bg.singlebg">
                    <el-table stripe :data="singleTableDataList" style="width: 100%" min-width="100">
                        <el-table-column prop="orderId" label="编号"></el-table-column>
                        <el-table-column prop="buyerName" label="买家姓名"></el-table-column>
                        <el-table-column prop="createDatetime" label="购买时间"></el-table-column>
                        <el-table-column prop="quantity" label="购买数量"></el-table-column>
                        <el-table-column prop="amount" label="金额(元)" ></el-table-column>
                        <el-table-column prop="status" label="状态"
                            column-key="status"
                            :filters="[{ text: '待发货', value: '1' }, { text: '已发货', value: '2' },{ text: '已完成', value: '3' }]"
                            :filter-multiple="false"
                            :filter-method="filterTag">
                            <template scope="scope">
                                <div>{{scope.row.status == 1 ? '待发货' : (
                                    scope.row.status == 2 ? '已发货' : '已完成' )}}</div>
                            </template>
                        </el-table-column>
                        
                         
                        <el-table-column label="操作" width="160">
                            <template scope="scope">
                                <div class="goodsdetail-history-operate">
                                    <a @click="exportSingleOrder(scope.row.id)" v-permit="3100">导出订单</a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <!-- 团购 -->

                <el-form-item v-show="bg.groupbg">
                    <el-table stripe :data="info.tableData" style="width: 100%" min-width="100">
                        <el-table-column prop="id" label="编号"></el-table-column>
                        <el-table-column prop="groupPrice" label="团购价(元)"></el-table-column>
                        <el-table-column prop="startDatetime" label="开始时间"></el-table-column>
                        <el-table-column prop="endDatetime" label="结束时间"></el-table-column>
                        <el-table-column prop="maxCount" label="成团人数"></el-table-column>
                        <el-table-column prop="realCount" label="已参团人数"></el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template scope="scope">
                                <div>{{ scope.row.status }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <div class="goodsdetail-history-operate">
                                    <a @click="editGroupPurchase(scope.row)" :class="[(scope.row.status === '未开始') ? '' : 'greyC']" v-permit="3102">编辑</a>
                                    <span>|</span>
                                    <a @click="exportOrder(scope.row.id)" v-permit="3100">导出订单</a>
                                    <span>|</span>
                                    <a @click="forceGroup(scope.row.id, scope.row.status)" :class="[(scope.row.status == '进行中') ? '' : 'greyC']">强制成团</a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

                <el-form-item v-show="bg.playbg">
                    <el-table :data="playTableDataList" style="width: 100%" min-width="100">
                        <el-table-column label="编号" type="expand">
                            <template scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="团长：">
                                    <span>{{ props.row.merchandiseSpellDetailList[0] ? props.row.merchandiseSpellDetailList[0].member : '' }}</span>
                                </el-form-item>
                                <el-form-item label="手机号：">
                                    <span>{{ props.row.merchandiseSpellDetailList[0] ? props.row.merchandiseSpellDetailList[0].cellphone :'' }}</span>
                                </el-form-item>
                                <el-form-item label="地址：">
                                    <span>{{ props.row.merchandiseSpellDetailList[0]? props.row.merchandiseSpellDetailList[0].address : '' }}</span>
                                </el-form-item>
                                <el-form-item label="成员：">
                                    <span>{{ props.row.merchandiseSpellDetailList[1] ? props.row.merchandiseSpellDetailList[1].member :'' }}</span>
                                </el-form-item>
                                <el-form-item label="手机号：">
                                    <span>{{ props.row.merchandiseSpellDetailList[1]?props.row.merchandiseSpellDetailList[1].cellphone : '' }}</span>
                                </el-form-item>
                                <el-form-item label="地址：">
                                    <span>{{ props.row.merchandiseSpellDetailList[1]? props.row.merchandiseSpellDetailList[1].address: '' }}</span>
                                </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="编号"></el-table-column>
                        <el-table-column prop="groupPrice" label="拼团价(元)"></el-table-column>
                        <el-table-column prop="createDatetime" label="开始时间"></el-table-column>
                        <el-table-column prop="completeDatetime" label="结束时间"></el-table-column>
                        <el-table-column prop="maxCount" label="成团人数"></el-table-column>
                        <el-table-column prop="quantity" label="已参团人数"></el-table-column>
                        <el-table-column prop="status" label="状态"
                            column-key="status"
                            :filters="[{ text: '已成团', value: '3' }, { text: '团购失败', value: '4' },{ text: '团购中', value: '2' }, { text: '团购未开始', value: '1' },{ text: '团购结束', value: '5' }]"
                            :filter-multiple="false"
                            :filter-method="filterTag">
                            <template scope="scope">
                                <div>{{scope.row.status == 3 ? '已成团' : (
                                    scope.row.status == 4 ? '团购失败' : (
                                        scope.row.status == 2 ? '团购中' : (
                                            scope.row.status == 1 ? '团购未开始' : '团购结束'
                                        )
                                    ))}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <div class="goodsdetail-history-operate">
                                    <a @click="exportOrder(scope.row.id)" v-permit="3100">导出订单</a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div class="goodsdetail-history-page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageData.currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageData.totalSize">
                </el-pagination>
            </div>
        </div>
        <div>
           
        </div>

         <el-dialog
            title="发起团购"
            v-model="groupPurchaseDialogVisible"
            @close="handleResetGroupPurchase">
            <el-form 
                :model="groupPurchaseFormData"
                :rules="groupPurchaseFormRules"
                ref="groupPurchaseForm"
                label-width="110px"
                class="scoped-form"
            >
                <el-form-item label="团购开始时间" prop="startDatetime">
                    <el-date-picker
                        v-model="groupPurchaseFormData.startDatetime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="团购结束时间" prop="endDatetime">
                    <el-date-picker
                        v-model="groupPurchaseFormData.endDatetime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="团购数量" prop="maxCount">
                    <el-input-number v-model="groupPurchaseFormData.maxCount" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="团购价格(元)" prop="price" class="scoped-form-input">
                    <!-- <el-input-number :debounce="1000" v-model.number="groupPurchaseFormData.price" :min="0"></el-input-number>  -->
                    <el-input v-model.number="groupPurchaseFormData.price"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancelGroupPurchase">取 消</el-button>
                <el-button type="primary" @click="handleSubmitGroupPurchase" v-permit="3102">确 定</el-button>
            </span>
        </el-dialog>
    <el-dialog
            title="编辑团购"
            v-model="editGroupPurchaseDialogVisible"
            @close="handleResetEditGroupPurchase">
            <el-form 
                :model="editGroupPurchaseFormData"
                :rules="groupPurchaseFormRules"
                ref="editGroupPurchaseForm"
                label-width="110px"
            >
                <el-form-item label="团购开始时间" prop="startDatetime">
                    <el-date-picker
                        v-model="editGroupPurchaseFormData.startDatetime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="团购结束时间" prop="endDatetime">
                    <el-date-picker
                        v-model="editGroupPurchaseFormData.endDatetime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="团购数量" prop="maxCount">
                    <el-input-number v-model="editGroupPurchaseFormData.maxCount" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="团购价格(元)" prop="price">
                    <el-input :debounce="600" v-model="editGroupPurchaseFormData.price"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancelEditGroupPurchase">取 消</el-button>
                <el-button type="primary" @click="handleSubmitEditGroupPurchase" v-permit="3102">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog v-model="bigImgVisible" size="tiny">
            <img width="100%" :src="bigImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script lang="babel">
import message from 'publicSource/components/message/message'

    export default {
        data() {
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) : 1;
            const id = this.$route.query.id;
            const priceValidate = (rule, value, callback) => {
                if (value == '') {
                    this.groupPurchaseFormData.price = 0
                }
                let oldVal = value
                let now = oldVal.toString().replace(/[^\d\.]/g,'');
                if (now.indexOf('.') != -1) {
                    if (now.split('.')[1].length > 1) {
                        now = now.split('.')[0] + '.' + now.split('.')[1].substr(0,2);
                    }
                }  
                now = now > 99999.99 ?  99999.99 : now;
                if (oldVal != now) {
                    callback(new Error('限制100000.00元以内'));
                } else {
                    
                    callback();
                }
            };

            return {
                priceErr: false,
                dateErr: false,
                countErr: false,
                dateMax: 720,
                countMax: 999,
                upDown: 1,
                hisStatus: 0,
                nowPage: 1,
                bg: {
                    singlebg: true,
                    groupbg: true,
                    playbg: true,
                },
                goodstartMes: {
                    prise: '',
                    count: 0,
                    date: 0,
                },
                goodGroupMes: {
                    prise: '',
                    count: '',
                    date: '',
                },
                dialogFormVisible: false,
                pageData: {
                    currentPage,
                    totalSize: 10,
                    pageSize: 10
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                info: {
                    sku: '',
                    name: '',
                    price: '',
                    content: '',
                    status: '',
                    description: '',
                    img: '',
                    detailImg: '',
                    spelled: ''
                },
                singleTableDataList: [],
                playTableDataList: [],
                groupPurchaseDialogVisible: false,
                groupPurchaseFormData: {
                    id,
                    startDatetime: '',
                    endDatetime: '',
                    maxCount: 0,
                    price: '0'
                },
                editGroupPurchaseDialogVisible: false,
                editGroupPurchaseFormData: {
                    groupPurchaseId: '',
                    startDatetime: '',
                    endDatetime: '',
                    maxCount: 0,
                    price: 0
                },
                groupPurchaseFormRules: {
                    startDatetime: [
                        { type: 'date', required: true, message: '请选择开始日期时间', trigger: 'blur'}
                    ],
                    endDatetime: [
                        { type: 'date', required: true, message: '请选择结束日期时间', trigger: 'blur'}
                    ],
                    maxCount: [
                        { type: 'number', required: true, trigger: 'blur'}
                    ],
                    price: [
                        { validator: priceValidate, trigger: 'blur'}
                    ]
                },
                bigImageUrl: '',
                bigImgVisible: false,
            }
        },
        methods: {
            handleBigImage(url) {
                this.bigImageUrl = url;
                this.bigImgVisible = true;
            },
            limitpriceNumber() {
                if (this.goodstartMes.prise == '') {
                    this.priceErr = true
                    this.$message('请输入拼团价格')
                } else {
                    let oldVal = this.goodstartMes.prise
                    let now = this.goodstartMes.prise.replace(/[^\d\.]/g,'').toString();
                    if (now.indexOf('.') != -1) {
                        if (now.split('.')[1].length > 1) {
                            console.log(now)
                            console.log(now.split('.')[1])
                            now = now.split('.')[0] + '.' + now.split('.')[1].substr(0,2);
                        }
                    }
                    now = now > 99999.99 ?  99999.99 : now;
                    if (oldVal != now) {
                        this.priceErr = true
                        this.$message('拼团价格请输入小于100000且小数点后不超过两位的小数')
                    } else {
                        this.goodstartMes.prise = parseFloat(this.goodstartMes.prise)
                        this.priceErr = false;
                    }
                }
                
            },
            limitNumber() {
                if (this.goodstartMes.count == '') {
                    this.countErr = true
                    this.$message('请输入成团数量')
                } else {
                    let oldVal = this.goodstartMes.count
                    let now = parseInt(this.goodstartMes.count.replace(/[^0-9]+/,'')); 
                    now = now > this.countMax ?  this.countMax : now;
                    if (oldVal != now) {
                        this.countErr = true
                        this.$message('成团数量请输入小于10000的正整数')
                    } else {
                        this.goodstartMes.count = parseInt(this.goodstartMes.count)
                        this.countErr = false
                    }
                }
            },
            limitdate() {
                if (this.goodstartMes.date == '') {
                    this.dateErr = true
                    // this.goodstartMes.date = 0;
                    this.$message('请输入拼团有效时间')
                } else {
                    let oldVal = this.goodstartMes.date
                    let now = parseInt(this.goodstartMes.date.replace(/[^0-9]+/,'')); 
                    now = now > this.countMax ?  this.countMax : now;
                    if (oldVal != now) {
                        this.dateErr = true
                        this.$message('拼团有效时间请输入不大于720的正整数')
                    } else {
                        this.goodstartMes.date = parseInt(this.goodstartMes.date)
                        this.dateErr = false;
                    }
                }
            },
            sureGroupMes() {
                console.log(this.priceErr)
                console.log(this.dateErr)
                console.log(this.countErr)
                if (this.goodstartMes.prise == "") {
                    this.$message('请输入拼团价格')
                } else if (this.priceErr || this.dateErr || this.countErr) {
                    console.log(123)
                    this.$message('请先填入正确数据')
                } else {
                    this.$http({
                        url: '/api/manageSystem/system/mall/merchandise/merchandise/setTogetherInfo',
                        method: 'patch',
                        data: {
                            merchandiseId: this.$route.query.id,
                            lumpCount: this.goodstartMes.count,
                            validTime: this.goodstartMes.date,
                            spellPrice: this.goodstartMes.prise
                        }
                    }).then(res => {
                        console.log(res)
                        this.dialogFormVisible = false;
                        this.goodGroupMes.count = this.goodstartMes.count;
                        this.goodGroupMes.prise = this.goodstartMes.prise;
                        this.goodGroupMes.date = this.goodstartMes.date;
                        this.info.spelled = 1;
                        
                    }).catch(err => {
                        console.log(err)
                    })
                }
                
            },
            cancelMerchandise() {
                this.$http({
                    url: '/api/manageSystem/system/mall/merchandise/merchandise/cancelGroup',
                    method: 'patch',
                    data: {
                        merchandiseId: this.$route.query.id
                    }
                }).then(res => {
                    console.log(res)
                    this.info.spelled = 0;
                    this.goodGroupMes = {};
                    this.goodstartMes = {
                        prise: '',
                        count: 1,
                        date: 1,
                    };
                }).catch(err => {
                    console.log(err)
                })
            },
            upMerchandise() {
                this.$http({
                    url: '/api/manageSystem/system/mall/merchandise/merchandise/goodsUpDown',
                    method: 'patch',
                    data: {
                        merchandiseId: this.$route.query.id,
                        operationType: this.info.status === "已上架" ? 1 : 2,
                    }
                }).then(res =>　{
                    if (res.data.code === '00000') {
                        if (this.info.status === "未上架") {
                            this.info.status = "已上架"
                        } else {
                            this.info.status = "未上架"
                        }
                        // this.$http({
                        //     url: '/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseInfo',
                        //     params: {
                        //         id: this.$route.query.id
                        //     }
                        // }).then((response) => {
                        //     if (response.data.code === '00000') {
                        //         this.info = response.data.merchandiseInfo;
                        //     }
                        // }).catch((response) => {
                        //     console.log(response);
                        // });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            singlebuy() {
                this.bg.playbg = false;
                this.bg.groupbg = false;
                this.bg.singlebg = true;
                this.nowPage = 1;
                this.watchQueryFun();
                
                
            },
            groupbuy() {
                this.bg.playbg = false;
                this.bg.singlebg = false;
                this.bg.groupbg = true;
                this.nowPage = 2;
                this.watchQueryFun();
            },
            playbuy() {
                this.bg.groupbg = false;
                this.bg.singlebg = false;
                this.bg.playbg = true;
                this.nowPage = 3;
                this.watchQueryFun();
                
            },
            filterTag(value, row) {
                this.hisStatus = value;
                return row.status == value;
            },
            editMerchandise() {
                console.log(this.pageData.currentPage)
                this.$router.push({
                    path: '/manageSystem/mall/merchandise/merchandise/editMerchandise',
                    query: {
                        id: this.$route.query.id,
                        status: this.hisStatus,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                });
            },
            routerBack() {
                this.$router.push('/manageSystem/mall/merchandise/merchandise');
            },
            groupPurchaseDialog() {
                this.groupPurchaseDialogVisible = true;
            },
            handleResetGroupPurchase() {
                this.groupPurchaseFormData.startDatetime = '';
                this.groupPurchaseFormData.endDatetime = '';
                this.groupPurchaseFormData.maxCount = 0;
                this.groupPurchaseFormData.price = 0;
            },
            handleSubmitGroupPurchase() {
                const _this = this;
                this.$refs['groupPurchaseForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/mall/merchandise/groupPurchase/createGroupPurchase',
                            method: 'post',
                            data: _this.groupPurchaseFormData
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('发起团购成功');
                                _this.groupPurchaseDialogVisible = false;
                                _this.$router.push('/manageSystem/mall/merchandise/merchandise');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                })
            },
            handleCancelGroupPurchase() {
                this.groupPurchaseDialogVisible = false;
            },
            editGroupPurchase(row) {
                if(row.status === "未开始") {
                    this.editGroupPurchaseDialogVisible = true;
                    this.editGroupPurchaseFormData.groupPurchaseId = row.id;
                    this.editGroupPurchaseFormData.startDatetime = new Date(row.startDatetime);
                    this.editGroupPurchaseFormData.endDatetime = new Date(row.endDatetime);
                    this.editGroupPurchaseFormData.maxCount = row.maxCount;
                    this.editGroupPurchaseFormData.price = row.groupPrice;
                }
            },
            handleResetEditGroupPurchase() {
                this.editGroupPurchaseFormData.groupPurchaseId = '';
                this.editGroupPurchaseFormData.startDatetime = '';
                this.editGroupPurchaseFormData.endDatetime = '';
                this.editGroupPurchaseFormData.maxCount = 0;
                this.editGroupPurchaseFormData.price = 0;
            },
            handleCancelEditGroupPurchase() {
                this.editGroupPurchaseDialogVisible = false;
            },
            handleSubmitEditGroupPurchase() {
                const _this = this;
                this.$refs['editGroupPurchaseForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/mall/merchandise/groupPurchase/editGroupPurchase',
                            method: 'post',
                            data: _this.editGroupPurchaseFormData
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('编辑团购成功');
                                _this.editGroupPurchaseDialogVisible = false;
                                _this.$router.push('/manageSystem/mall/merchandise/merchandise');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                })
            },
            exportSingleOrder(id) {
                this.$http({
                    url: '/api/manageSystem/system/mall/merchandise/groupPurchase/exportSingleOrder',
                    method: 'get',
                    params: {
                        id: id
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        window.open(response.data.path);
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            exportOrder(id) {
                this.$http({
                    url: '/api/manageSystem/system/mall/merchandise/groupPurchase/exportOrder',
                    method: 'get',
                    params: {
                        id
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        window.open(response.data.path);
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            forceGroup(id, sta) {
                if(sta == '进行中') {
                    this.$http({
                        url: '/api/manageSystem/system/mall/merchandise/merchandise/forceGroup',
                        method: 'patch',
                        data: {
                            groupId: id,
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('拼团成功');
                            this.groupbuy();
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            watchQueryFun(){
                // 监测路由中的query数据变化
                if(this.$route.query.currentPage) {
                    this.pageData.currentPage = parseInt(this.$route.query.currentPage);
                } else {
                    this.pageData.currentPage = 1;
                }
                this.ajaxFun();
            },
            addZero(num) {
                if (num<10 && num>=0) {
                    num = "0" + num;
                }
                return num
            },
            formatTime(time) { 
                var date = new Date(time);
                var Y = this.addZero(date.getFullYear()) + '-';
                var M = this.addZero((date.getMonth()+1)) + '-';
                var D = this.addZero(date.getDate()) + ' ';
                var h = this.addZero(date.getHours()) + ':';
                var m = this.addZero(date.getMinutes()) + ':';
                var s = this.addZero(date.getSeconds()); 
                return Y+M+D+h+m+s;
            },   
            ajaxFun() {
                if (this.nowPage === 1) {
                    this.$http({
                        method: 'get',
                        url: '/api/manageSystem/system/mall/merchandise/merchandise/getAloneInfo',
                        params: {
                            merchandiseId: this.$route.query.id,
                            status: this.hisStatus,
                            pageNo: this.pageData.currentPage,
                            pageSize: this.pageData.pageSize
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.singleTableDataList = response.data.data.list;               
                            this.pageData.totalSize = response.data.data.total;
                            for (let i = 0; i < this.singleTableDataList.length; i++) {
                                let time = new Date(this.singleTableDataList[i].createDatetime);
                                let returnData = this.formatTime(time)
                                this.singleTableDataList[i].createDatetime = returnData; 
                            }
                            console.log(this.singleTableDataList)
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else if (this.nowPage === 2) {
                    this.$http({
                        url: '/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseInfo',
                        params: {
                            id: this.$route.query.id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.info.tableData = response.data.merchandiseInfo.tableData;
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else if (this.nowPage === 3) {
                    this.$http({
                        method: 'get',
                        url: '/api/manageSystem/system/mall/merchandise/merchandise/getTogetherInfo',
                        params: {
                            merchandiseId: this.$route.query.id,
                            status: this.hisStatus,
                            pageNo: this.pageData.currentPage,
                            pageSize: this.pageData.pageSize
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.playTableDataList = response.data.data.list;
                            
                            this.pageData.totalSize = response.data.data.total;
                            for (let i = 0; i < this.playTableDataList.length; i++) {
                                let time = new Date(this.playTableDataList[i].createDatetime);
                                let returnData = this.formatTime(time)
                                this.playTableDataList[i].createDatetime = returnData; 

                                let timeOver = new Date(this.playTableDataList[i].completeDatetime);
                                let returnDataOver = this.formatTime(timeOver)
                                this.playTableDataList[i].completeDatetime = returnDataOver; 
                            }
                            console.log(this.playTableDataList)
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
                
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){

                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise/merchandiseInfo',
                        query: {
                            id: this.$route.query.id,
                        }
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/merchandise/merchandiseInfo',
                        query: {
                            id: this.$route.query.id,
                            currentPage: 1,
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/mall/merchandise/merchandise/merchandiseInfo',
                    query: {
                        id: this.$route.query.id,
                        currentPage: currentPage
                    }
                });
            },
        },
        mounted() {
            this.bg.groupbg = false;
            this.bg.playbg = false;
            this.watchQueryFun(this.nowPage);
            this.$http({
                url: '/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.merchandiseInfo;
                    if(this.info.spelled == 1) {
                        this.goodGroupMes.count = this.info.lumpCount;
                        this.goodGroupMes.prise = this.info.spellPrice;
                        this.goodGroupMes.date = this.info.validDate;
                    }
                }
            }).catch((response) => {
                console.log(response);
            });

        },
        watch: {
            '$route.query.currentPage': function(){
                this.watchQueryFun();
            }
        }
    }
</script>