const axios = require('axios')
const env = process.env.NODE_ENV;

const apiUrl = require('./config/config')
// const baseUrl = env=== 'development' ? 'http://hzxwkj.vicp.io:11134/' : `api/`;

class CarInfo{

  static async getCarInfo (phone) {
    const result = await axios.get(`${apiUrl}/cardinfo/selCardInfo`, {
      params: {
        phone
      }
    })
    return result.data
  }

}

module.exports = CarInfo
