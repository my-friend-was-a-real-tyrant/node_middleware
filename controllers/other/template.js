const axios = require('axios')
const FormData = require('form-data')
const send = require('koa-send');
const apiUrl = require('./config/config')
// const fs = require('fs-extra')
const fs = require('fs')
const multiparty = require("multiparty");
const pp = require('path')
const _readFile = (path) => {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      if (err) {
        resolve(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

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
