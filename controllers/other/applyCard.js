const axios = require('axios')
const env = process.env.NODE_ENV;

const apiUrl = require('./config/config')
// const baseUrl = env=== 'development' ? 'http://hzxwkj.vicp.io:11134/' : `api/`;

class ApplyCard{

  static async ApplyCardinfo ({openPhone, openName, openAddress, openOper}) {
    let params = ''
    params += openPhone ? `openPhone=${encodeURI(openPhone)}&` : ''
    params += openName ? `openName=${encodeURI(openName)}&` : ''
    params += openAddress ? `openAddress=${encodeURI(openAddress)}&` : ''
    params += openOper ? `openOper=${encodeURI(openOper)}` : ''
    // return `${apiUrl}/Openinfo/ApplyCardinfo?${params}`
    const result = await axios.post(`${apiUrl}/Openinfo/ApplyCardinfo?${params}`)
    return result.data
  }
}

module.exports = ApplyCard
