<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .complaintInfo{ width: 100%; height: 100%; padding: .3rem; background-color: #fff;
        &-title{ font-size: .36rem; color: #333; text-align: center;}
        &-date{ font-size: .24rem; color: #999; line-height: 3; text-align: center;}
        img{ width: 6.6rem;}
        &-description{ font-size: .28rem; color: #333; word-wrap:break-word}
        &-info{ margin-top: .3rem; margin-bottom: .3rem; background-color: #fff;
            &-item{ display: flex; justify-content: space-between; padding: .3rem 0; border-top: @border; font-size: .28rem;
                &-title{ flex-shrink: 0; width: 1.5rem; color: #333;}
                &-status{ flex-shrink: 0; width: 1.5rem; color: #ff4208;}
                &-content{ flex-grow: 1; color: #666; text-align: right; overflow: hidden; word-wrap: break-word;}
                &:last-child{ border-bottom: @border;}
            }
        }
    }
</style>
<template>
    <div class="complaintInfo" v-title="'表扬投诉'">
        <div class="complaintInfo-title">{{ title }}</div>
        <div class="complaintInfo-date">{{ date }}</div>
        <img :src="img" v-if="img !== ''" />
        <pre class="complaintInfo-description">{{ description }}</pre>
        <ul class="complaintInfo-info">
            <li class="complaintInfo-info-item">
                <span class="complaintInfo-info-item-title complaintInfo-info-item-status">{{ status }}</span>
                <span class="complaintInfo-info-item-content">{{ changeDatetime }}</span>
            </li>
            <li class="complaintInfo-info-item">
                <span class="complaintInfo-info-item-title">备注</span>
                <span class="complaintInfo-info-item-content">{{ remark }}</span>
            </li>
        </ul>
        <zdButton type="danger" @click="handleDeleteComplaint">删除</zdButton>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdButton
        },
        data() {
            return {
                title: '',
                date: '',
                img: '',
                description: '',
                status: '',
                changeDatetime: '',
                remark: ''
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            parkId() {
                return this.$store.state.info.defaultParkId
            }
        },
        methods: {
            handleDeleteComplaint() {
                let r = confirm("确定删除该表扬投诉吗？");
                if (r == true) {
                    this.$http({
                        url: '/api/system/service/complaint/deleteComplaint',
                        method: 'delete',
                        params: {
                            id: this.$route.query.id,
                            parkId: this.parkId
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('删除成功');
                            this.$router.replace('/service/myComplaint');
                        }
                    }).catch();
                }
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.push('/index');
            } else {
                this.$http({
                    url: '/api/system/service/complaint/getComplaintInfo',
                    params: {
                        id: this.$route.query.id,
                        parkId: this.parkId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.title = response.data.title;
                        this.date = response.data.date;
                        this.img = response.data.img;
                        this.description = response.data.description;
                        this.status = response.data.status;
                        this.changeDatetime = response.data.changeDatetime;
                        this.remark = response.data.remark;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>