<style lang="less" scoped>
    .complaint{ display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%;
        &-content{ flex-grow: 1; background-color: #f5f5f5;
            &-title{ display: flex; margin-bottom: .3rem; padding: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff;
                span{ padding-right: .6rem; color: #333; font-size: .28rem;}
                input{ border: 0 none; outline: 0 none; color: #333; font-size: .28rem;}
            }
            &-description{ padding: .3rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff; font-size: 0;
                textarea{ width: 100%; min-height: 1.5rem; border: 0 none; outline: 0 none; font-size: .28rem; color: #333;}
            }
        }
        &-button{ width: 100%; border-radius: 0;}
    }
</style>
<template>
    <div class="complaint" v-title="$route.params.type == '1' ? '投诉' : '表扬'">
        <div class="complaint-content">
            <div class="complaint-content-title">
                <span>标题</span>
                <input type="text" placeholder="请输入您的标题" v-model.trim="formData.title" />
            </div>
            <div class="complaint-content-description">
                <textarea placeholder="请输入您的内容" v-model.trim="formData.description"></textarea>
                <zdUpload
                    ref="complaintUpload"
                    v-model="formData.imgList"
                    uploadId="complaint"
                    uploadType="3"
                    uploadFileType="1"
                    :maxLength="1"
                    annotation="仅限1张"
                    :multiple="false"
                ></zdUpload>
            </div>
        </div>
        <zdButton class="complaint-button" @click="handleComplaintSubmit" :disabled="complaintUpload">{{ complaintUpload ? '正在上传...' : '发表' }}</zdButton>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import zdUpload from 'publicComponents/upload/upload';

    export default {
        components: {
            zdButton,
            zdUpload
        },
        data() {
            return {
                formData: {
                    title: '',
                    description: '',
                    imgList: [],
                    type: this.$route.params.type,
                    parkId: this.$store.state.info.defaultParkId,
                    roomId: this.$store.state.info.defaultAddressId
                },
                complaintUpload: false
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            }
        },
        methods: {
            handleComplaintSubmit() {
                this.$http({
                    url: '/api/system/service/complaint/submitComplaint',
                    method: 'post',
                    data: this.formData
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$message('发表成功');
                        this.$router.replace('/service/myComplaint');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            } else {
                this.$watch('$refs.complaintUpload.onProgressCount', (newVal, oldVal) => {
                    if (newVal === 0) {
                        this.complaintUpload = false;
                    } else {
                        this.complaintUpload = true;
                    }
                });
            }
        }
    }
</script>