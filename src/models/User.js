// External Dependancies
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  //  用户名
  pwd: String,  //  密码
  email: String,  //  邮箱
  avatar: { type: String, default: '' }, //  用户头像
  location: { type: String, default: '' }, //  登录IP/GIS位置
  isActive: { type: Boolean, default: false }, //  是否激活
  skey: String,   //  登陆凭证
  options: Object //  配置参数
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)