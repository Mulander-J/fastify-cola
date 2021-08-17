// External Dependancies
const boom = require('boom')

// Get Data Models
const Task = require('../models/Task')

// Get all tasks By Tree
exports.getTaskByTree = async (req, reply) => {
  try {
    const {parent} = req.query
    // console.log('parent======>', parent)  //611a37c271c8309d6b85dacf
    let tree = []
    if(parent){
      const pNode = await Task.findById(parent)
      tree = await pNode.getChildrenTree({});
    }else{
      tree = await Task.getChildrenTree({});
    }
    return tree
  } catch (err) {
    throw boom.boomify(err)
  }
}
// Get all task heads
exports.getTaskHeads = async (req, reply) => {
  try { 
    const filterKeys = ["team_id","title","priority","status"]
    let filters = {}
    filterKeys.forEach(k=>{
      req.query[k] && (filters[k] = req.query[k])
    })

    const tasks = await Task.getChildrenTree({
      minLevel: 1,
      maxLevel: 1,
      filters
    })
    return tasks
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get all tasks
exports.getTasks = async (req, reply) => {
  try {
    const tasks = await Task.find()
    return tasks
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single task by ID
exports.getSingleTask = async (req, reply) => {
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    return task
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new task
exports.addTask = async (req, reply) => {
  try {
    let task = null, pNode = null;
    const parentId = req.query.parent
    if(parentId){
      pNode = await Task.findById(parentId) || null
    }
    task = new Task({
      ...req.body,
      parent: pNode
    })
    return task.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing task
exports.updateTask = async (req, reply) => {
  try {
    const id = req.params.id
    const task = req.body
    const { ...updateData } = task
    const update = await Task.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a task
exports.deleteTask = async (req, reply) => {
  try {
    const id = req.params.id
    const task = await Task.findByIdAndRemove(id)
    return task
  } catch (err) {
    throw boom.boomify(err)
  }
}
