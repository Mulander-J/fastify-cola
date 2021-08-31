// External Dependancies
const mongoose = require('mongoose')

const fredisSchema = new mongoose.Schema({
  code: { type: String, required: true },  //  短编码
  target: { type: String, required: true },   //  关联ID
  expire_at: { type: Date, default: null }, //  过期时间
  namespace: String     //  作用域
}, { timestamps: true })

module.exports = mongoose.model('Fredis', fredisSchema)