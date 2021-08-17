// External Dependancies
const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  title: String,  //  小组名称
  desc: String,   //  小组描述
  avatar: String, //  小组头像
  tags: {         //  小组标签
    type: Array,
    of: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Team', teamSchema)