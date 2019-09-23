const baseController = require('../../../../common/ResDataFormat');
const exception = require('../../../../common/requestModule');
const dateTransition = require('../../../../common/dateTransition');
const { serverHostname } = require('../../../../common/constant');
const manageSystemModel = require('../../../../../models/ManageSystemModel');

const url = require('url');

class MerchandiseController {
    // ....
    // ..获取商品列表
    // ....
    static async getMerchandiseList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'status']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.merchandiseModel.getMerchandiseList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const merchandiseList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        sku: responseData.returnData.data.list[i].sku,
                        name: responseData.returnData.data.list[i].name,
                        specialPrice: responseData.returnData.data.list[i].specialPrice,
                        spellPrice: responseData.returnData.data.list[i].spellPrice,
                        content: responseData.returnData.data.list[i].content,
                        status: responseData.returnData.data.list[i].status === 1
                            ? '未上架'
                            : '已上架',
                        description: responseData.returnData.data.list[i].description

                    };
                    merchandiseList.push(temp);
                }
                returnData.merchandiseList = merchandiseList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..商品详情
    // ....
    static async getMerchandiseInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        console.log( params );
        try {
            await exception({
                returnData,
                validator: {
                    params,
                    properties: 'id'
                },
                method: [manageSystemModel.systemModel.mallModel.merchandiseModel.merchandiseModel.getMerchandiseInfo, manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.getMerchandiseGroupPurchaseHistory],
                params: [{
                    accountId,
                    parkId: defaultParkId,
                    id: params.id
                },{
                    accountId,
                    parkId: defaultParkId,
                    id: params.id
                }],
                success(responseDataArray) {
                    
                    const temp = {
                        sku: responseDataArray[0].returnData.data.sku,
                        name: responseDataArray[0].returnData.data.name,
                        price: responseDataArray[0].returnData.data.price,
                        content: responseDataArray[0].returnData.data.content,
                        status: responseDataArray[0].returnData.data.status === 1
                            ? '未上架'
                            : '已上架',
                        description: responseDataArray[0].returnData.data.description,
                        img: [],
                        imgNoHostname: responseDataArray[0].returnData.data.pictures,
                        detailImg: serverHostname + responseDataArray[0].returnData.data.details,
                        detailImgNoHostname: responseDataArray[0].returnData.data.details,
                        tableData: [],
                        maxQuantity:responseDataArray[0].returnData.data.maxQuantity,
                        specialPrice:responseDataArray[0].returnData.data.specialPrice,
                        spelled:responseDataArray[0].returnData.data.spelled,
                        validDate:responseDataArray[0].returnData.data.validDate,
                        lumpCount:responseDataArray[0].returnData.data.lumpCount,
                        spellPrice:responseDataArray[0].returnData.data.spellPrice,
                        grouped: responseDataArray[0].returnData.data.grouped,
                    };
                    for (let i = 0; i < responseDataArray[1].returnData.data.length; i ++) {
                        const tableTemp = {
                            id: responseDataArray[1].returnData.data[i].id,
                            originPrice: responseDataArray[1].returnData.data[i].normalPrice,
                            groupPrice: responseDataArray[1].returnData.data[i].groupPrice,
                            startDatetime: dateTransition(responseDataArray[1].returnData.data[i].startDatetime, 'datetime'),
                            endDatetime: dateTransition(responseDataArray[1].returnData.data[i].endDatetime, 'datetime'),
                            maxCount: responseDataArray[1].returnData.data[i].maxCount,
                            realCount: responseDataArray[1].returnData.data[i].realCount,
                            status: responseDataArray[1].returnData.data[i].status === 1
                                ? '未开始'
                                : (responseDataArray[1].returnData.data[i].status === 2
                                ? '进行中'
                                : (responseDataArray[1].returnData.data[i].status === 3
                                ? '团购成功'
                                : '团购失败')),
                            statusCode: responseDataArray[1].returnData.data[i].status
                        };
                        temp.tableData.push(tableTemp);
                    }
                    for (let i = 0; i < temp.imgNoHostname.length; i ++) {
                        temp.img.push(serverHostname + temp.imgNoHostname[i]);
                    }
                    returnData.merchandiseInfo = temp;
                }
            });
        } catch(error) {
            returnData = baseController.getFail('E0002', error.message);
        }
        ctx.body = returnData;
    }

    // ....
    // ..编辑商品
    // ....
    static async editMerchandise(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'name', 'price', 'content', 'description', 'imgList', 'detailImg','specialPrice','maxQuantity']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.merchandiseModel.editMerchandise,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..添加商品
    // ....
    static async addMerchandise(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['name', 'price', 'content', 'description', 'imgList', 'detailImg','specialPrice','maxQuantity']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.merchandiseModel.addMerchandise,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取类别列表
    // ....
    static async getTypeList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.merchandiseModel.getTypeList,
            params: {
                accountId
            },
            success(responseData) {
                const typeList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        value: responseData.returnData.data[i].id,
                        label: responseData.returnData.data[i].name
                    };
                    typeList.push(temp);
                }
                returnData.typeList = typeList;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = MerchandiseController;