<template>
    <div v-title="'生活缴费'">
        <div style="margin-bottom:70px;">
            <div class="flex-ll black fsize15 title">
                <div><span :class='{activity_show: changeShowType =="property"}' @click="changeShowType='property'">物业费</span></div>
                <div><span :class='{activity_show: changeShowType =="water"}' @click="changeShowType='water'">水电费</span></div>
            </div>
            <div class="hr"></div>
            <!--<transition name="fade-choose">
                <section v-show="changeShowType =='property'" class="">
                    <div class="fsize15">
                        <div class="part_title flex-ll section" style="height:44px;line-height:44px;">
                            <div class="icon" src=""></div>
                            <div class="mleft10 fsize18">2018冬季</div>
                        </div>
                        <div class="hr-one"></div>
                        <div class="part-content">
                            <div class="flex-ll mtop15 section">
                                <div class="icon" src=""></div>
                                <div class="mleft10 fsize15">月份</div>
                                <div class="mleft10 red">（未缴纳）</div>
                            </div>
                            <div class="mleft18">
                                <div class="mtop10">物业管理费：100.00元</div>
                                <div class="mtop10">车位管理费：100.00元</div>
                                <div class="mtop10">公共能耗费：100.00元</div>
                                <div class="hr-one mtop15"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </transition>
            <transition name="fade-choose">
                <section v-show="changeShowType =='water'" class="">
                    <div class="money fsize15 t-align-c white">预存金额：5000.00元</div>
                </section>
            </transition>-->
            <el-collapse style="font-size:15px;">
                <div v-for="(item , index) in newList" :key="index">
                    <div v-if="item.type==2||item.type==3">
                        <el-collapse-item class="" :name="index">
                            <template slot="title">
                                <i class="el-icon-circle-check-outline mleft" @click.stop="bindChoose"></i>
                                <span>{{item.year}}</span>
                            </template>
                            <el-collapse>
                                <div v-for="(item1 , index1) in item.content.part" :key="index1">
                                    <el-collapse-item class="" :name="index1">
                                        <template slot="title">
                                            <i class="el-icon-circle-check-outline mleft" @click.stop="bindChoose"></i>
                                            <span v-if="item.type==2">{{item.year}}{{index1==0?'下半年':'上半年'}}</span>
                                            <span v-if="item.type==3">{{item.year}}{{ index1 === 0 ? '冬季' : index1 ===
                                                1 ? '秋季' : index===2 ? '夏季' : '春季' }}</span>
                                        </template>
                                        <div v-for="(item2,index2) in item1.part" :key="index2">
                                            <div class="part-content">
                                                <div class="flex-ll mtop15 section" style="margin-left:15px;">
                                                    <!--<div class="icon" src=""></div>-->
                                                    <div v-if="index1==0">
                                                        <div class="mleft10 fsize15">{{12-index2}}月份</div>
                                                    </div>
                                                    <div v-else>
                                                        <div class="mleft10 fsize15">{{6-index2}}月份</div>
                                                    </div>
                                                    <div class="mleft10 red">（未缴纳）</div>
                                                </div>
                                                <div class="mleft18">
                                                    <div class="mtop10"><span>{{changeShowType=='property'?'物业管理费':'水费'}}：</span>{{item2.wuye}}元</div>
                                                    <div class="mtop10"><span>{{changeShowType=='property'?'车位管理费':'水费'}}：</span>{{item2.car}}元</div>
                                                    <div class="mtop10"><span>{{changeShowType=='property'?'公共能耗费':'空调费'}}：</span>{{item2.public}}元</div>
                                                    <div class="hr-one mtop15"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-item>
                                </div>
                            </el-collapse>
                        </el-collapse-item>
                    </div>
                    <div v-else>
                        <el-collapse-item class="" :name="index">
                            <template slot="title">
                                <i class="el-icon-circle-check-outline mleft" @click.stop="bindChoose"></i>
                                <span>{{item.year}}</span>
                            </template>
                            <div class="hr-one"></div>
                            <div v-for="(val ,valindex ) in item.content" :key="valindex">
                                <div class="part-content">
                                    <div class="flex-ll mtop15 section">
                                        <img v-if="item.type==4&&val.costType==1" class="icon" :src="val.checkstatus===0?'../img/unchecked.png':'../img/checked.png'" />
                                        <div class="mleft10 fsize15">{{12-valindex}}月份</div>
                                        <div class="mleft10" :class="val.costType==1?'red':'green'">（{{val.costType==1?'未缴纳':'已缴纳'}}）</div>
                                    </div>
                                    <div class="mleft18">
                                        <div class="mtop10"><span>{{changeShowType=='property'?'物业管理费':'水费'}}：</span>{{val.wuye}}元</div>
                                        <div class="mtop10"><span>{{changeShowType=='property'?'车位管理费':'水费'}}：</span>{{val.car}}元</div>
                                        <div class="mtop10"><span>{{changeShowType=='property'?'公共能耗费':'空调费'}}：</span>{{val.public}}元</div>
                                        <div class="hr-one mtop15"></div>
                                    </div>

                                </div>
                            </div>
                        </el-collapse-item>
                    </div>
                </div>
            </el-collapse>
        </div>
        <div class="bottom flex-lr section fsize15">
            <div class="flex-ll">
                <div class="icon" src=""></div>
                <div class="mleft10">全选</div>
            </div>
            <div class="flex-rr">
                <div>合计:<span></span></div>
                <button class="btn white">确认支付</button>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    function partTwo(arr, type, limit) {
        /*
        var brr1=[];
        var brr2=[];
        for(var i=0;i<arr.length/2;i++){
            brr1[i]=arr[i];
            brr2[i]=arr[i+arr.length/2];
        }
        console.log('brr1:',brr1); 
        console.log('brr2',brr2); 
        return {
            brr1,brr2
        }*/
        let brr = []
        let arrLen = arr.length
        let num = 0
        let num_max = 0
        for (var i = 0; i < type; i++) {
            num_max += limit;
            brr[i] = arr.slice(num, num_max);
            num += limit;
        }
        return brr;
    }
    export default {
        data() {
            return {
                changeShowType: 'property',
                activeNames: [''],
                newList: [],
                zdlist: {
                    "payType": 2,
                    "bills": {
                        '2015': [{
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101", //房屋名称
                                "roomProperty": "公寓", //房屋性质
                                "houseHolder": "李路安", //户主
                                "mobile": "12345678900", //电话
                                "billYear": "2018", //账单年份
                                "billMonth": "2", //账单月份
                                "billDate": 1517414400000, //账单日期
                                "cost": 200, //费用
                                "costType": 2 //1  未缴  2已缴
                            }, {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            }, {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ],
                        '2016': [{
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            }, {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1 //1未缴   2已缴
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            }, {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ],
                        "2017": [{
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            }
                        ],
                        '2018': [{
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            }, {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1 //1未缴   2已缴
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            }, {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ]
                    }
                }
            }
        },
        computed: {

        },
        methods: {
            changeShowType: function (value) {
                this.changeShowType = value
                if (value == 'property') {
                    this.list = this.prolist
                } else {
                    this.list = this.waterlist
                }
            },
            /*partTwo:function(arr){
                var brr1=[];
                var brr2=[];
                for(var i=0;i<arr.length/2;i++){
                    brr1[i]=arr[i];
                    brr2[i]=arr[i+arr.length/2];
                }
                console.log('brr1:',brr1); 
                console.log('brr2',brr2); 
                //this.newList.content.part[0].part = brr1
                //this.newList.content.part[1].part = brr2
            },*/
            bindChoose: function () {

            }
        },
        watch: {

        },
        mounted() {
            let zdlist = this.zdlist;
            let yearList = [];
            for (var i in zdlist.bills) {
                yearList.push({
                    //type:zdlist.payType ,   //1年缴   2半年缴  3季度缴   4月份缴
                    type: i == '2018' ? '2' : i == '2017' ? '3' : i == '2016' ? '4' : '1',
                    year: i + '年',
                    content: zdlist.bills[i]
                });
            }
            let newList = [];
            let that = this;
            yearList.map(function (r, n) {
                let returnList = [];
                if (r.type == 2) { //半年
                    returnList = partTwo(r.content, 2, 6);
                } else if (r.type == 3) { //季度
                    returnList = partTwo(r.content, 4, 3);
                }
                if (r.type == 2 || r.type == 3) {
                    newList.push({
                        type: r.type,
                        year: r.year,
                        content: {
                            part: []
                        }
                    });
                    returnList.map(function (x, y) {
                        newList[n].content.part.push({
                            part: x
                        });
                    });
                } else {
                    r.content.map(function (v, t) {
                        v.checkstatus = 0
                    });
                    newList.push({
                        type: r.type,
                        year: r.year,
                        content: r.content
                    });
                }
            })
            this.newList = newList;
        }
    }
</script>
<style>
    /*水平方向左右分布*/
    .flex-lr {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        -webkit-flex-direction: row;
    }
    .flex-ll {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        -webkit-flex-direction: row;
    }
    .flex-rr {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
        -webkit-flex-direction: row;
    }
    /*垂直方向居中分布*/
    .flex-vc {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        -webkit-flex-direction: column;
    }
    /*垂直方向居左分布*/
    .flex-vl {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        align-items: left;
        flex-direction: column;
        -webkit-flex-direction: column;
    }
    /*水平方向居中分布*/
    .flex-cc {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        -webkit-flex-direction: row;
    }
    /*基准线对齐*/
    .flex-bc {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: baseline;
        flex-direction: row;
        -webkit-flex-direction: row;
    }
    /*流式布局*/
    .flex-auto {
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        align-content: flex-start;
        flex-flow: wrap;
    }
    .black {
        color: #333;
    }
    .gray {
        color: #666;
    }
    .white {
        color: #fff;
    }
    .red {
        color: #ff4c4c;
    }
    .green {
        color: #00cb65;
    }
    .fsize15 {
        font-size: 15px;
    }
    .fsize18 {
        font-size: 18px;
    }
    .section {
        width: 92%;
        padding-left: 4%;
        padding-right: 4%;
    }
    .t-align-c {
        text-align: center;
    }
    .title div {
        width: 50%;
        text-align: center;
    }
    .title div span {
        border-bottom: 1px solid #fff;
        height: 50px;
        line-height: 50px;
        display: inline-block;
        opacity: 0.5;
    }
    .title div .activity_show {
        opacity: 1;
        border-color: #333;
    }
    .money {
        height: 36px;
        line-height: 36px;
        background-color: #FFAC33;
    }
    .hr {
        height: 10px;
        background-color: #f0f0f0;
        width: 100%;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
    }
    .hr-one {
        height: 1px;
        background-color: #e0e0e0;
        width: 100%;
    }
    .icon {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid #333;
    }
    .mleft {
        margin-left: 4%;
    }
    .mleft10 {
        margin-left: 10px;
    }
    .mtop10 {
        margin-top: 10px;
    }
    .mtop15 {
        margin-top: 15px;
    }
    .mbottom10 {
        margin-bottom: 10px;
    }
    .mbottom15 {
        margin-bottom: 15px;
    }
    .mleft18 {
        margin-left: 10.67%
    }
    .bottom {
        position: fixed;
        z-index: 100;
        bottom: 0px;
        height: 58px;
        width: 100%;
        line-height: 60px;
        border-top: 1px solid #ccc;
        background: #fff;
    }
    .btn {
        height: .38277512rem;
        background-color: #ff4c4c;
        width: 96px;
        text-align: center;
        border-radius: 10px;
    }
    .el-icon-arrow-right:before {
        content: "" !important;
    }
    .el-collapse-item__header {
        font-size: 18px !important;
        color: #333 !important;
        height: 44px !important;
        line-height: 44px !important;
    }
    .el-collapse-item {
        width: 100%;
    }
</style>
