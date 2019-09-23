const baseController = require('./ResDataFormat');

const request = ({
    returnData,
    validator = {
        params: {},
        properties: []
    },
    method,
    params = {},
    success = () => {},
}) => {
    const p = new Promise(async (resolve, reject) => {
        let valid = true;
        if (typeof validator.properties === 'string') {
            if (Object.prototype.hasOwnProperty.call(validator.params, validator.properties) === false) {
                valid = false;
            }
        } else {
            for (let i = 0; i < validator.properties.length; i ++) {
                if (Object.prototype.hasOwnProperty.call(validator.params, validator.properties[i]) === false) {
                    console.log(validator.properties[i]);
                    valid = false;
                    break;
                }
            }
        }
        if (valid) {
            console.log(valid);
            try {
                if (method instanceof Array && params instanceof Array && method.length === params.length) {
                    let bool = true;
                    const responseArr = [];
                    for (let i = 0; i < method.length; i ++) {
                        const responseData = await method[i](params[i]);
                        if (responseData.code !== 10000) {
                            baseController.getFail(returnData, 'E0003', responseData.message);
                            bool = false;
                            break;
                        } else if (responseData.returnData.subCode !== 10000) {
                            baseController.getFail(returnData, 'E0003', responseData.returnData.subMessage);
                            bool = false;
                            break;
                        }
                        responseArr.push(responseData);
                    }
                    if (bool) {
                        success(responseArr);
                    }
                } else if (method instanceof Function && params instanceof Array) {
                    let bool = true;
                    console.log('out');
                    const responseArr = [];
                    for (let i = 0; i < params.length; i ++) {
                        const responseData = await method(params[i]);
                        if (responseData.code !== 10000) {
                            baseController.getFail(returnData, 'E0003', responseData.message);
                            bool = false;
                            break;
                        } else if (responseData.returnData.subCode !== 10000) {
                            baseController.getFail(returnData, 'E0003', responseData.returnData.subMessage);
                            bool = false;
                            break;
                        }
                        responseArr.push(responseData);
                    }
                    if (bool) {
                        success(responseArr);
                    }
                } else {
                    const responseData = await method(params);
                    console.log(responseData)
                    if (responseData.code !== 10000) {
                        if (responseData.code === 10005) {
                            baseController.getFail(returnData, 'E0004', '登录已超时，请重新登录！');
                        } else {
                            baseController.getFail(returnData, 'E0003', responseData.message);
                        }
                    } 
                    // else if (responseData.returnData.subCode !== 10000) {
                    //     baseController.getFail(returnData, 'E0003', responseData.returnData.subMessage);
                    // } 
                    else {
                        success(responseData);
                    }
                }
            } catch(error) {
                console.log(error);
                console.log(error.options);
                console.log('错误2');
                baseController.getFail(returnData, 'E0002', '系统繁忙');
            }
        } else {
            baseController.getFail(returnData, 'E0001', '系统开了点小差，请重试');
        }
        resolve();
    });
    return p;
};

module.exports = request;