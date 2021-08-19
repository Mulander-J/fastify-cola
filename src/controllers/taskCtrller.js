// External Dependancies
const boom = require('boom')

// Get Data Models
const Task = require('../models/Task')

const taskPopulate =[
  { path: 'team', select:'_id title avatar' },
  { path: 'issuer', select:'_id name avatar' },
  { path: 'responser', select:'_id name avatar' }
]

// Get all tasks By Tree
exports.getTaskByTree = async (req, reply) => {
  try {
    const {parent} = req.query
    // console.log('parent======>', parent)  //611a37c271c8309d6b85dacf
    let tree = []
    if(parent){
      const pNode = await Task.findById(parent)
      tree = await pNode.getChildrenTree({ populate: taskPopulate });
    }else{
      tree = await Task.getChildrenTree({ populate: taskPopulate });
    }
    return tree
  } catch (err) {
    throw boom.boomify(err)
  }
}
// Get all task heads
exports.getTaskHeads = async (req, reply) => {
  try { 
    const filterKeys = ["team","title","priority","status"]
    let filters = {}
    filterKeys.forEach(k=>{
      req.query[k] && (filters[k] = req.query[k])
    })

    const tasks = await Task.getChildrenTree({
      minLevel: 1,
      maxLevel: 1,
      populate: taskPopulate,
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
    const tasks = await Task.find().populate(taskPopulate)
    return tasks
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single task by ID
exports.getSingleTask = async (req, reply) => {
  try {
    const id = req.params.id
    const task = await Task.findById(id).populate(taskPopulate)
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
      task = new Task({
        ...req.body,
        parent: pNode
      })
      return task.save()
    }else{
      task = new Task(req.body)
      let res = await task.save()
      //  initial bumch of nodes
      const _teamId = req.body?.team || null
      const initialNodes = ['启动','提测','完成']
      for (let title of initialNodes){
        let temp = new Task({
          title,
          parent: task,
          team: _teamId
        })
        await temp.save()
      }
      return res
    }
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
