var express = require('express');
var router = express.Router();
const { toTopArticle, deleteArticle, updateArticleDetail, getArticleDetail, failCheck, successCheck, createArticle, getArticleList, getTotal, getMyArticleList, getMyTotal, getReadyArticleList, getReadyTotal }  = require('../controller/article')
const { SuccessModel, ErrorModel } = require('../model/resModel')


router.post('/createArticle', (req, res, next) => {
  const data = req.body
  const { userId, realname, avatar, isAdmin } = req.session
  let state;
  if (isAdmin == 1) {
    state = 1
  } else {
    state = 0
  }
  const result = createArticle(data, userId, realname, avatar, state)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
})

router.post('/getArticleList', (req, res, next) => {
  let page = req.body.page || ''
  const result = getArticleList(page)
  let p1 = new Promise((resolve, reject) => {
    result.then((data) => {
      resolve(data)
    })
  })
  let p2 = new Promise((resolve, reject) => {
    getTotal().then((data) => {
      resolve(data)
    })
  })
  Promise.all([p1, p2]).then((values) => {
    if (values) {
      let info = {
        data: values[0],
        total: values[1],
        isAdmin: req.session.isAdmin
      }
      res.json(
        new SuccessModel(info, 'success')
      )
    }
  })
})

router.post('/getMyArticleList', (req, res, next) => {
  let page = req.body.page || ''
  let authorId = req.session.userId
  const result = getMyArticleList(page, authorId)
  let p1 = new Promise((resolve, reject) => {
    result.then((data) => {
      resolve(data)
    })
  })
  let p2 = new Promise((resolve, reject) => {
    getMyTotal(authorId).then((data) => {
      resolve(data)
    })
  })
  Promise.all([p1, p2]).then((values) => {
    if (values) {
      let info = {
        data: values[0],
        total: values[1]
      }
      res.json(
        new SuccessModel(info, 'success')
      )
    }
  })
})

router.post('/getReadyArticleList', (req, res, next) => {
  let page = req.body.page || ''
  const result = getReadyArticleList(page)
  let p1 = new Promise((resolve, reject) => {
    result.then((data) => {
      resolve(data)
    })
  })
  let p2 = new Promise((resolve, reject) => {
    getReadyTotal().then((data) => {
      resolve(data)
    })
  })
  Promise.all([p1, p2]).then((values) => {
    if (values) {
      let info = {
        data: values[0],
        total: values[1]
      }
      res.json(
        new SuccessModel(info, 'success')
      )
    }
  })
})

router.post('/successCheck', (req, res, next) => {
  let array = req.body.idArray
  const result = successCheck(array)
  return result.then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

router.post('/failCheck', (req, res, next) => {
  let array = req.body.idArray
  let reason = req.body.reason
  const result = failCheck(array, reason)
  return result.then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

router.post('/getArticleDetail', (req, res, next) => {
  let id = req.body.id;
  const result = getArticleDetail(id)
  return result.then((result) => {
    if (result) {
      res.json(
        new SuccessModel(result, 'success')
      )
    } else {
      res.json(
        new ErrorModel('error')
      )
    }
  })
})

router.post('/updateArticleDetail', (req, res, next) => {
  const article = req.body
  const result = updateArticleDetail(article)
  return result.then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

router.post('/deleteArticle', (req, res, next) => {
  let array = req.body.idArray
  const result = deleteArticle(array)
  return result.then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

router.post('/toTopArticle', (req, res, next) => {
  let array = req.body.idArray
  const result = toTopArticle(array)
  return result.then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})
module.exports = router;