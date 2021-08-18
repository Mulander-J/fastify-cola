// External Dependancies
const boom = require('boom')
const fs = require('fs')
const util = require('util')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
const { v4: uuidv4 } = require('uuid')

// Get Data Models
const User = require('../models/User')

// Get token of session-key
exports.getToken = async (req, reply) => {
  try {
    // const users = await User.find()
    // grant_type 'authorization_code'
    return {
      token:'this is a token'
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

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