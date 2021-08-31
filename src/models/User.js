// External Dependancies
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  openId: { type: String, required: true, unique: true },
  userInfo: { type: Object, default: null }, //  用户信息
  isActive: { type: Boolean, default: false }, //  是否激活
  skey: { type: String, default: '' },   //  登陆凭证
  remote: { type: String, default: '' }, //  登录IP
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)