class Success {
  static successFormat (result) {
    if (result.code == 10000) {
      result.code = '00000'
      result.message = 'success'
    }
    return result
  }
}

module.exports = Success;
