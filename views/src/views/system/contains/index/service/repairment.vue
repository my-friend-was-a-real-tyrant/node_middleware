<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .repairment{ width: 100%; height: 100%; background-color: #f5f5f5;
        &-personal{
            &-tips{ height: .5rem; padding: 0 .3rem; background-color: #fff; font-size: .22rem; color: #ff4c4c; line-height: .5rem;}
        }
        &-area{ display: flex; justify-content: space-between; align-items: center; height: .96rem; margin: .3rem 0; padding: 0 .3rem; border-top: @border; border-bottom: @border; background-color: #fff; font-size: .28rem; color: #333;
            span{ flex-shrink: 0;}
            pre{ flex-shrink: 0; text-align: right;}
            input{ flex-grow: 1; border: 0 none; outline: 0 none; font-size: .28rem; color: #333; text-align: right;}
        }
        &-content{ margin-bottom: .3rem; padding: .3rem; border-top: @border; border-bottom: @border; background-color: #fff; font-size: 0;
            textarea{ width: 100%; min-height: 1.5rem; border: 0 none; outline: 0 none; font-size: .28rem; color: #333;}
        }
        &-info{ margin-bottom: .3rem; border-top: @border; background-color: #fff;
            li{ display: flex; align-items: center; height: .96rem; padding: 0 .3rem; border-bottom: @border;
                span{ flex-shrink: 0; width: 1.7rem; font-size: .28rem; color: #333;}
                input{ flex-grow: 1; border: 0 none; outline: 0 none; font-size: .28rem; color: #333;}
            }
        }
        &-button{ display: block; margin: 0 auto;}
    }
    .bestTime{
        &-wrapper{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .3);
            &-disabled{ display: none;}
        }
        &-box{ position: absolute; bottom: 0; left: 0; width: 100%; padding: .3rem; background-color: #fff; line-height: 0;
            &-week{ display: flex; justify-content: space-between; align-items: center; height: .72rem; margin-bottom: .2rem;
                &-item{ height: .72rem; width: 1.42rem; border: 1px solid #999; border-radius: .1rem; color: #333; font-size: .28rem; line-height: .72rem; text-align: center;
                    &-checked{ border-color: #e9bf6d; color: #e9bf6d;}
                }
            }
            &-time{ display: flex; justify-content: space-between; align-items: center; padding: .3rem 0; border-top: 1px solid #ccc; font-size: .28rem;
                &-item{ height: .72rem; width: 1rem; border: 1px solid #999; border-radius: .1rem; color: #333; font-size: .28rem; line-height: .72rem; text-align: center;}
            }
        }
    }
</style>
<template>
    <div class="repairment" v-title="'维修服务'">
        <zdTabs @changeTabName="changeTabName">
            <zdTabsView
                label="居家报修"
                name="001"
            >
                <p class="repairment-personal-tips">
                    <span>注意：居家报修可能产生一些维修费用</span>
                </p>
                <div class="repairment-area">
                    <span>报修房号</span>
                    <span>{{ info.defaultAddressName }}</span>
                </div>
                <div class="repairment-area">
                    <span>最佳上门时间</span>
                    <pre @click="handleBestTimeShow">{{ personalFormData.bestTime }}</pre>
                </div>
                <div class="repairment-content">
                    <textarea placeholder="请输入您的内容"
                        v-model.trim="personalFormData.repairmentContent"
                    ></textarea>
                    <zdUpload
                        ref="personalRepairUpload"
                        v-model="personalFormData.repairmentImgUrl"
                        uploadId="img-01"
                        uploadType="1"
                        uploadFileType="1"
                        :maxLength="6"
                        annotation="最多6张"
                    ></zdUpload>
                </div>
                <!-- <ul class="repairment-info">
                    <li>
                        <span>最佳上门日期</span>
                        <input type="text" placeholder="请选择最佳上门日期" v-model.trim="personalFormData.bestDate" disabled
                            @click="" />
                    </li>
                    <li>
                        <span>最佳上门时间</span>
                        <el-time-picker
                            is-range
                            placeholder="选择时间范围"
                            v-model="personalFormData.bestTime">
                        </el-time-picker>
                    </li>
                </ul> -->
                <ul class="repairment-info">
                    <li>
                        <span>姓名</span>
                        <input type="text" placeholder="请输入您的姓名" v-model.trim="personalFormData.name" />
                    </li>
                    <li>
                        <span>手机号</span>
                        <input type="text" placeholder="请输入您的手机号" v-model.trim="personalFormData.cellphone" />
                    </li>
                </ul>
                <zdButton class="repairment-button" @click="handleSubmitPersonalRepairment" :disabled="personalRepairButton">提交信息</zdButton>
            </zdTabsView>
            <zdTabsView
                label="公共报修"
                name="002"
            >
                <div class="repairment-area">
                    <span>报修区域</span>
                    <input type="text" placeholder="请填写报修区域" v-model.trim="commonFormData.repairmentArea" />
                </div>
                <div class="repairment-content">
                    <textarea placeholder="请输入您的内容"
                        v-model.trim="commonFormData.repairmentContent"
                    ></textarea>
                    <zdUpload
                        ref="commonRepairUpload"
                        v-model="commonFormData.repairmentImgUrl"
                        uploadId="img-02"
                        uploadType="1"
                        uploadFileType="1"
                        annotation="最多6张"
                        :maxLength="9"
                    ></zdUpload>
                </div>
                <ul class="repairment-info">
                    <li>
                        <span>姓名</span>
                        <input type="text" placeholder="请输入您的姓名" v-model.trim="commonFormData.name" />
                    </li>
                    <li>
                        <span>手机号</span>
                        <input type="text" placeholder="请输入您的手机号" v-model.trim="commonFormData.cellphone" />
                    </li>
                </ul>
                <zdButton class="repairment-button" @click="handleSubmitCommonRepairment" :disabled="commonRepairButton">提交信息</zdButton>
            </zdTabsView>
        </zdTabs>
        <div class="bestTime-wrapper" :class="{'bestTime-wrapper-disabled': bestTimeWrapper}">
            <div class="bestTime-box">
                <div class="bestTime-box-week">
                    <div class="bestTime-box-week-item" 
                        :class="{'bestTime-box-week-item-checked': bestTimeWeek.status}"
                        v-for="(bestTimeWeek, i) in bestTimeWeekList_01" 
                        :key="bestTimeWeek.id"
                        @click="handleBestDay_01(i)">{{ bestTimeWeek.name }}</div>
                </div>
                <div class="bestTime-box-week">
                    <div class="bestTime-box-week-item" 
                        :class="{'bestTime-box-week-item-checked': bestTimeWeek.status}"
                        v-for="(bestTimeWeek, i) in bestTimeWeekList_02" 
                        :key="bestTimeWeek.id"
                        @click="handleBestDay_02(i)">{{ bestTimeWeek.name }}</div>
                </div>
                <div class="bestTime-box-time">
                    <div class="bestTime-box-time-item">
                        <select v-model="bestTimeStartHour">
                            <option v-for="hour in bestTimeHourList" :key="hour">{{ hour }}</option>
                        </select>
                    </div>
                    <span>:</span>
                    <div class="bestTime-box-time-item">
                        <select v-model="bestTimeStartMinute">
                            <option v-for="minute in bestTimeMinuteList" :key="minute">{{ minute }}</option>
                        </select>
                    </div>
                    <span>至</span>
                    <div class="bestTime-box-time-item">
                        <select v-model="bestTimeEndHour">
                            <option v-for="hour in bestTimeHourList" :key="hour">{{ hour }}</option>
                        </select>
                    </div>
                    <span>:</span>
                    <div class="bestTime-box-time-item">
                        <select v-model="bestTimeEndMinute">
                            <option v-for="minute in bestTimeMinuteList" :key="minute">{{ minute }}</option>
                        </select>
                    </div>
                </div>
                <zdButton size="large" @click="handleChooseBestTime">确定</zdButton>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import zdTabs from 'publicComponents/tabs/tabs';
    import zdTabsView from 'publicComponents/tabs/tabsView';
    import zdUpload from 'publicComponents/upload/upload';
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdTabs,
            zdTabsView,
            zdUpload,
            zdButton
        },
        data() {
            return {
                bestTimeWrapper: true,
                bestTimeWeekList_01: [{
                    id: 2,
                    name: '周一',
                    status: true
                }, {
                    id: 3,
                    name: '周二',
                    status: false
                }, {
                    id: 4,
                    name: '周三',
                    status: false
                }],
                bestTimeWeekList_02: [{
                    id: 5,
                    name: '周四',
                    status: false
                }, {
                    id: 6,
                    name: '周五',
                    status: false
                }, {
                    id: 7,
                    name: '周六',
                    status: false
                }, {
                    id: 8,
                    name: '周日',
                    status: false
                }],
                bestTimeHourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                bestTimeMinuteList: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
                bestTimeStartHour: '00',
                bestTimeStartMinute: '00',
                bestTimeEndHour: '23',
                bestTimeEndMinute: '55',
                personalFormData: {
                    roomId: '',
                    repairmentArea: '',
                    repairmentContent: '',
                    repairmentImgUrl: [],
                    bestTime: '点击选择时间',
                    name: '',
                    cellphone: ''
                },
                commonFormData: {
                    roomId: '',
                    repairmentArea: '',
                    repairmentContent: '',
                    repairmentImgUrl: [],
                    name: '',
                    cellphone: ''
                },
                personalRepairButton: false,
                commonRepairButton: false
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            info() {
                return this.$store.state.info;
            },
            personalFormValidate() {
                if (this.personalFormData.repairmentContent === '' || this.personalFormData.bestTime === '点击选择时间' || this.personalFormData.name === '' || this.personalFormData.cellphone === '') {
                    return '请将表单填写完整';
                } else {
                    const cellphoneReg = /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/;
                    if (cellphoneReg.test(this.personalFormData.cellphone) === false) {
                        return '请填写正确的手机号';
                    }
                }
                return true;
            },
            commonFormValidate() {
                if (this.commonFormData.repairmentArea === '' || this.commonFormData.repairmentContent === '' || this.commonFormData.name === '' || this.commonFormData.cellphone === '') {
                    return '请将表单填写完整';
                } else {
                    const cellphoneReg = /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/;
                    if (cellphoneReg.test(this.commonFormData.cellphone) === false) {
                        return '请填写正确的手机号';
                    }
                }
                return true;
            }
        },
        methods: {
            changeTabName(name) {
                this.$router.replace('/service/repairment/tab/' + name);
            },
            handleBestTimeShow() {
                this.bestTimeWrapper = false;
            },
            handleBestDay_01(index) {
                if (this.bestTimeWeekList_01[index].status) {
                    for (let i = 0; i < this.bestTimeWeekList_01.length; i ++) {
                        if (i === index) {
                            continue;
                        }
                        if (this.bestTimeWeekList_01[i].status) {
                            break;
                        }
                        if (i === this.bestTimeWeekList_01.length - 1) {
                            for (let j = 0; j < this.bestTimeWeekList_02.length; j ++) {
                                if (this.bestTimeWeekList_02[j].status) {
                                    break;
                                }
                                if (j === this.bestTimeWeekList_02.length - 1) {
                                    alert('请至少选择一个日期');
                                    return;
                                }
                            }
                        }
                    }
                }
                this.bestTimeWeekList_01[index].status = !this.bestTimeWeekList_01[index].status;
            },
            handleBestDay_02(index) {
                if (this.bestTimeWeekList_02[index].status) {
                    for (let i = 0; i < this.bestTimeWeekList_02.length; i ++) {
                        if (i === index) {
                            continue;
                        }
                        if (this.bestTimeWeekList_02[i].status) {
                            break;
                        }
                        if (i === this.bestTimeWeekList_02.length - 1) {
                            for (let j = 0; j < this.bestTimeWeekList_01.length; j ++) {
                                if (this.bestTimeWeekList_01[j].status) {
                                    break;
                                }
                                if (j === this.bestTimeWeekList_01.length - 1) {
                                    alert('请至少选择一个日期');
                                    return;
                                }
                            }
                        }
                    }
                }
                this.bestTimeWeekList_02[index].status = !this.bestTimeWeekList_02[index].status;
            },
            handleChooseBestTime() {
                let bestWord = '';
                for (let i = 0; i < this.bestTimeWeekList_01.length; i ++) {
                    if (this.bestTimeWeekList_01[i].status) {
                        bestWord += this.bestTimeWeekList_01[i].name;
                        bestWord += ','
                    }
                }
                for (let i = 0; i < this.bestTimeWeekList_02.length; i ++) {
                    if (this.bestTimeWeekList_02[i].status) {
                        bestWord += this.bestTimeWeekList_02[i].name;
                        bestWord += ','
                    }
                }
                bestWord += '\n';
                bestWord += this.bestTimeStartHour + ':' + this.bestTimeStartMinute;
                bestWord += '至';
                bestWord += this.bestTimeEndHour + ':' + this.bestTimeEndMinute;
                this.personalFormData.bestTime = bestWord;
                this.bestTimeWrapper = true;
            },
            handleSubmitPersonalRepairment() {
                if (this.personalFormValidate === true) {
                    this.$http({
                        url: '/api/system/service/repairment/personalRepair',
                        method: 'post',
                        data: {
                            parkId: this.info.defaultParkId,
                            roomId: this.personalFormData.roomId,
                            repairmentArea: this.info.defaultAddressName,
                            repairmentContent: this.personalFormData.repairmentContent,
                            repairmentImgUrl: this.personalFormData.repairmentImgUrl,
                            bestTime: this.personalFormData.bestTime,
                            name: this.personalFormData.name,
                            cellphone: this.personalFormData.cellphone
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('提交成功');
                            this.$router.replace('/person/myRepairment');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else {
                    alert(this.personalFormValidate);
                }
            },
            handleSubmitCommonRepairment() {
                if (this.commonFormValidate === true) {
                    this.$http({
                        url: '/api/system/service/repairment/commonRepair',
                        method: 'post',
                        data: {
                            parkId: this.info.defaultParkId,
                            roomId: this.commonFormData.roomId,
                            repairmentArea: this.commonFormData.repairmentArea,
                            repairmentContent: this.commonFormData.repairmentContent,
                            repairmentImgUrl: this.commonFormData.repairmentImgUrl,
                            name: this.commonFormData.name,
                            cellphone: this.commonFormData.cellphone
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('提交成功');
                            this.$router.replace('/person/myRepairment');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else {
                    alert(this.commonFormValidate);
                }
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                alert("本功能只对业主开放，请到“个人中心”完善信息");
                this.$router.replace('/index/visitorPerson');
            } else {
                this.personalFormData.roomId = this.info.defaultAddressId;
                this.personalFormData.name = this.info.userName;
                this.personalFormData.cellphone = this.info.cellphone;
                // 手机号
                this.commonFormData.roomId = this.info.defaultAddressId;
                this.commonFormData.name = this.info.userName;
                this.commonFormData.cellphone = this.info.cellphone;

                this.$watch('$refs.personalRepairUpload.onProgressCount', (newVal, oldVal) => {
                    if (newVal === 0) {
                        this.personalRepairButton = false;
                    } else {
                        this.personalRepairButton = true;
                    }
                });
                this.$watch('$refs.commonRepairUpload.onProgressCount', (newVal, oldVal) => {
                    if (newVal === 0) {
                        this.commonRepairButton = false;
                    } else {
                        this.commonRepairButton = true;
                    }
                });
            }
        }
    }
</script>