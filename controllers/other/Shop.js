const axios = require('axios')

const apiUrl = require('./config/config')

class Shop{

  static async upShopType (data) {
    let params = ''
    params += data.shopTypeId ? `shopTypeId=${encodeURI(data.shopTypeId)}&` : ''
    params += data.shopTypeName ? `shopTypeName=${encodeURI(data.shopTypeName)}&` : ''
    params += data.shopTypeDesc ? `shopTypeDesc=${encodeURI(data.shopTypeDesc)}&` : ''
    params += data.isShow ? `isShow=${encodeURI(data.isShow)}&` : ''

    // return params

    // return params
    const result = await axios.post(`${apiUrl}/shop/UpShopType?${params}`)
    return result.data
  }
  static async addShopCheck (data) {
    let params = ''
    params += data.shopName ? `shopName=${encodeURI(data.shopName)}&` : ''
    params += data.shopTypeId ? `shopTypeId=${encodeURI(data.shopTypeId)}&` : ''
    params += data.shopDesc ? `shopDesc=${encodeURI(data.shopDesc)}&` : ''
    params += data.applyPeople ? `applyPeople=${encodeURI(data.applyPeople)}&` : ''
    params += data.appplyNumber ? `appplyNumber=${encodeURI(data.appplyNumber)}&` : ''
    params += data.applySex ? `applySex=${encodeURI(data.applySex)}&` : ''
    params += data.applyPhone ? `applyPhone=${encodeURI(data.applyPhone)}&` : ''

    // return params

    // return params
    const result = await axios.post(`${apiUrl}/shop/addShopCheck?${params}`)
    return result.data
  }


  static async pageSelShopCheck (data) {
    let params = ''
    params += data.shopName ? `shopName=${encodeURI(data.shopName)}&` : ''
    params += data.shopTypeId ? `shopTypeId=${encodeURI(data.shopTypeId)}&` : ''
    params += data.applyTime ? `applyTime=${encodeURI(data.applyTime)}&` : ''
    params += data.applyPeople ? `applyPeople=${encodeURI(data.applyPeople)}&` : ''
    params += data.applyPhone ? `applyPhone=${encodeURI(data.applyPhone)}&` : ''
    params += data.appplyNumber ? `appplyNumber=${encodeURI(data.appplyNumber)}&` : ''
    params += data.applySex ? `applySex=${encodeURI(data.applySex)}&` : ''
    params += data.checkPeople ? `checkPeople=${encodeURI(data.checkPeople)}&` : ''
    params += data.checkTime ? `checkTime=${encodeURI(data.checkTime)}&` : ''
    params += data.checkStatus ? `checkStatus=${encodeURI(data.checkStatus)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/PageSelShopCheck?${params}`)
    return result.data
  }


  static async addShop (data) {
    let params = ''
    params += data.flowid ? `flowid=${encodeURI(data.flowid)}&` : ''
    params += data.shopName ? `shopName=${encodeURI(data.shopName)}&` : ''
    params += data.shopTypeId ? `shopTypeId=${encodeURI(data.shopTypeId)}&` : ''
    params += data.applyPhone ? `applyPhone=${encodeURI(data.applyPhone)}&` : ''
    params += data.applyPeople ? `applyPeople=${encodeURI(data.applyPeople)}&` : ''
    params += data.appplyNumber ? `appplyNumber=${encodeURI(data.appplyNumber)}&` : ''
    params += data.applySex ? `applySex=${encodeURI(data.applySex)}&` : ''
    params += data.checkPeople ? `checkPeople=${encodeURI(data.checkPeople)}&` : ''
    params += data.checkStatus ? `checkStatus=${encodeURI(data.checkStatus)}&` : ''
    params += data.resultCause ? `resultCause=${encodeURI(data.resultCause)}&` : ''

    // return params

    // return params
    const result = await axios.post(`${apiUrl}/shop/addShop?${params}`)
    return result.data
  }


  static async pageMerchant (data) {
    let params = ''
    params += data.shopTypeId ? `shopTypeId=${encodeURI(data.shopTypeId)}&` : ''
    params += data.shopName ? `shopName=${encodeURI(data.shopName)}&` : ''
    params += data.shopStatus ? `shopStatus=${encodeURI(data.shopStatus)}&` : ''
    params += data.userSex ? `userSex=${encodeURI(data.userSex)}&` : ''
    params += data.userPhone ? `userPhone=${encodeURI(data.userPhone)}&` : ''
    params += data.userName ? `userName=${encodeURI(data.userName)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/pageMerchant?${params}`)
    return result.data
  }

  // haimeixie
  static async pageShopRecordDay (data) {
    let params = ''
    params += data.userId ? `userId=${encodeURI(data.userId)}&` : ''
    params += data.createTime ? `createTime=${encodeURI(data.createTime)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/pageShopRecordDay?${params}`)
    return result.data
  }


  static async pageShopRecordMonth (data) {
    let params = ''
    params += data.userId ? `userId=${encodeURI(data.userId)}&` : ''
    params += data.createTime ? `createTime=${encodeURI(data.createTime)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/pageShopRecordMonth?${params}`)
    return result.data
  }


  static async pageShopRecordYear (data) {
    let params = ''
    params += data.userId ? `userId=${encodeURI(data.userId)}&` : ''
    params += data.createTime ? `createTime=${encodeURI(data.createTime)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/pageShopRecordYear?${params}`)
    return result.data
  }

  static async selPayCount (data) {
    let params = ''
    params += data.createTime ? `createTime=${encodeURI(data.createTime)}&` : ''
    params += data.ide ? `ide=${encodeURI(data.ide)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/selPayCount?${params}`)
    return result.data
  }


  static async selRefund (data) {
    let params = ''
    params += data.createTime ? `createTime=${encodeURI(data.createTime)}&` : ''
    params += data.ide ? `ide=${encodeURI(data.ide)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/selRefund?${params}`)
    return result.data
  }


  static async exprRecord (data) {
    let params = ''
    params += data.createTime ? `createTime=${encodeURI(data.createTime)}&` : ''
    params += data.status ? `status=${encodeURI(data.status)}&` : ''

    // return params

    // return params
    const result = await axios.get(`${apiUrl}/shop/exprRecord?${params}`)
    return result.data
  }
}

module.exports = Shop
