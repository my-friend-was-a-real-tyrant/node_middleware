const axios = require('axios')

const apiUrl = require('./config/config')
// const baseUrl = env=== 'development' ? 'http://hzxwkj.vicp.io:11134/' : `api/`;

class CheckInfo{

  static async getCheckInfo (data) {
    let params = ''
    params += data.openPhone ? `openPhone=${encodeURI(data.openPhone)}&` : ''
    params += data.openName ? `openName=${encodeURI(data.openName)}&` : ''
    params += data.flowid ? `flowid=${encodeURI(data.flowid)}&` : ''
    params += data.openStatus ? `openStatus=${encodeURI(data.openStatus)}&` : ''
    params += data.openAddress ? `openAddress=${encodeURI(data.openAddress)}&` : ''
    params += data.checkOper ? `checkOper=${encodeURI(data.checkOper)}` : ''

    // return params

    const result = await axios.post(`${apiUrl}/Openinfo/checkInfo?${params}`)
    return result.data
  }
}

module.exports = CheckInfo
