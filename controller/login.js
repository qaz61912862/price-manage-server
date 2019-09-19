const { exec, escape }  = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const xss = require('xss')

const addUser = (userData = {}) => {
  const username = xss(userData.username)
  const password = xss(genPassword(userData.password))
  const realname = xss(userData.realname)
  const createtime = Date.now()
  console.log(username, password, realname, createtime)
  const sql = `
    insert into users (username, password, realname, createtime) 
    values ('${username}', '${password}', '${realname}', '${createtime}')
  `
  return exec(sql).then((insertData) => {
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  })
}

const checkUser = (data = {}) => {
  const name = xss(data.username)
  const sql = `
    select * from users where username='${name}'
  `
  return exec(sql).then((result) => {
    return result
  })
}

const login = (username, password) => {
  username = escape(username)
  password = escape(genPassword(password))
  const sql = `
  select username, avatar, realname, id, isAdmin from users where username=${username} and password=${password}
  `
  return exec(sql).then((res) => {
    return res[0]
  })
}

const modifyUser = (id, username, realname, avatar) => {
  const sql = `
  update users set username='${username}', realname='${realname}', avatar='${avatar}' where id='${id}'
  `
  return exec(sql).then((result) => {
    return result
  })
}

const getUserList = (page) => {
  let sql = `
  select * from manage.users
  `
  let count = 10
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  sql += `LIMIT ${start}, ${count}`
  console.log(sql)
  return exec(sql)
}

const getTotalUser = () => {
  let sql = `
    select count(*) as total from users
  `
  return exec(sql).then((result) => {
    return result[0].total
  })
}

const delUser = (id) => {
  let sql = `
    delete from users where id=${id}
  `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const getUserInfo = (id) => {
  let sql = `
    select id, username, realname, avatar from users where id=${id}
  `
  return exec(sql)
}

const searchRealName = (key) => {
  let sql = `
    select * from users where realname like '%${key}%'
  `
  return exec(sql)
}
module.exports = {
  addUser,
  checkUser,
  login,
  modifyUser,
  getUserList,
  getTotalUser,
  delUser,
  getUserInfo,
  searchRealName
}