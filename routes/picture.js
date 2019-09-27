var express = require('express');
var router = express.Router();
const { getAllBrand, addBrand, getCorrespondingBrand, saveImageForCar, getImageList }  = require('../controller/picture')
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
  const {name, parent_id, type} = req.body
  const result = addBrand(name, parent_id, type)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })

})

router.post('/getCorrespondingBrand', (req, res, next) => {
  const { parent_id, type } = req.body
  const result = getCorrespondingBrand(parent_id, type)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
})

router.post('/saveImageForCar', (req, res, next) => {
  const { parent_id, picture } = req.body
  const result = saveImageForCar(picture, parent_id)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
})

router.post('/getImageList', (req, res, next) => {
  const { parent_id } = req.body
  const result = getImageList(parent_id)
  return result.then((detail) => {
    // console.log(detail)
    res.json(
      new SuccessModel(JSON.parse(detail.picture), 'success')
    )
  })
})

module.exports = router;
