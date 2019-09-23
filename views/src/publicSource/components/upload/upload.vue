<style lang="less">
    .zd-upload {
        &-wrapper {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
        }
        &-none {
            display: none;
        }
        &-item,
        &-button {
            width: 2rem;
            height: 2rem;
            margin: 0.1rem;
            border-radius: 0.09rem;
            overflow: hidden;
        }
        &-item {
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            & &-del {
                position: absolute;
                top: 0.1rem;
                right: 0.1rem;
                width: 0.32rem;
                height: 0.32rem;
                z-index: 10;
            }
            &-progress {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                width: 100%;
                height: 100%;
                padding: 0.1rem;
                background-color: #000;
                z-index: 11;
                opacity: 0.7;
                i {
                    display: inline-block;
                    height: 2px;
                    border-radius: 1px;
                    background-color: #fff;
                }
            }
        }
        &-button {
            background-color: #f5f5f5;
            font-size: 0.28rem;
            color: #c9c9c9;
            &-add {
                position: relative;
                left: 0.74rem;
                top: 0.5rem;
                width: 0.52rem;
                height: 0.52rem;
            }
            &-word {
                position: relative;
                left: 0;
                top: 0.7rem;
                text-align: center;
                &-s {
                    font-size: 0.24rem;
                }
            }
        }
        &-file {
            &-add {
                display: none;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s linear;
        transform: translate3D(0, 0, 0);
    }

    .fade-enter,
    .fade-leave-active {
        transform: translate3D(100%, 0, 0);
    }

    .img-view {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
    }

    /*遮罩层样式*/

    .img-view .img-layer {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    /*不限制图片大小，实现居中*/

    .img-view img {
        max-width: 90%;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 1000;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
<template>
    <div>
        <transition name="fade" v-if="showImg">
            <div class="img-view" @click="hidden">
                <!-- 遮罩层 -->
                <div class="img-layer"></div>
                <!-- <div class="img"> -->
                <img :src="imgSrc">
                <!-- </div> -->
            </div>
        </transition>
        <div class="zd-upload-wrapper" :class="support ? '' : 'zd-upload-none'">
            <div class="zd-upload-item" v-for="(item, index) in imgArr" :key="item.key">
                <img :src="item.src" @click="bigImg(item.src)" />
                <div class="zd-upload-item-progress" v-if="item.uploading">
                    <i :style="{ 'width': item.progressingWidth + 'rem'}"></i>
                </div>
                <img src="./img/delete.png" class="zd-upload-item-del" @click="handleDel(index, item.key)" v-else />
            </div>
            <div class="zd-upload-button" @click="handleAddClick" v-if="getFull === true">
                <img src="./img/add.png" class="zd-upload-button-add" />
                <p class="zd-upload-button-word">
                    <span>照片/拍照</span>
                </p>
                <p class="zd-upload-button-word zd-upload-button-word-s">
                    <span>{{ '(' + annotation + ')' }}</span>
                </p>
            </div>
            <form :id="'zd-upload-file-form-' + uploadId">
                <input type="file" accept="image/*" :capture="isIos ? false : 'camera'" class="zd-upload-file-add" :id="'zd-upload-file-' + uploadId" :multiple="isIos ? (multiple ? 'multiple' : false) : 'multiple'" @change="handleAddChange" />
            </form>
            <!-- this is for add, after every operate, this input has to be reset -->
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        props: {
            value: {
                type: Array
            },
            uploadType: {},
            uploadFileType: {},
            uploadId: {},
            maxLength: {
                type: Number
            },
            annotation: {},
            multiple: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                support: true,
                imgArr: [],
                times: 0,
                onProgressCount: 0,
                imgSrc: "",
                showImg: false
            }
        },
        computed: {
            imgServerUrlArr() {
                const arr = [];
                for (let i = 0; i < this.imgArr.length; i++) {
                    arr.push(this.imgArr[i].serverUrl);
                }
                return arr;
            },
            getFull() {
                if (this.imgArr.length >= this.maxLength) {
                    return false;
                } else {
                    return true;
                }
            },
            isIos() {
                const ua = navigator.userAgent.toLowerCase(); //获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
                const isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1); //判断是否是苹果手机，是则是true
                return isIos;
            }
        },
        methods: {
            hidden() {
                this.showImg = false;
                this.imgSrc = "";
            },
            bigImg(item) {
                this.imgSrc = item;
                this.showImg = true;
            },
            handleAddClick() {
                const addFile = document.getElementById('zd-upload-file-' + this.uploadId);
                addFile.click();
            },
            handleAddChange() {
                const _this = this;
                for (let i = 0; i < document.getElementById('zd-upload-file-' + _this.uploadId).files.length; i++) {
                    let fileReader = new FileReader();
                    fileReader.onloadend = function(e) {
                        const key = 'files' + _this.times;
                        _this.pushIntoImgArr(key, e.target.result);
                        _this.times++;
                        const finalIndex = _this.imgArr.length - 1;
                        const formData = new FormData();
                        formData.append('file', document.getElementById('zd-upload-file-' + _this.uploadId).files[i]);
                        formData.append('uploadType', _this.uploadType);
                        formData.append('fileSuffixType', _this.uploadFileType);
                        _this.onProgressCount++;
                        _this.$http({
                            // baseURL: 'http://system.zhongdapuhui.com',
                            // baseURL: 'http://116.62.168.88:16130',
                            url: '/v1/file',
                            method: 'post',
                            data: formData,
                            onUploadProgress(e) {
                                _this.imgArr[finalIndex].progressingWidth = (e.loaded / e.total) * 1.8;
                            }
                        }).then((response) => {
                            _this.onProgressCount--;
                            if (response.data.code === 10000 && response.data.returnData.subCode === 10000) {
                                _this.imgArr[finalIndex].serverUrl = response.data.returnData.data.filePath;
                                _this.imgArr[finalIndex].uploading = false;
                            } else {
                                _this.imgArr.splice(finalIndex, 1);
                            }
                            _this.$emit('input', _this.imgServerUrlArr);
                            document.getElementById('zd-upload-file-form-' + _this.uploadId).reset();
                        }).catch((response) => {
                            _this.onProgressCount--;
                            _this.imgArr.splice(finalIndex, 1);
                            alert('因为未知的原因，图片上传失败');
                        });
                    };
                    fileReader.readAsDataURL(document.getElementById('zd-upload-file-' + _this.uploadId).files[i]);
                }
                // _this.$emit('input', _this.imgArr);
            },
            handleDel(index, key) {
                this.imgArr.splice(index, 1);
                this.$emit('input', this.imgServerUrlArr);
            },
            pushIntoImgArr(key, src) {
                this.imgArr.push({
                    key,
                    src,
                    progressingWidth: 0,
                    uploading: true,
                    serverUrl: ''
                });
            }
        },
        created() {
            if (!FileReader) {
                this.support = false;
                alert('您的浏览器暂不支持图片上传');
            }
        }
    }
</script>