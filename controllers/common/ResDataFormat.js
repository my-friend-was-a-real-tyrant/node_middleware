// 返回码格式定义

class ResDataFormat {
    static getSuccess() {
        return {
            code: '00000',
            message: 'success'
        }
    }

    static getFail(returnData, code, message) {
        returnData.code = code;
        returnData.message = message;
        return;
    }

    static getFail_until0820(code, message) {
        return {
            code,
            message
        }
    }
}

module.exports = ResDataFormat;