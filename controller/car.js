const { exec, escape }  = require('../db/mysql')

const getCar = (page, makename, vechicle, transmission) => {
  // console.log(page, makename, vechicle, transmission)
  let sql = `
    select * from car where 1=1
  `
  if (makename && makename !== '') {
    sql += `and MAKE_NAME='${makename}'`
  }
  if (vechicle && vechicle !== '') {
    sql += `and VEHICLE_CLASS='${vechicle}'`
  }
  if (transmission && transmission !== '') {
    sql += `and TRANSMISSION='${transmission}'`
  }
  let count = 10
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  sql += `LIMIT ${start}, ${count}`
  // console.log(sql)
  return exec(sql)
}

const getTotal = (makename, vechicle, transmission) => {
  let sql = `
    select count(*) as total from car where 1=1
  `
  if (makename && makename !== '') {
    sql += `and MAKE_NAME='${makename}'`
  }
  if (vechicle && vechicle !== '') {
    sql += `and VEHICLE_CLASS='${vechicle}'`
  }
  if (transmission && transmission !== '') {
    sql += `and TRANSMISSION='${transmission}'`
  }
  // console.log(sql)
  return exec(sql).then((result) => {
    return result[0].total
  })
}

const getMakeName = () => {
  let sql = `
    select distinct MAKE_NAME from car
  `
  return exec(sql)
}

const getVehicleClass = () => {
  let sql = `
    select distinct VEHICLE_CLASS from car
  `
  return exec(sql)
}

const getTransmission= () => {
  let sql = `
    select distinct TRANSMISSION from car
  `
  return exec(sql)
}

module.exports = {
  getCar,
  getTotal,
  getMakeName,
  getVehicleClass,
  getTransmission
}
