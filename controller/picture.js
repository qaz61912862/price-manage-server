const { exec }  = require('../db/mysql')

const getAllBrand = () => {
  const sql = `
  select id,name,parent_id from picture where parent_id=0
  `
  return exec(sql)
}

const addBrand = (name, parent_id, type) => {
  const sql = `
    insert into picture (name, parent_id, type) values ('${name}', ${parent_id}, ${type})
  `
  return exec(sql).then((insertData) => {
    return {
      msg: '添加成功'
    }
  })
}

const getCorrespondingBrand = (parent_id, type) => {
  const sql = `
  select id,name,parent_id from picture where parent_id=${parent_id} and type=${type}
  `
  return exec(sql)
}

const saveImageForCar = (array, parent_id) => {
  const sql = `
    insert into picture (picture, name, parent_id, type) values ('${array}', '图片', ${parent_id}, 4)
  `
  // console.log(sql)
  return exec(sql).then((insertData) => {
    return {
      msg: '添加成功'
    }
  })
}

const updateImageForCar = (array, parent_id) => {
  // const sql = `
  //   update picture set picture='${array}' where 
  // `
  // console.log(sql)
  return exec(sql).then((insertData) => {
    return {
      msg: '添加成功'
    }
  })
}

const getImageList = (parent_id) => {
  const sql = `
    select picture from picture where parent_id=${parent_id} and type=4
  `
  // console.log(sql)
  return exec(sql).then((result) => {
    return result[0]
  })
}

module.exports = {
  getCorrespondingBrand,
  getAllBrand,
  addBrand,
  saveImageForCar,
  getImageList
}