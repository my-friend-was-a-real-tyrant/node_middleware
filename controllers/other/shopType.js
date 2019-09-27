const axios = require('axios')

const apiUrl = require('./config/config')

class ShopType{

  static async addShopType (data) {
    let params = ''
    params += data.shopTypeName ? `shopTypeName=${encodeURI(data.shopTypeName)}&` : ''
    params += data.shopTypeDesc ? `shopTypeDesc=${encodeURI(data.shopTypeDesc)}&` : ''
    params += data.isShow ? `isShow=${encodeURI(data.isShow)}&` : ''

    // return params

    const result = await axios.post(`${apiUrl}/shop/addShopType?${params}`)
    return result.data
  }

  static async getShopType () {
    const result = await axios.get(`${apiUrl}/shop/selShopType`)
    return result.data
  }


  static async selShopTypeOne () {
    const result = await axios.get(`${apiUrl}/shop/selShopTypeOne`)
    return result.data
  }

}

module.exports = ShopType
