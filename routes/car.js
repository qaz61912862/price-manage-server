var express = require('express');
var router = express.Router();
const { getCar, getTotal, getMakeName, getVehicleClass, getTransmission }  = require('../controller/car')
const { SuccessModel } = require('../model/resModel')

/* GET home page. */
router.post('/list', function(req, res, next) {
  let page = req.body.page || ''
  let makename = req.body.MAKE_NAME || ''
  let vechicle = req.body.VEHICLE_CLASS || ''
  let transmission = req.body.TRANSMISSION || ''
  // let { makename, vechicle, transmission } = req.body
  const result = getCar(page, makename, vechicle, transmission)
  let p1 = new Promise((resolve, reject) => {
    result.then((data) => {
      resolve(data)
    })
  })
  let p2 = new Promise((resolve, reject) => {
    getTotal(makename, vechicle, transmission).then((data) => {
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
});

router.get('/getMakeName', (req, res, next) => {
  return getMakeName().then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

router.get('/getVehicleClass', (req, res, next) => {
  return getVehicleClass().then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

router.get('/getTransmission', (req, res, next) => {
  return getTransmission().then((result) => {
    res.json(
      new SuccessModel(result, 'success')
    )
  })
})

module.exports = router;
