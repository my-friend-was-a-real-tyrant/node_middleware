<template>
    <div class="addquestionnaire">
        <el-form class="demo-form-inline" label-width="90px">
            <el-form-item label="标题：">
                <el-input style="width: 600px;" size="small" v-model="form.title" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="内容：">
                <el-input style="width: 600px;" v-model="form.content" type="textarea" :autosize="{ minRows: 2}"
                    placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="封面图片：" v-if="imgSrc === ''">
                <el-upload action="/v1/file" list-type="picture-card" name="file" ref="uploadImg" accept="image/*"
                    :data="{
                        'uploadType': 11,
                        'fileSuffixType': 1
                    }"
                    :limit="1" :on-success="handleFileUpload" :on-preview="handlePictureCardPreview"
                    :on-change="handleImgChange" :on-remove="handleImgChange"
                    :before-upload="handleCheckImgLength" class="editgoodsPic">
                    <i class="el-icon-plus"></i> 
                </el-upload>
            </el-form-item>
            <el-form-item label="封面图片：" v-else>
                <div class="imgbox">
                    <img class="exitimg" :src="imgSrc" alt="">
                    <div class="mark">
                        <i class="el-icon-delete" @click="Delete"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="前台地址：">
                <el-input style="width: 600px;" size="small" v-model="form.url" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="针对版本：">
                <el-select style="width: 180px;" size="small" v-model="form.groupType" placeholder="">
                    <el-option label="住宅" value="1"></el-option>
                    <el-option label="办公楼" value="2"></el-option>
                    <el-option label="公寓楼" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结束时间：">
                <el-date-picker style="width: 180px;" v-model="form.endDatetime" size="small" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="问卷问题：">
                <div class="questioncontent" v-for="(item, i) in questionList" :key="i">
                    <div class="title">
                        <span>标题{{ i + 1 }}：</span>
                        <el-input style="width: 518px;" size="small" v-model="item.name"></el-input>
                        <el-button v-if="i !== 0 && type === '1'" type="danger" class="el-icon-delete" size="small" style="margin-left: 10px;" @click="AllDelete(i)">删除</el-button>
                    </div>
                    <div v-for="(item1, j) in item.questionList" :key="j" class="questionList">
                        <el-form :model="form" ref="item1" label-width="90px">
                            <el-form-item :label="'问题' + (j + 1) + '：'">
                                <el-input style="width: 480px;" size="small" v-model="item1.question"></el-input>
                                <el-button v-if="j === item.questionList.length - 1 && type == '1'" type="success" class="el-icon-plus" size="small" style="margin-left: 10px;" @click="AddOneQuestion(i)">添加</el-button>
                                <el-button v-if="j !== 0 && type == '1'" type="warning" class="el-icon-delete" size="small" style="margin-left: 10px;" @click="DeleteOneQuestion(i, j)">删除</el-button>
                            </el-form-item>
                            <el-form-item label="类型：">
                                <el-select style="width: 480px;" size="small" v-model="item1.type" placeholder="">
                                    <el-option label="单选题" :value="1"></el-option>
                                    <el-option label="多选题" :value="2"></el-option>
                                    <el-option label="填空题" :value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否必填：">
                                <el-select style="width: 480px;" size="small" v-model="item1.isMust" placeholder="">
                                    <el-option label="是" :value="1"></el-option>
                                    <el-option label="否" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选项：" v-if="item1.type != 3 && type == '1'">
                                <el-input style="width: 480px;" size="small" v-model="item1.options"></el-input>
                                <span style="color: red;">请注意如果该问题有多个选项中间用中文顿号分开!!!</span>
                            </el-form-item>
                            <el-form-item label="选项：" v-if="type == '2'" v-for="(item2, i) in item1.optionsList" :key="i">
                                <el-input style="width: 480px;" size="small" v-model="item2.answerOptions"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <el-button type="success" v-if="type == '1'" class="el-icon-plus" size="small" @click="AddOneType">添加</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" style="margin-left: 350px;" @click="Submit">{{ type == "1" ? "提交问卷" : "保存问卷" }}</el-button>
        <el-button type="danger" @click="BackToList">问卷列表</el-button>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                form: {
                    title: "",
                    content: "",
                    image: "",
                    url: "",
                    groupType: "",
                    endDatetime: "",
                    sortList: "",
                    type: 1
                },
                questionList:[
                    {
                        "name": "",
                        "number": 1,
                        "questionList": [
                            {
                                "number": 1,
                                "question": "",
                                "type": "",
                                "isMust": 1,
                                "options": ""
                            }
                        ]
                    }
                ],
                imgList: [],
                dialogVisible: false,
                dialogImageUrl: "",
                imgSrc: ""
            }
        },
        computed: {
            type() {
                return this.$route.query.type;
            }
        },
        watch: {
            imgList(newv, oldv) {
                let img = document.getElementsByClassName("el-upload--picture-card");
                if (newv.length >= 1) {
                    img[0].style.display = "none";
                } else {
                    img[0].style.display = "block";
                }
            }
        },
        mounted() {
            (this.$route.query.id && this.$route.query.type == "2") ? this.Get() : "";
        },
        methods: {
            AllDelete(params) {
                this.questionList.splice(params, 1);
            },
            AddOneType() {
                let len = this.questionList.length;
                this.questionList.push({
                    "name": "",
                    "number": len + 1,
                    "questionList": [
                        {
                            "number": 1,
                            "question": "",
                            "type": "",
                            "isMust": 1,
                            "options": ""
                        }
                    ]
                });
            },
            AddOneQuestion(params) {
                let len = this.questionList[params].questionList.length;
                this.questionList[params].questionList.push({
                    "number": len + 1,
                    "question": "",
                    "type": "",
                    "isMust": 1,
                    "options": ""
                });
            },
            DeleteOneQuestion(params1, params2) {
                this.questionList[params1].questionList.splice(params2, 1);
            },
            Submit() {
                if (this.$route.query.type == "1") {
                    if (this.form.title === "") return this.zdMessage("warning", "请输入正确的标题");
                    if (this.form.content === "") return this.zdMessage("warning", "请输入正确的内容");
                    if (this.form.image === "") return this.zdMessage("warning", "请上传封面图片");
                    if (this.form.url === "") return this.zdMessage("warning", "请输入正确的地址");
                    if (this.form.groupType === "") return this.zdMessage("warning", "请选择版本");
                    if (this.form.endDatetime === "") return this.zdMessage("warning", "请选择结束时间");
                    this.form.endDatetime = this.ParseTime(Date.parse(this.form.endDatetime) + (23 * 3600 + 59 * 60) * 1000);
                    this.form.sortList = JSON.stringify(this.handleData(JSON.stringify(this.questionList)));
                    if (this.handleData(JSON.stringify(this.questionList))) {
                        this.$http({
                            url: '/api/manageSystem/system/property/questionnaire/addQuestionnaire',
                            method: 'post',
                            data: this.form
                        }).then(res => {
                            if (res.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/manageSystem/property/questionnaire"
                                });
                            }, 1500);
                        }
                        }).catch(error => {});
                    }
                } else if (this.$route.query.type == "2") {
                    if (this.imgSrc === "") {
                        this.form.image = this.imgList[0];
                    } else {
                        this.form.image = this.imgSrc.replace("http://system-test.zhongdapuhui.com", "");
                        this.form.image = this.imgSrc.replace("http://system.zhongdapuhui.com", "");
                    }
                    this.form.createDatetime = this.form.endDate;
                    delete this.form.endDate;
                    delete this.form.isShow;
                    delete this.form.createDatetime;
                    for (let i = 0; i < this.questionList.length; i++) {
                        let item1 = this.questionList[i];
                        // delete item1.sortUserCount;
                        // delete item1.questionnaireId;
                        for (let j = 0; j < item1.questionList.length; j++) {
                            let item2 = item1.questionList[j];
                            item2["options"] = item2.optionsList;
                            // delete item2.optionsList;
                            // delete item2.sortId;
                            // delete item2.userCount;
                            // delete item2.questionnaireId;
                            // for (let k = 0; k < item2.options.length; k++) {
                            //     let item3 = item2.options[k];
                            //     delete item3.questionId;
                            //     delete item3.optionCount;
                            // }
                        }
                    }
                    this.form["type"] = 1;
                    this.form.sortList = JSON.stringify(this.questionList);
                    this.$http({
                        url: '/api/manageSystem/system/property/questionnaire/editQuestionnaire',
                        method: 'patch',
                        data: this.form
                    }).then(res => {
                        if (res.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/manageSystem/property/questionnaire"
                                });
                            }, 1500);
                        }
                    }).catch(error => {});
                }
            },
            handleData(params) {
                params = JSON.parse(params);
                for (let i = 0; i < params.length; i++) {
                    let item1 = params[i];
                    if (item1.name === "") {
                        return this.zdMessage("warning", "请仔细检查所有的问卷问题");
                        break;
                    } else {
                        for (let j = 0; j < item1.questionList.length; j++) {
                            let item2 = item1.questionList[j];
                            for (let k in item2) {
                                if (item2.hasOwnProperty(k)) {
                                    let item3 = item2[k];
                                    if (item3 == "" ) {
                                        if (item2.type != 3) {
                                            return this.zdMessage("warning", "请仔细检查所有的问卷问题");
                                            break;
                                        } else {
                                            if (k != "options") {
                                                return this.zdMessage("warning", "请仔细检查所有的问卷问题");
                                                break;
                                            } else {
                                                item2.options = [];
                                            }
                                        }
                                    } else {
                                        if (item2.options.indexOf("、") > 0) {
                                            item2.options = item2.options.split("、");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return params;
            },
            handleFileUpload(response, file, fileList) {
                if (response.code !== 10000 || response.returnData.subCode !== 10000) {
                    if (response.code === 'E0004') {
                        this.$router.push('/manageSystem/login');
                    } else {
                        this.$alert(response.message, '提示', {
                            confirmButtonText: '确定'
                        });
                        for (let i = 0; i < fileList.length; i ++) {
                            if (fileList[i] === file) {
                                fileList.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDetailImgChange(file, fileList) {
                this.detailImg = '';
                for (let i = 0; i < fileList.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        this.detailImg = fileList[i].response.returnData.data.filePath;
                        break;
                    }
                }
            },
            handleImgChange(file, fileList) {
                const imgList = [];
                for (let i = 0; i < fileList.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        imgList.push(fileList[i].response.returnData.data.filePath);
                    }
                }
                this.imgList = imgList;
                this.form.image = this.imgList[0];
            },
            handleClearBeforeDetailImg(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['uploadDetailImg'].uploadFiles.length > 1) {
                    this.$refs['uploadDetailImg'].handleRemove(this.$refs['uploadDetailImg'].uploadFiles[0]);
                }
            },
            handleCheckImgLength(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['uploadImg'].uploadFiles.length > 6) {
                    this.$alert('限上传六张图片', '提示');
                    return false;
                }
            },
            BackToList() {
                this.$router.push({
                    path: "/manageSystem/property/questionnaire"
                });
            },
            zdMessage(type, msg) {
                this.$message({
                    type: type,
                    message: msg,
                    center: true,
                    duration: 2000
                });
            },
			ParseTime(time, cFormat) {
				if (arguments.length === 0) return null;
				const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
				let date;
				if (typeof time === 'object') {
					date = time;
				} else {
					if (('' + time).length === 10) time = parseInt(time) * 1000;
					date = new Date(time);
				}
				const formatObj = {
					y: date.getFullYear(),
					m: date.getMonth() + 1,
					d: date.getDate(),
					h: date.getHours(),
					i: date.getMinutes(),
					s: date.getSeconds(),
					a: date.getDay()
				}
				const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
					if (formatObj.a == 0) formatObj.a = 7;
					let value = formatObj[key];
					if (key === 'a') return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1];
					if (result.length > 0 && value < 10) value = '0' + value;
					return value || 0;
				});
				return time_str;
            },
            Delete() {
                this.imgSrc = "";
            },
            Get() {
                this.$http({
                    url: '/api/manageSystem/system/property/questionnaire/getQuestionnaireInfo',
                    params: {
                        id: this.$route.query.id
                    }
                }).then(res => {
                    if (res.data.code === '00000') {
                        let result = res.data;
                        result.questionnaireInfo["endDate"] = result.questionnaireInfo.endDatetime;
                        this.form = result.questionnaireInfo;
                        this.form.groupType === "住宅" ? this.form.groupType = "1" : this.form.groupType === "写字楼" ? "2" : this.form.groupType === "公寓楼" ? "3" : "";
                        this.imgSrc = result.questionnaireInfo.image;
                        this.questionList = result.questionnaireInfo.sortList;
                    }
                }).catch(error => {});
            }
        }
    }
</script>
<style lang="less" scoped>
    .addquestionnaire {
        .questioncontent {
            &:not(:last-child){
                margin-bottom: 25px;
            }
            .title {
                margin-bottom: 15px;
            }
            .el-form-item {
                margin-bottom: 5px;
            }
        }
        .imgbox{
            position: relative;
            width: 150px;
            height: 150px;
            .mark{
                position: absolute;
                left: 0;
                top: 0;
                z-index: 20;
                width: 148px;
                height: 148px;
                border: 1px dashed #DCDFE6;
                border-radius: 5px;
                background-color: rgba(0, 0, 0, 0.3);
                text-align: center;
                line-height: 148px;
                .el-icon-delete{
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                }
            }
            .exitimg{
                width: 148px;
                height: 148px;
                border-radius: 5px;
                z-index: 10;
            }
        }
    }
</style>