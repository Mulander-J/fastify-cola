const mongoose = require('mongoose')
const MpathPlugin = require('mongoose-mpath')



const taskSchema = new mongoose.Schema({
     // 小组 ID
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        // 引用 Team 的模型
        ref: "Team",
        required: true
    },

    title: { type: String, required: true },  //  任务标题
    desc: String,   //  任务描述
    remark: String, //  任务备注
    tags: { type: Array, of: String },  //  标签列表

    priority: { type: Number, default: 1, min:1, max: 5 }, //  优先级1-5
    status: { type: Number, default: 1, min:1, max: 5 },   //  执行状态1-5
    score: { type: Number, default: 1, min:1, max: 10 },   //  复盘打分1-10

    issuer: {type: Array, of: String },     //  干系人列表
    responser: {type: Array, of: String },  //  负责人列表
    // watchers: { type: Array, of: String} //  关注者列表

    open_at: { type: Date, default: Date.now },     //  启动日期
    close_at: { type: Date, default: Date.now },    //  关闭日期

    alpha_at: { type: Date, default: Date.now },    //  alpha测日期
    beta_at: { type: Date, default: Date.now },     //  beta测日期
    relase_at: { type: Date, default: Date.now },   //  发版日期

    expandObj: { type: Object, default: null }, //  预留字段（任意键值对）

  }, { timestamps: true })

taskSchema.plugin(MpathPlugin,{
  pathSeparator: '#',              // String used to separate ids in path
  onDelete:      'DELETE',       // 'REPARENT' or 'DELETE'
  // idType:        Schema.ObjectId   // Type used for model id
});

module.exports = mongoose.model('Task', taskSchema)