<style lang="less" scoped>
    .editMyMessage{
        background: #f5f5f5; font-size:.3rem;height: 100%;
        &-title{height: .3rem;background: #f5f5f5}
        &-myPhoto,&-name{ height: .96rem; padding: 0 .3rem; border-top: 1px solid #cccccc;display: flex;align-items: center;font-size: .3rem; background: #ffffff;
            p{padding-right: .4rem}
        }
        &-myPhoto{
            justify-content: space-between;
            >div{ display: flex; align-items: center; 
                input{position: absolute; right: .2;top: .5rem;z-index: 2;width: 1rem; height: .6rem; opacity: 0;border-radius: 50%;}
            }
            img{ height: .24rem; }
            
            &-pic{
                width: .6rem; height: .6rem; overflow: hidden; border-radius: 50%;position: relative; border:1px solid black;margin-right:.3rem;
                img{position: absolute; width: .6rem; height: .6rem; left: 0; top: 0;}
            }
        }
        ul{
            li{
                height: .96rem; padding: 0 .3rem; border-top: 1px solid #cccccc;display: flex;align-items: center;justify-content: space-between;background: #ffffff;
                p{ font-size: .3rem; color: #333333; width: 1.7rem }
            }
            li:last-of-type{ border-bottom: 1px solid #cccccc; }
        }
         &-rightPic{
            height: .24rem;
            img{ height: .24rem;}
        }
        &-birth,&-call{ width: 5rem; }
        &-sex{width: 5.2rem;position: relative;
           select{ width: 100%;position: absolute;left: 0; font-size: .3rem; top: -.1rem}
           img{float: right;}
        }
        &-button{ margin: .3rem;}
    }
</style>
<template>
    <div class="editMyMessage">
        <div class="editMyMessage-myPhoto">
            <p>头像 :</p>
            <div>
                <input type="file" ref='myPic'  @change='showMyPhoto()'>
                <div class="editMyMessage-myPhoto-pic">
                    
                    <img :src="mySrc" alt="">
                </div>
                <img src="../../../img/index_service_commonTelephone.png" alt="">
            </div>
        </div>
        <div class="editMyMessage-name">
            <p>真实姓名 :</p>
            <span>{{myMessageName}}</span>
        </div>
        <ul>
            <li @click = "editCallPhone">
                <p>手机号码 :</p>
                <div class="editMyMessage-call">{{myMessageCall}}</div>
                <div class="editMyMessage-rightPic"><img src="../../../img/index_service_commonTelephone.png" alt=""></div>
            </li>
            <li>
                <p>性别 :</p>
                <div class="editMyMessage-sex">
                    <select name="" id="" v-model="formData.mySex">
                        <option v-for="n in mySex" :key='n' :value="n.in">{{n.out}}</option>
                    </select>
                    <div class="editMyMessage-rightPic"><img src="../../../img/index_service_commonTelephone.png" alt=""></div>
                </div>
                
            </li>
            <li @click = "setDate2">
                <p>出生日期 :</p>
                <div class="editMyMessage-birth">
                    <span>{{formData.birthday}}</span>
                </div>
                <div class="editMyMessage-rightPic"><img src="../../../img/index_service_commonTelephone.png" alt=""></div>
            </li>
        </ul>
        <zdButton class="editMyMessage-button" @click="editMyMessage" :disabled="editMyMessageButton">{{editMyMessageSubmit}}</zdButton>   
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import { transition } from 'publicSource/dateTransition';
    
    export default {
        components: {
            zdButton
        },
        data() {
            return {
                formData: { photo: '', mySex: '', birthday: '', defaultParkId: '',},
                myMessageName: '',
                myMessageCall: '',
                mySrc: '',
                mySex: [
                    {
                        in:1,
                        out:'男',
                    },
                    {
                        in:2,
                        out:'女',
                    },
                    {
                        in:3,
                        out:'保密',
                    }
                ],
                editMyMessageButton: false,
                uploadType: 1,
                editMyMessageSubmit: '提交信息',
            }
        },
        computed: {
            info() {
                return this.$store.state.info;
            }
        },
        methods: {
            editCallPhone(){
                this.$router.push('/person/editMyMessage/changePhoneCall');
            },
            editMyMessage(){
                let _this = this;
                this.$http({
                        url: '/api/system/personalCenter/editPersonalInfo',
                        method: 'PATCH',
                        data: {
                            "parkId" : _this.formData.defaultParkId,
                            "sex": _this.formData.mySex,
                            "birthday": _this.formData.birthday,
                            "avatar": _this.formData.photo   
                        },  
                    }).then((response) => {
                        if (response.data.code ==='00000') {
                            _this.$message('编辑成功');
                            _this.$store.commit('editPersonalInfo',{
                                avatar : response.data.avatar, 
                                realAvatar: _this.formData.photo,
                                sex : _this.formData.mySex,
                                birthday : _this.formData.birthday
                            })
                            _this.$router.push('/index/person');
                        }
                        
                    })
            },
            showMyPhoto(){
                var _this = this;
                var thisFile = this.$refs.myPic;
                var file = thisFile.files[0];
                let reader = new FileReader();
                reader.onloadend = function(e){
                    _this.mySrc = e.target.result;
                    const formData = new FormData();
                    formData.append('file',file);
                    formData.append('uploadType', _this.uploadType);
                    _this.$http({
                        url: '/v1/file',
                        method: 'post',
                        data: formData,
                        onUploadProgress(e) {
                            _this.editMyMessageButton = true;
                            _this.editMyMessageSubmit = '正在上传头像';
                        }   
                    }).then((response) => {
                        if (response.data.code === 10000 && response.data.returnData.subCode === 10000) {
                            _this.formData.photo = response.data.returnData.data.filePath;
                        }
                        _this.editMyMessageButton = false;
                        thisFile.value = '';
                        _this.editMyMessageSubmit = '提交信息';
                    })
                }
                reader.readAsDataURL(file);
           },
           setDate2 (){
                var _this = this;
                const endTime = (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate())
                this.$calendar.show({
                    year: [1925,2050],  //年份的范围,如果初始化的年份不在这个范围，会自动选最小的年份
                    // endTime: '2020-2-12',  //终止的日期，这个要在year的范围里面，不然没用
                    endTime,
                    date: _this.formData.birthday,  //初始化的日期
                    onOk: (date) => {
                        _this.formData.birthday = date;
                    },
                    onCancel: () => {
                        console.log('关闭')
                    }
                });
            },
        },
        mounted () {
            this.myMessageName = this.info.userName;
            this.myMessageCall = this.info.cellphone;
            this.formData.birthday = this.info.birthday;
            this.mySrc = this.info.avatar;
            this.formData.photo = this.info.realAvatar;
            this.formData.mySex = this.info.sex;
            this.formData.defaultParkId = this.info.defaultParkId;
        }
    }
</script>