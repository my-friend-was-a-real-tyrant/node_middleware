const axios = require('axios')

const apiUrl = require('./config/config')

class CheckPay{

  static async checkPay (data) {

    let params = ''
    params += data.flowid ? `flowid=${encodeURI(data.flowid)}&` : ''
    params += data.payNum ? `payNum=${encodeURI(data.payNum)}&` : ''
    params += data.payStatus ? `payStatus=${encodeURI(data.payStatus)}&` : ''
    params += data.payMoney ? `payMoney=${encodeURI(data.payMoney)}&` : ''
    params += data.payComm ? `payComm=${encodeURI(data.payComm)}&` : ''
    params += data.checkOper ? `checkOper=${encodeURI(data.checkOper)}` : ''

    // return params

    const result = await axios.post(`${apiUrl}/cardinfo/checkPay?${params}`)
    return result.data
  }

}

module.exports = CheckPay
