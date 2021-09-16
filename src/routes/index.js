// Import schema
const {
  schemaCommon,
  schemaUser,
  schemaTeam,
  schemaTask,
} = require('./schema')
// Import our Controllers
const commonController = require('../controllers/commonCtrller')
const userController = require('../controllers/userCtrller')
const teamController = require('../controllers/teamCtrller')
const taskController = require('../controllers/taskCtrller')
const esDocCtrller = require('../controllers/esDocCtrller')

module.exports = function (fastify, opts, done) {

    /*Test API*/ 
    fastify.get('/hello', { schema: schemaCommon.hello }, ()=>('Hello Cola'))
    /*Common API*/
    fastify.get('/file', { schema: schemaCommon.file }, commonController.uploadFile)
    fastify.get('/public/:file', { schema: schemaCommon.public }, commonController.getFile)
    fastify.get('/jieba', { schema: schemaCommon.jieba }, commonController.getJieba)
    fastify.get('/encode', { schema: schemaCommon.encode }, commonController.myEncode)
    fastify.get('/decode/:code', { schema: schemaCommon.decode }, commonController.myDecode)
    fastify.get('/es', { schema: schemaCommon.esQuery }, (req,reply)=>(esDocCtrller.esQuery(fastify,req,reply)))
    /*User API*/
    fastify.get('/user', { schema: schemaUser.list }, userController.getUsers)
    fastify.post('/user', { schema: schemaUser.add }, userController.addUser)
    fastify.get('/user/:id', { schema: schemaUser.item }, userController.getSingleUser)
    fastify.put('/user/:id', { schema: schemaUser.update }, userController.updateUser)
    fastify.delete('/user/:id', { schema: schemaUser.delete }, userController.deleteUser)
    /*Team API*/
    fastify.get('/team', { schema: schemaTeam.list }, teamController.getTeams)
    fastify.post('/team', { schema: schemaTeam.add }, teamController.addTeam)
    fastify.get('/team/:id', { schema: schemaTeam.item }, teamController.getSingleTeam)
    fastify.put('/team/:id', { schema: schemaTeam.update }, teamController.updateTeam)
    fastify.delete('/team/:id', { schema: schemaTeam.delete }, teamController.deleteTeam)
    /*Task API*/
    fastify.get('/taskTree', { schema: schemaTask.tree }, taskController.getTaskByTree)
    fastify.get('/taskHeads', { schema: schemaTask.heads }, taskController.getTaskHeads)
    fastify.get('/task', { schema: schemaTask.list }, taskController.getTasks)
    fastify.post('/task', { schema: schemaTask.add }, taskController.addTask)
    fastify.get('/task/:id', { schema: schemaTask.item }, taskController.getSingleTask)
    fastify.put('/task/:id', { schema: schemaTask.update }, taskController.updateTask)
    fastify.delete('/task/:id', { schema: schemaTask.delete }, taskController.deleteTask)
  
    done()
  }