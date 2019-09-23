const axios = require('axios')

const env = process.env.NODE_ENV;
const baseUrl = env=== 'development' ? 'http://hzxwkj.vicp.io:11134/' : `api/`;


class Service {
  constructor () {
    this.axios = axios
    this.baseUrl = baseUrl
  }
}

module.exports = Service
