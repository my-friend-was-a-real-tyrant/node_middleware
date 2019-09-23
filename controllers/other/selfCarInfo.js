const Service = require('./index')
const axios = require('axios')
const env = process.env.NODE_ENV;
const baseUrl = env=== 'development' ? 'http://hzxwkj.vicp.io:11134/' : `api/`;

class CarInfo extends Service{
  constructor () {
    super()
  }
  static async getCarInfo (phone) {
    const result = await axios.get(`http://hzxwkj.vicp.io:11134/cardinfo/selCardInfo`, {
      params: {
        phone
      }
    })
    return result.data
  }
}

module.exports = CarInfo
