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
    select * from article where state=1 order by is_hot desc, updateTime desc, id desc
  `
  let count = 3
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  // sql += `LIMIT ${start}, ${count}`
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
    select * from article where authorId=${authorId} order by id desc
  `
  let count = 3
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  // sql += `LIMIT ${start}, ${count}`
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
    select * from article where state=0 order by id desc
  `
  let count = 3
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  // sql += `LIMIT ${start}, ${count}`
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

const successCheck = (array) => {
  let str = array.join(',')
  let sql = `
    update article set state=1 where id in (${str})
  `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const failCheck = (array, reason) => {
  let str = array.join(',')
  let sql = `
    update article set state=2, reason='${reason}' where id in (${str})
  `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const getArticleDetail = (id) => {
  let sql = `
    select * from article where id=${id}
  `
  return exec(sql).then((result) => {
    return result[0]
  })
}

const updateArticleDetail = (article = {}) => {
  const { id, title, imageUrl, intro, content } = article
  let sql = `
    update article set title='${title}', article_img='${imageUrl}', list_show_text='${intro}', content='${content}', state=0 where id=${id}
  `
  return exec(sql).then((insertData) => {
    return {
      msg: '发布成功'
    }
  })
  
}

const deleteArticle = (array) => {
  let str = array.join(',')
  let sql = `
    update article set state=3 where id in (${str})
  `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const toTopArticle = (array) => {
  let str = array.join(',')
  let time = Date.now()
  let sql = `
    update article set is_hot = 1, updateTime = ${time} where id in (${str})
  `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

module.exports = {
  toTopArticle,
  createArticle,
  getArticleList,
  getTotal,
  getMyArticleList,
  getMyTotal,
  getReadyArticleList,
  getReadyTotal,
  successCheck,
  failCheck,
  getArticleDetail,
  updateArticleDetail,
  deleteArticle
}