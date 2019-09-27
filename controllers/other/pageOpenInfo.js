const axios = require('axios')

const apiUrl = require('./config/config')
// const baseUrl = env=== 'development' ? 'http://hzxwkj.vicp.io:11134/' : `api/`;

class OpenInfo{

  static async getOpenInfo (data) {
    let params = ''
    params += data.openPhone ? `openPhone=${encodeURI(data.openPhone)}&` : ''
    params += data.openName ? `openName=${encodeURI(data.openName)}&` : ''
    params += data.openAddress ? `openAddress=${encodeURI(data.openAddress)}&` : ''
    params += data.openStatus ? `openStatus=${encodeURI(data.openStatus)}&` : ''
    params += data.openOper ? `openOper=${encodeURI(data.openOper)}&` : ''
    params += data.checkOper ? `checkOper=${encodeURI(data.checkOper)}&` : ''
    params += data.upTime ? `upTime=${encodeURI(data.upTime)}&` : ''
    params += data.checkTime ? `checkTime=${encodeURI(data.checkTime)}&` : ''
    params += data.pageNumber ? `pageNumber=${encodeURI(data.pageNumber)}&` : ''
    params += data.pageSize ? `pageSize=${encodeURI(data.pageSize)}` : ''
    // return params
    const result = await axios.get(`${apiUrl}/Openinfo/PageOpenInfo?${params}`)
    return result.data
  }
}

module.exports = OpenInfo
