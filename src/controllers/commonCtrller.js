// External Dependancies
const boom = require('boom')
const fs = require('fs')
const util = require('util')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
const { v4: uuidv4 } = require('uuid')
const Jieba = require('js-jieba/dist/jieba')
const {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} = require('js-jieba/dist/dict.zh-cn')

const jieba = Jieba(
  Buffer.from(JiebaDict),
  Buffer.from(HMMModel),
  Buffer.from(UserDict),
  Buffer.from(IDF),
  Buffer.from(StopWords)
)
const {getCode}  = require('../utils/index.js')

const nodes = require('../config/task.base')
const Task = require('../models/Task')
const Fredis = require('../models/Fredis')

// upload file
exports.uploadFile = async (req, reply) => {
  try {
    const prefix = 'public/'
    const options = { limits: { fileSize: 1000000, files: 1 } };
    const data = await req.file(options)
    const fileName = data.filename.toString()
    const fileType = fileName.match(/[.][^.]+$/)[0]
    const randomPath = prefix + uuidv4() + fileType
    await pump(data.file, fs.createWriteStream(randomPath))
    reply.send({
      fileName,
      timeStamp: Date.now(),
      path:randomPath
    })
  } catch (err) {
    throw boom.boomify(err)
  }
}
// get file
exports.getFile = async (req, reply) => {
  const fileName = req.params.file
  return reply.sendFile(fileName) 
}
// get keywords by jieba from task.title
exports.getJieba = async (req, reply) => {
  try{
    const sources = await Task.find({ 
      title: { 
        $nin: [
          ...nodes.initialNodes,
          ...nodes.processNodes,
        ] 
      } 
    })
    const words = sources.map(e=>e.title).join("  ")
    let {mode='tag',topk=5} = req.query
    switch (mode){
      case 'top':
        if(topk<=5)topk = 5
        return jieba.extract(words, topk).map(e=>e.word)
      case 'tag':
      default:
          const arr = jieba.tag(words)
          let map = {}
          arr.forEach(t=>{ (map[t[1]]||(map[t[1]] = [])).push(t[0]) })
          Object.keys(map).forEach(k=>{ map[k] = Array.from(new Set(map[k])) })
          return map
    }
  }catch(err){
    throw boom.boomify(err)
  }
}

// get encode
exports.myEncode = async (req, reply) => {
  const { target, namespace="default" } = req.query
  try {
    let code = ''
    let existed = true
    let safeCount = 5

    do {
      code = getCode()
      existed = await Fredis.findOne({code})
      safeCount--
      // console.log('[ safeCount ] >', safeCount, existed)
    } while(existed && safeCount >0)
    if(existed){
      throw Error('请稍后再试')
    }else{
      const expire_at  = new Date().getTime() + 1000 * 3600 * 24
      const fredis = new Fredis({ target, namespace, code, expire_at })
      return fredis.save()
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}
// get decode
exports.myDecode = async (req, reply) => {
  const code = req.params.code
  const fredis = await Fredis.findOne({code})
  if(fredis){
    if(fredis.expire_at < Date.now()){
      throw Error('Code Is Expired!')
    }else{
      return fredis
    }
  }else{
    throw Error('Code Is Not Find!')
  }
  return reply.sendFile(fileName) 
}