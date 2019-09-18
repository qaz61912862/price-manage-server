class BaseModule {
  constructor(data, msg) {
    if (Object.prototype.toString.call(data) == '[object String]') {
      this.msg = data
      data = null
      msg = null
    }
    if (data) {
      this.data = data
    }
    if (msg) {
      this.msg = msg
    }
  }
}

class SuccessModel extends BaseModule{
  constructor(data,msg) {
    super(data, msg)
    this.errno = 0
  }
}

class ErrorModel extends BaseModule{
  constructor(data,msg) {
    super(data, msg)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}