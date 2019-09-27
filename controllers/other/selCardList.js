const axios = require('axios')

const apiUrl = require('./config/config')

class SelCardList{

  static async getList (data) {

    let params = ''
    params += data.cardNum ? `cardNum=${encodeURI(data.cardNum)}&` : ''
    params += data.cardPhone ? `cardPhone=${encodeURI(data.cardPhone)}&` : ''
    params += data.cardName ? `cardName=${encodeURI(data.cardName)}&` : ''
    params += data.cardStatus ? `cardStatus=${encodeURI(data.cardStatus)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}` : ''

    // return params

    const result = await axios.get(`${apiUrl}/cardinfo/selCardList?${params}`)
    return result.data
  }

}

module.exports = SelCardList
