const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  if (req.session.isAdmin == 1) {
    next()
    return
  } else {
    res.json(
      new ErrorModel('没有权限')
    )
  }
}