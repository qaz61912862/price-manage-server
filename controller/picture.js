const { exec }  = require('../db/mysql')

const getAllBrand = () => {
  const sql = `
  select id,name,parent_id from picture where parent_id=0
  `
  return exec(sql)
}

const addBrand = (name, parent_id) => {
  const sql = `
    insert into picture (name, parent_id) values ('${name}', ${parent_id})
  `
  return exec(sql).then((insertData) => {
    return {
      msg: '添加成功'
    }
  })
}

const getCorrespondingBrand = (parent_id) => {
  const sql = `
  select id,name,parent_id from picture where parent_id=${parent_id}
  `
  return exec(sql)
}


module.exports = {
  getCorrespondingBrand,
  getAllBrand,
  addBrand
}