var express = require('express');
var router = express.Router();
const { getAllBrand, addBrand }  = require('../controller/picture')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/getAllBrand', (req, res, next) => {
  const result = getAllBrand()
  return result.then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

router.post('/addBrand', (req, res, next) => {
  const {name, parent_id} = req.body
  const result = addBrand(name, parent_id)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })

})

module.exports = router;
