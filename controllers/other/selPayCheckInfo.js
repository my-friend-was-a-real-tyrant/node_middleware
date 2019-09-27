const axios = require('axios')

const apiUrl = require('./config/config')

class SelPayCheckInfo{

  static async checkPayInfo (data) {

    let params = ''
    params += data.payPhone ? `payPhone=${encodeURI(data.payPhone)}&` : ''
    params += data.payName ? `payName=${encodeURI(data.payName)}&` : ''
    params += data.payNum ? `payNum=${encodeURI(data.payNum)}&` : ''
    params += data.payTime ? `payTime=${encodeURI(data.payTime)}&` : ''
    params += data.payStatus ? `payStatus=${encodeURI(data.payStatus)}&` : ''
    params += data.checkTime ? `checkTime=${encodeURI(data.checkTime)}&` : ''
    params += data.payMoney ? `payMoney=${encodeURI(data.payMoney)}&` : ''
    params += data.payOper ? `payOper=${encodeURI(data.payOper)}&` : ''
    params += data.checkOper ? `checkOper=${encodeURI(data.checkOper)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''

    // return params

    const result = await axios.get(`${apiUrl}/cardinfo/selPayCheckInfo?${params}`)
    return result.data
  }
}

module.exports = SelPayCheckInfo
