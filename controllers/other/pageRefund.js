const axios = require('axios')

const apiUrl = require('./config/config')

class PageRefund{

  static async getPageRefund (data) {

    let params = ''
    params += data.reNum ? `reNum=${encodeURI(data.reNum)}&` : ''
    params += data.rePhone ? `rePhone=${encodeURI(data.rePhone)}&` : ''
    params += data.reName ? `reName=${encodeURI(data.reName)}&` : ''
    params += data.reTime ? `reTime=${encodeURI(data.reTime)}&` : ''
    params += data.status ? `status=${encodeURI(data.status)}&` : ''
    params += data.pageSize ? `payOper=${encodeURI(data.pageSize)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}` : ''

    // return params

    const result = await axios.get(`${apiUrl}/cardinfo/pageRefund?${params}`)
    return result.data
  }

}

module.exports = PageRefund
