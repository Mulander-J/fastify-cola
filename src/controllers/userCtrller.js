// External Dependancies
const boom = require('boom')

// Get Data Models
const User = require('../models/User')

// Get token of session-key
exports.handleLogin = async (req, reply) => {
  try {
    // const users = await User.find()
    // grant_type 'authorization_code'

  //   var opt = {
  //     method: 'GET',
  //     url: 'https://api.weixin.qq.com/sns/jscode2session',
  //     params: {
  //         appid: appid,
  //         secret: appSecret,
  //         js_code: code,
  //         grant_type: 'authorization_code'
  //     }
  // };
  // return http(opt).then(function (response) {
  //     var data = response.data;
  //     if (!data.openid || !data.session_key || data.errcode) {
  //         return {
  //             result: -2,
  //             errmsg: data.errmsg || '返回数据字段不完整'
  //         }
  //     } else {
  //         return data
  //     }
  // });

    return {
      token:'this is a token'
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get all users
exports.getUsers = async (req, reply) => {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new user
exports.addUser = async (req, reply) => {
  try {
    const user = new User(req.body)
    return user.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing user
exports.updateUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = req.body
    const { ...updateData } = user
    const update = await User.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a user
exports.deleteUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}
