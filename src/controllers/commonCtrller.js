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

const nodes = require('../config/task.base')
const Task = require('../models/Task')

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