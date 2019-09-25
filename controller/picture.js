const { exec }  = require('../db/mysql')

const getAllBrand = () => {
  const sql = `
  select  c.*,p.* from picture as c left join picture p on c.parent_id = p.id
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

module.exports = {
  getAllBrand,
  addBrand
}