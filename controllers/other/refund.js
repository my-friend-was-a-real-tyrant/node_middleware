const axios = require('axios')

const apiUrl = require('./config/config')

class Refund{

  static async refund (data) {

    let params = ''
    params += data.reNum ? `reNum=${encodeURI(data.reNum)}&` : ''
    params += data.reMoney ? `reMoney=${encodeURI(data.reMoney)}&` : ''
    params += data.rePhone ? `rePhone=${encodeURI(data.rePhone)}&` : ''
    params += data.reName ? `reName=${encodeURI(data.reName)}&` : ''
    params += data.reCause ? `reCause=${encodeURI(data.reCause)}&` : ''
    params += data.status ? `status=${encodeURI(data.status)}` : ''

    // return params

    const result = await axios.post(`${apiUrl}/cardinfo/refund?${params}`)
    return result.data
  }

}

module.exports = Refund
