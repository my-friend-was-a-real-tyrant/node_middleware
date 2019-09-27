const axios = require('axios')

const apiUrl = require('./config/config')

class PayCard{

  static async getPayCard (data) {

    let params = ''
    params += data.payNum ? `payNum=${encodeURI(data.payNum)}&` : ''
    params += data.payPhone ? `payPhone=${encodeURI(data.payPhone)}&` : ''
    params += data.payAddress ? `payAddress=${encodeURI(data.payAddress)}&` : ''
    params += data.payName ? `payName=${encodeURI(data.payName)}&` : ''
    params += data.payMoney ? `payMoney=${encodeURI(data.payMoney)}&` : ''
    params += data.payOper ? `payOper=${encodeURI(data.payOper)}` : ''

    // return params

    const result = await axios.post(`${apiUrl}/cardinfo/PayCard?${params}`)
    return result.data
  }

}

module.exports = PayCard
