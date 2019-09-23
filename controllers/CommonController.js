// system & mall common part
const url = require('url');
const fs = require('fs');
const baseController = require('./common/ResDataFormat');
const exception = require('./common/requestModule');
const commonModel = require('../models/CommonModel');

/** js
 * @apiDefine CODE_200
 * @apiSuccess (Reponse 200) {string} code 00000
 * @apiSuccess (Reponse 200) {string} message success
 * @apiSuccessExample {json} Response 200 Example
 *   HTTP/1.1 200 OK
 *   {
 *     "code": "00000",
 *     "message": "success"
 *   }
 */

class CommonController {
    /**
     * api {POST} /api/common/upload 上传文件
     * @apiName file upload
     * @apiGroup Common
     * @apiVersion 1.0.0
     * @apiDescription 统一文件上传接口
     *
     * @apiParam {object} files 文件
     * @apiParam {object} fields 其它参数
     * @apiParam (files) {array/file} file 文件数组或单个文件
     * @apiParam (fields) {number} uploadType 上传类型（1-报修；2-报修转送；3-投诉表扬；11-商城商品）
     * @apiParam (fields) {number} uploadFileType 上传文件类型（1-jpg/jpeg/png；11-xls/xlsx）
     *
     * @apiParamExample {json} Request Example
     *   POST /api/common/upload
     *   {
     *     "files": {
     *         "file": "file"
     *     },
     *     "fields": {
     *         "uploadType": "1",
     *         "uploadFileType": "1"
     *     }
     *   }
     * 
     * @apiUse CODE_200
     * @apiSuccess (Reponse 200) {string} url 返回服务器存储的图片地址
     *
     */
    static async uploadFile(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body.files.file;
        const { uploadType, uploadFileType } = ctx.request.body.fields;
        const files = [];
        if (postData instanceof Array) {
            for (let i = 0; i < postData.length; i ++) {
                const f = postData[i];
                const oo = {
                    value: fs.createReadStream(f.path),
                    options: {
                        filename: f.name,
                        contentType: f.mimeType
                    }
                };
                files.push(oo);
            }
        } else {
            const oo = {
                value: fs.createReadStream(postData.path),
                options: {
                    filename: postData.name,
                    contentType: postData.mimeType
                }
            };
            files.push(oo);
        }

        // commonModel.uploadFile({ files, uploadFileType, uploadFileType }).then((responseData) => {
        //     console.log(responseData);
        //     if (responseData.code !== 10000) {
        //         baseController.getFail(returnData, 'E0003', responseData.message);
        //     } else if (responseData.returnData.subCode !== 10000) {
        //         baseController.getFail(returnData, 'E0003', responseData.returnData.subMessage);
        //     } else {
        //         returnData.url = responseData.returnData.data.filePath;
        //     }
        //     ctx.body = returnData;
        // }).catch((response) => {
        //     console.log(response);
        //     baseController.getFail(returnData, 'E0002', 'opps, sth wrong');
        //     ctx.body = returnData;
        // });
        // ctx.body = returnData;
        await exception({
            returnData,
            method: commonModel.uploadFile,
            params: {
                files, 
                uploadType, 
                uploadFileType
            },
            success(responseData) {
                console.log(responseData);
                returnData.url = responseData.returnData.data.filePath;
                // returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }
    
    /**
     * @api {GET} /api/common/getMyDeliveryAddress 获取我的收货地址
     * @apiName get my delivery address
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取我的收货地址
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} addressList 地址列表
     * @apiSuccess (addressList) {number} id 地址ID
     * @apiSuccess (addressList) {number} userId 用户ID
     * @apiSuccess (addressList) {string} name 收货人姓名
     * @apiSuccess (addressList) {string} cellphone 手机号
     * @apiSuccess (addressList) {string} telephone 座机号
     * @apiSuccess (addressList) {string} address 具体地址
     * @apiSuccess (addressList) {string} postCode 邮编
     * @apiSuccess (addressList) {bool} theDefault 是否默认地址
     * @apiSuccess (addressList) {number} provinceId 省id
     * @apiSuccess (addressList) {string} provinceName 省名称
     * @apiSuccess (addressList) {number} cityId 市id
     * @apiSuccess (addressList) {string} cityName 市名称
     * @apiSuccess (addressList) {number} districtId 区县ID
     * @apiSuccess (addressList) {string} districtName 区县名称
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "addressList": {
     *         "id": 1,
     *         "userId": 1,
     *         "name": "徐凌",
     *         "cellphone": "13333333333",
     *         "telephone": "88888888",
     *         "address": "新东方国际科技中心楼下十足旁边的外卖箱",
     *         "postCode": "311111",
     *         "theDefault": true,
     *         "provinceId": 1,
     *         "provinceName": "浙江",
     *         "cityId": 1,
     *         "cityName": "杭州",
     *         "districtId": 1,
     *         "districtName": "滨江"
     *     }
     *   }
     * 
     *
     */
    static async getMyDeliveryAddress(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            method: commonModel.getMyDeliveryAddress,
            params: {
                userId
            },
            success(responseData) {
                returnData.addressList = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/common/setFrequentlyAddress 设为常用地址
     * @apiName set as frequently address
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 设为常用地址
     *
     * @apiParam {number} addressId 地址ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/common/setFrequentlyAddress
     *   {
     *     "addressId": 1
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async setFrequentlyAddress(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'addressId'
            },
            method: commonModel.setFrequentlyAddress,
            params: {
                userId,
                addressId: postData.addressId
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/common/getProvinceList 获取省列表
     * @apiName get province list
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取省列表
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} provinceList 省列表
     * @apiSuccess (provinceList) {number} provinceId 省ID
     * @apiSuccess (provinceList) {string} provinceName 省名字
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "provinceList": [{
     *         "provinceId": 1,
     *         "provinceName": "浙江省"
     *     }]
     *   }
     * 
     *
     */
    static async getProvinceList(ctx) {
        let returnData = baseController.getSuccess();
        await exception({
            returnData,
            method: commonModel.getProvinceList,
            success(responseData) {
                const provinceList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        provinceId: responseData.returnData.data[i].id,
                        provinceName: responseData.returnData.data[i].name
                    }
                    provinceList.push(temp);
                }
                returnData.provinceList = provinceList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/common/getCityList 获取市列表
     * @apiName get city list
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取市列表
     * 
     * @apiParam {number} provinceId 省ID
     * 
     * @apiParamExample {json} Request Example
     *   GET /api/common/getCityList
     *   {
     *     "provinceId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} cityList 市列表
     * @apiSuccess (cityList) {number} cityId 市ID
     * @apiSuccess (cityList) {string} cityName 市名字
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "cityList": [{
     *         "cityId": 1,
     *         "cityName": "杭州市"
     *     }]
     *   }
     * 
     *
     */
    static async getCityList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'provinceId'
            },
            method: commonModel.getCityList,
            params: {
                provinceId: params.provinceId
            },
            success(responseData) {
                const cityList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        cityId: responseData.returnData.data[i].id,
                        cityName: responseData.returnData.data[i].name
                    }
                    cityList.push(temp);
                }
                returnData.cityList = cityList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/common/getDistrictList 获取区列表
     * @apiName get district list
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取区列表
     * 
     * @apiParam {number} cityId 市ID
     * 
     * @apiParamExample {json} Request Example
     *   GET /api/common/getDistrictList
     *   {
     *     "cityId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} districtList 区列表
     * @apiSuccess (districtList) {number} districtId 区ID
     * @apiSuccess (districtList) {string} districtName 区名字
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "districtList": [{
     *         "districtId": 1,
     *         "districtName": "滨江区"
     *     }]
     *   }
     * 
     *
     */
    static async getDistrictList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'cityId'
            },
            method: commonModel.getDistrictList,
            params: {
                cityId: params.cityId
            },
            success(responseData) {
                const districtList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        districtId: responseData.returnData.data[i].id,
                        districtName: responseData.returnData.data[i].name
                    }
                    districtList.push(temp);
                }
                returnData.districtList = districtList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/common/addDeliveryAddress 添加收货地址
     * @apiName add delivery address
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 添加收货地址
     *
     * @apiParam {string} name 收件人姓名
     * @apiParam {string} cellphone 收件人联系方式
     * @apiParam {number} districtId 区ID
     * @apiParam {string} address 详细地址
     * @apiParam {bool} isFrequent 是否设置为常用
     *
     * @apiParamExample {json} Request Example
     *   POST /api/common/addDeliveryAddress
     *   {
     *     "name": "徐凌",
     *     "cellphone": "13500002222",
     *     "districtId": 1,
     *     "address": "新东方国际科技中心楼下十足旁边的外卖盒",
     *     "isFrequent": true
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async addDeliveryAddress(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['name', 'cellphone', 'districtId', 'address', 'isFrequent']
            },
            method: commonModel.addDeliveryAddress,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/common/getDeliveryAddressInfo 获取收货地址详情
     * @apiName get delivery address info
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取收货地址详情
     *
     * @apiParam {number} addressId 地址ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/common/getDeliveryAddressInfo
     *   {
     *     "addressId": 1
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} info 收货地址信息
     * @apiSuccess (info) {string} name 收货人姓名
     * @apiSuccess (info) {string} cellphone 收货人联系方式
     * @apiSuccess (info) {number} provinceId 收货地址省ID
     * @apiSuccess (info) {string} provinceName 收货地址省名称
     * @apiSuccess (info) {number} cityId 收货地址市ID
     * @apiSuccess (info) {string} cityName 收货地址市名称
     * @apiSuccess (info) {number} districtId 收货地址区ID
     * @apiSuccess (info) {number} districtName 收货地址区名称
     * @apiSuccess (info) {string} address 收货详细地址
     * @apiSuccess (info) {bool} isFrequent 是否为常用地址
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "info": {
     *         "name": "徐凌",
     *         "cellphone": "13500002222",
     *         "provinceId": 1,
     *         "provinceName": "浙江",
     *         "cityId": 11,
     *         "cityName": "杭州",
     *         "districtId": 111,
     *         "districtName": "滨江",
     *         "address": "新东方国际科技中心楼下十足便利店旁边的外卖箱",
     *         "isFrequent": true
     *     }
     *   }
     *
     */
    static async getDeliveryAddressInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'addressId'
            },
            method: commonModel.getDeliveryAddressInfo,
            params: {
                userId,
                addressId: params.addressId
            },
            success(responseData) {
                returnData.info = {
                    name: responseData.returnData.data.name,
                    cellphone: responseData.returnData.data.cellphone,
                    provinceId: responseData.returnData.data.provinceId,
                    provinceName: responseData.returnData.data.provinceName,
                    cityId: responseData.returnData.data.cityId,
                    cityName: responseData.returnData.data.cityName,
                    districtId: responseData.returnData.data.districtId,
                    districtName: responseData.returnData.data.districtName,
                    address: responseData.returnData.data.address,
                    isFrequent: responseData.returnData.data.theDefault
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/common/editDeliveryAddress 编辑收货地址
     * @apiName edit delivery address
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 编辑收货地址
     *
     * @apiParam {number} addressId 地址ID
     * @apiParam {string} name 收件人姓名
     * @apiParam {string} cellphone 收件人联系方式
     * @apiParam {number} districtId 区ID
     * @apiParam {string} address 详细地址
     *
     * @apiParamExample {json} Request Example
     *   POST /api/common/editDeliveryAddress
     *   {
     *     "addressId": 1,
     *     "name": "徐凌",
     *     "cellphone": "13500002222",
     *     "districtId": 1,
     *     "address": "新东方国际科技中心楼下十足旁边的外卖盒"
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async editDeliveryAddress(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['addressId', 'name', 'cellphone', 'districtId', 'address']
            },
            method: commonModel.editDeliveryAddress,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/common/delDeliveryAddress 删除收货地址
     * @apiName delete delivery address
     * @apiGroup System and Mall
     * @apiVersion 1.4.1
     * @apiDescription 删除收货地址
     *
     * @apiParam {number} addressId 地址ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/common/delDeliveryAddress
     *   {
     *     "addressId": 1
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async delDeliveryAddress(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'addressId'
            },
            method: commonModel.delDeliveryAddress,
            params: {
                userId,
                addressId: postData.addressId
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {DELETE} /api/common/clearSession 清除session
     * @apiName clear session
     * @apiGroup Common
     * @apiVersion 1.4.1
     * @apiDescription 清除session
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async clearSession(ctx) {
        let returnData = baseController.getSuccess();
        try {
            ctx.session = null;
        } catch(error) {
            returnData = baseController.getFail('E0002', '系统繁忙');
        }
        ctx.body = returnData;
    }
}

module.exports = CommonController;