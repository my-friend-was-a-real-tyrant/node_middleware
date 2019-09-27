const axios = require('axios')

const apiUrl = require('./config/config')

class CardInfo{

  static async pageCardRecurd (data) {

    let params = ''
    params += data.cardNum ? `cardNum=${encodeURI(data.cardNum)}&` : ''
    params += data.startTime ? `startTime=${encodeURI(data.startTime)}&` : ''
    params += data.endTime ? `endTime=${encodeURI(data.endTime)}&` : ''
    params += data.money ? `money=${encodeURI(data.money)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.status ? `status=${encodeURI(data.status)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}` : ''

    // return params

    const result = await axios.get(`${apiUrl}/cardinfo/pageCardRecurd?${params}`)
    return result.data
  }

  static async selOrderPar (data) {

    let params = ''
    params += data.flowid ? `flowid=${encodeURI(data.flowid)}&` : ''

    // return params

    const result = await axios.get(`${apiUrl}/cardinfo/selOrderPar?${params}`)
    return result.data
  }

  static async CreQr (data) {

    let params = ''
    params += data.cardNum ? `cardNum=${encodeURI(data.cardNum)}&` : ''

    // return params

    const result = await axios.post(`${apiUrl}/cardinfo/CreQr?${params}`)
    return result.data
  }

  static async selShopTemp (data) {

    let params = ''
    params += data.cardNum ? `cardNum=${encodeURI(data.cardNum)}&` : ''

    // return params

    const result = await axios.get(`${apiUrl}/cardinfo/selShopTemp?${params}`)
    return result.data
  }

  static async selIsPay (data) {

    let params = ''
    params += data.cardNum ? `cardNum=${encodeURI(data.cardNum)}&` : ''

    // return params

    const result = await axios.get(`${apiUrl}/cardinfo/selIsPay?${params}`)
    return result.data
  }


  static async Charge (data) {

    let params = ''
    params += data.foodName ? `foodName=${encodeURI(data.foodName)}&` : ''
    params += data.foodPrice ? `foodPrice=${encodeURI(data.foodPrice)}&` : ''
    params += data.foodNum ? `foodNum=${encodeURI(data.foodNum)}&` : ''
    params += data.totalPrice ? `totalPrice=${encodeURI(data.totalPrice)}&` : ''
    params += data.val ? `val=${encodeURI(data.val)}&` : ''
    params += data.userId ? `userId=${encodeURI(data.userId)}&` : ''

    // return params

    const result = await axios.post(`${apiUrl}/cardinfo/Charge?${params}`)
    return result.data
  }

}

module.exports = CardInfo
