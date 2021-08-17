// External Dependancies
const boom = require('boom')
const fs = require('fs')
const util = require('util')
const path = require('path')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)

// Get Data Models
const User = require('../models/User')

// Get token of session-key
exports.getToken = async (req, reply) => {
  try {
    const users = await User.find()
    // grant_type 'authorization_code'
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// upload avatar
exports.uploadAvatar = async (req, reply) => {
  try {
    const prefix = 'cache/imgs/'
    const options = { limits: { fileSize: 1000000, files: 1 } };
    const data = await req.file(options)
    const fileName = data.filename.toString()
    const fileType = fileName.match(/[.][^.]+$/)[0]
    const randomPath = prefix + new Date().getTime() + fileType
    await pump(data.file, fs.createWriteStream(randomPath))
    reply.send({fileName,path:randomPath})
  } catch (err) {
    throw boom.boomify(err)
  }
}