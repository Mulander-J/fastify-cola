const mongoose = require('mongoose')
// mongoose-mpath (https://www.npmjs.com/package/mongoose-mpath#getancestors)
const MpathPlugin = require('mongoose-mpath')


const taskSchema = new mongoose.Schema({
    // 小组 ID 
    team: {
        type: mongoose.Schema.Types.ObjectId,
        // 引用 Team 的模型
        ref: "Team",
        default: null,
        // required: true
    },
    title: { type: String, required: true },  //  任务标题
    desc: String,   //  任务描述
    remark: String, //  任务备注
    tags: { type: Array, of: String },  //  标签列表

    priority: { type: Number, default: 0, min:0, max: 5 }, //  优先级0-5
    status: { type: Number, default: 0, min:0, max: 5 },   //  执行状态0-5
    score: { type: Number, default: 0, min:0, max: 10 },   //  复盘打分0-10

    issuer: { 
      type: Array, 
      of: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        default: null
      }
    },     //  干系人列表
    responser: { 
      type: Array, 
      of: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        default: null
      }
    },  //  负责人列表
    // watchers: { type: Array, of: String} //  关注者列表

    open_at: { type: Date, default: null },     //  启动日期
    devFinish_at: { type: Date, default: null },     //  提测日期
    finish_at: { type: Date, default: null },     //  完成日期 
    close_at: { type: Date, default: null },    //  关闭日期

    alpha_at: { type: Date, default: null },    //  alpha测日期
    beta_at: { type: Date, default: null },     //  beta测日期
    relase_at: { type: Date, default: null },   //  发版日期

    expandObj: { type: Object, default: null }, //  预留字段（任意键值对）

  }, { timestamps: true })

taskSchema.plugin(MpathPlugin,{
  pathSeparator: '#',              // String used to separate ids in path
  onDelete:      'DELETE',       // 'REPARENT' or 'DELETE'
  // idType:        Schema.ObjectId   // Type used for model id
});

module.exports = mongoose.model('Task', taskSchema)