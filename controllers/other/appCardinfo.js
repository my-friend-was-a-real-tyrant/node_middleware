const Service = require('./index')

class ApplyCardinfo extends Service{
  constructor () {
    super()
  }
  static async getApplyCardinfo ({openPhone, openName, openAddress, openOper}) {
    const result = await this.axios.post(`${this.baseUrl}/Openinfo/ApplyCardinfo`, {
      openPhone, openName, openAddress, openOper
    })
    return result
  }
}
