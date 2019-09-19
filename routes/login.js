var express = require('express');
var router = express.Router();
const { addUser, checkUser, login, modifyUser, getUserList, getTotalUser, delUser, getUserInfo, searchRealName }  = require('../controller/login')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const adminCheck = require('../middleware/adminCheck')

// const { genPassword } = require('../utils/cryp')


/* GET home page. */
router.post('/addUser', function(req, res, next) {
  const data = req.body
  const result = addUser(data)
  return result.then(result => {
    if (result) {
      res.json(
        new SuccessModel(result, 'success')
      )
    } else {
      res.json(
        new ErrorModel('error')
      )
    }
  })
});

router.post('/checkUser', function(req, res, next) {
  const data = req.body
  const result = checkUser(data)
  return result.then(result => {
    // console.log(result[0])
    if (result[0]) {
      res.json(
        new ErrorModel('账号名已被注册')
      )
    } else {
      res.json(
        new SuccessModel('ok')
      )
    }
  })
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then((data) => {
    console.log(data)
    if (data && data.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      req.session.isAdmin = data.isAdmin
      req.session.userId = data.id;
      if (data.avatar) {
        req.session.avatar = data.avatar;
      } else {
        req.session.avatar = '';
      }
      res.json(new SuccessModel('登录成功'))
    } else {
      res.json(new ErrorModel('账号密码错误'))
    }
  })
})

router.get('/login-test', (req, res, next) => {
  const session = req.session;
  if (session.username) {
    res.json({
      errno: 0,
      msg: '已登录'
    })
  } else {
    res.json({
      errno: -1,
      msg: '未登录'
    })
  }
})

router.get('/logout', (req, res, next) => {
  const session = req.session;
  session.destroy();
  if (typeof session.username != 'string') {
    res.json({
      errno: 0,
      msg: '退出成功'
    })
  } else {
    res.json({
      errno: -1,
      msg: '数据错误'
    })
  }
})
// 获取自己的信息
router.get('/getMyInfo', (req, res, next) => {
  const session = req.session;
  if (session.username) {
    let result = {
      username: session.username,
      realname: session.realname,
      id: session.id,
      avatar: session.avatar
    }
    res.json(new SuccessModel(result, '获取成功'))
  }
})

// 修改自己的信息
router.post('/modifyUserInfo', (req, res, next) => {
  const session = req.session;
  const { username, realname, avatar } = req.body
  const result = modifyUser(session.userId, username, realname, avatar);
  return result.then((data) => {
    if (data) {
      req.session.username = username
      req.session.realname = realname
      req.session.avatar = avatar
      res.json({
        errno: 0,
        msg: '修改成功'
      })
    } else {
      res.json({
        errno: -1,
        msg: '数据错误'
      })
    }
  })
})
// 管理员修改别人的信息
router.post('/modifyOtherInfo', adminCheck, (req, res, next) => {
  const { id, username, realname, avatar } = req.body
  const result = modifyUser(id, username, realname, avatar)
  return result.then((data) => {
    if (data) {
      res.json({
        errno: 0,
        msg: '修改成功'
      })
    } else {
      res.json({
        errno: -1,
        msg: '数据错误'
      })
    }
  })
})
// 管理员删除用户
router.post('/delUser', adminCheck, (req, res, next) => {
  const { id } = req.body
  const result = delUser(id)
  return result.then((data) => {
    res.json(
      new SuccessModel(data, '删除成功')
    )
  })
})

// 获取用户列表（管理员验证）
router.post('/getUserList', adminCheck, (req, res, next) => {
  const { page } = req.body
  const result = getUserList(page)
  let p1 = new Promise(resolve => {
    result.then((data) => {
      resolve(data)
    })
  })
  let p2 = new Promise(resolve => {
    getTotalUser().then((data) => {
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
})

// 管理员获取某个用户的详情
router.post('/getUserInfo', adminCheck, (req, res, next) => {
  let { id } = req.body
  const result = getUserInfo(id)
  return result.then((data) => {
    res.json(new SuccessModel(data[0], '获取成功'))
  })
})

// 管理员搜索某个用户
router.post('/searchUser', adminCheck, (req, res, next) => {
  let { key } = req.body
  const result = searchRealName(key)
  return result.then((data) => {
    res.json(
      new SuccessModel(data, 'success')
    )
  })

})

module.exports = router;
