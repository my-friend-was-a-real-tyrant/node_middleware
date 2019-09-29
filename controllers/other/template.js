const axios = require('axios')
const apiUrl = require('./config/config')
const fs = require('fs')

class Template {

  static async saveTemplate (path) {
    const result = await axios.post(`${apiUrl}/Openinfo/ImplCardinfo?filePath=${encodeURI(path)}`)
    // return JSON.stringify(path)
    return result.data
  }

  static async savePaylist (path) {

    const result = await axios.post(`${apiUrl}/cardinfo/paylist?filePath=${encodeURI(path)}`)
    // return JSON.stringify(path)
    return result.data
    // return path
  }
}
module.exports = Template
