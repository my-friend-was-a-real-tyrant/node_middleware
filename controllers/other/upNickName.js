const axios = require('axios')

const apiUrl = require('./config/config')
// const baseUrl = env=== 'development' ? 'http://hzxwkj.vicp.io:11134/' : `api/`;

class UpNickName{

  static async UpNickName (data) {
    let params = ''
    params += data.cardNum ? `cardNum=${data.cardNum}&` : ''
    params += data.nickName ? `nickName=${encodeURI(data.nickName)}` : ''
    // return params

    const result = await axios.post(`${apiUrl}/cardinfo/UpNickName?${params}`)
    return result.data
  }
}

module.exports = UpNickName
