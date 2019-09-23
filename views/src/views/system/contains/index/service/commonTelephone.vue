<style lang="less" scoped>
    .commonTelephone{ width: 100%; height: 100%;
        div:first-of-type li:last-of-type{
            border-bottom:none;
        }
        >div:first-of-type{
            border-top: none;
        }
        >div{
            border-top:.2rem solid #f5f5f5;
        }
        &-managerCall{
            &-title{
               font-size: .24rem; color: #999999; padding: .15rem 0;border-bottom: 1px solid #eee; padding-left: .3rem;
            }     
        }       
        &-manager{ padding: 0 0 0 .3rem;
            li{
                padding: .2rem 0; border-bottom: 1px solid #eee;
                a{
                    display: flex; align-items: center; justify-content: space-between; padding-right: .3rem;
                   div:nth-of-type(1){
                        
                        p:nth-of-type(1){
                            font-size:.28rem; padding-bottom: .15rem; line-height: 1;
                        }
                        p:nth-of-type(2){
                            font-size:.24rem; color: #666666;
                        }
                    }
                    div:nth-of-type(2){
                        height: .24rem;
                        img{
                            height: .24rem;
                        }
                    } 
                }   
            }
        }
    }
</style>
<template>
    <div class="commonTelephone" v-title="'常用电话'">
        <div class="commonTelephone-managerCall" v-for="item in frequentlyPhoneList" :key='item'>
            <div class="commonTelephone-managerCall-title">{{item.groupName}}</div>  
            <ul class="commonTelephone-manager">
                <li v-for="n in item.contactList" :key='n'>  
                    <a :href="'tel:'+n.cellphone">
                        <div class="commonTelephone-managerCall-left">
                            <p>{{n.contactName}}</p>
                            <p>{{n.cellphone}}</p>
                        </div>
                        <div class="commonTelephone-managerCall-right">
                            <img src="../../../img/index_service_commonTelephone.png" alt="">
                        </div>
                    </a>
                </li>
            </ul>
        </div>     
    </div>
</template>
<script lang="babel">

    export default {
        components: {
            
        },
        data() {
            return {
                frequentlyPhoneList:[
                    {
                        groupName:'',
                        contactList:[
                            {
                                contactName:'',
                                cellphone:''
                            }
                        ]
                    }
                ],
            }
        },
        computed: {
            info() {
                return this.$store.state.info;
            }
        },
        methods: {
          
        },
        mounted() {
            if (this.isVisitor === true) {
                alert("本功能只对业主开放，请到“个人中心”完善信息");
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/service/frequentlyPhone/getFrequentlyPhoneList',
                    params: {
                        parkId: this.info.defaultParkId
                    }
                }).then((response) => {
                    this.frequentlyPhoneList = response.data.frequentlyPhoneList;
                    // console.log(response.data.frequentlyPhoneList)
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>