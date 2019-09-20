const { exec }  = require('../db/mysql')


const createArticle= (article = {}, authorId, author, avatar, state) => {
  const createTime = Date.now()
  const { title, content, imageUrl, intro } = article
  const sql = `
    insert into article (authorId, author, title, content, avatar, article_img, createTime, list_show_text, state) 
    values (${authorId}, '${author}', '${title}', '${content}', '${avatar}', '${imageUrl}', ${createTime}, '${intro}', ${state})
  `
  return exec(sql).then((insertData) => {
    return {
      msg: '发布成功'
    }
  })
}

const getArticleList = (page) => {
  let sql = `
    select * from article where state=1
  `
  let count = 3
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

const getTotal = () => {
  let sql = `
    select count(*) as total from article where 1=1
  `
  return exec(sql).then((result) => {
    return result[0].total
  })
}

const getMyArticleList = (page, authorId) => {
  let sql = `
    select * from article where authorId=${authorId}
  `
  let count = 3
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  sql += `LIMIT ${start}, ${count}`
  return exec(sql)
}

const getMyTotal = (authorId) => {
  let sql = `
    select count(*) as total from article where authorId=${authorId}
  `
  return exec(sql).then((result) => {
    return result[0].total
  })
}

const getReadyArticleList = (page) => {
  let sql = `
    select * from article where state=0
  `
  let count = 3
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  sql += `LIMIT ${start}, ${count}`
  return exec(sql)
}

const getReadyTotal = () => {
  let sql = `
    select count(*) as total from article where state=0
  `
  return exec(sql).then((result) => {
    return result[0].total
  })
}

module.exports = {
  createArticle,
  getArticleList,
  getTotal,
  getMyArticleList,
  getMyTotal,
  getReadyArticleList,
  getReadyTotal
}