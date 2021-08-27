// Import Swagger documentation
const apiSchema = require('./documentation/apiSchema')
// Import our Controllers
const commonController = require('../controllers/commonCtrller')
const userController = require('../controllers/userCtrller')
const teamController = require('../controllers/teamCtrller')
const taskController = require('../controllers/taskCtrller')

const routeUser = [
  {
    method: 'POST',
    url: '/api/login',
    handler: userController.handleLogin,
    schema: apiSchema.userApi.login
  },
  {
    method: 'GET',
    url: '/api/user',
    handler: userController.getUsers,
    schema: apiSchema.userApi.list
  },
  {
    method: 'GET',
    url: '/api/user/:id',
    handler: userController.getSingleUser,
    schema: apiSchema.userApi.item
  },
  {
    method: 'POST',
    url: '/api/user',
    handler: userController.addUser,
    schema: apiSchema.userApi.add
  },
  {
    method: 'PUT',
    url: '/api/user/:id',
    handler: userController.updateUser,
    schema: apiSchema.userApi.update
  },
  {
    method: 'DELETE',
    url: '/api/user/:id',
    handler: userController.deleteUser,
    schema: apiSchema.userApi.delete
  }
]
const routeTeam = [
  {
    method: 'GET',
    url: '/api/team',
    handler: teamController.getTeams,
    schema: apiSchema.teamApi.list
  },
  {
    method: 'GET',
    url: '/api/team/:id',
    handler: teamController.getSingleTeam,
    schema: apiSchema.teamApi.item
  },
  {
    method: 'POST',
    url: '/api/team',
    handler: teamController.addTeam,
    schema: apiSchema.teamApi.add
  },
  {
    method: 'PUT',
    url: '/api/team/:id',
    handler: teamController.updateTeam,
    schema: apiSchema.teamApi.update
  },
  {
    method: 'DELETE',
    url: '/api/team/:id',
    handler: teamController.deleteTeam,
    schema: apiSchema.teamApi.delete
  }
]
const routeTask = [
  {
    method: 'GET',
    url: '/api/taskTree',
    handler: taskController.getTaskByTree,
    schema: apiSchema.taskApi.tree
  },
  {
    method: 'GET',
    url: '/api/taskHeads',
    handler: taskController.getTaskHeads,
    schema: apiSchema.taskApi.heads
  },
  {
    method: 'GET',
    url: '/api/task',
    handler: taskController.getTasks,
    schema: apiSchema.taskApi.list
  },
  {
    method: 'GET',
    url: '/api/task/:id',
    handler: taskController.getSingleTask,
    schema: apiSchema.taskApi.item
  },
  {
    method: 'POST',
    url: '/api/task',
    handler: taskController.addTask,
    schema: apiSchema.taskApi.add
  },
  {
    method: 'PUT',
    url: '/api/task/:id',
    handler: taskController.updateTask,
    schema: apiSchema.taskApi.update
  },
  {
    method: 'DELETE',
    url: '/api/task/:id',
    handler: taskController.deleteTask,
    schema: apiSchema.taskApi.delete
  }
]
const routeCommon = [
  {
    method: 'POST',
    url: '/api/file',
    handler: commonController.uploadFile,
    schema: apiSchema.commonApi.file
  },
  {
    method: 'GET',
    url: '/api/public/:file',
    handler: commonController.getFile,
    schema: apiSchema.commonApi.public
  },
  {
    method: 'GET',
    url: '/api/jieba',
    handler: commonController.getJieba,
    schema: apiSchema.commonApi.jieba
  }
]
const routes = [
  ...routeUser,
  ...routeTeam,
  ...routeTask,
  ...routeCommon,
]

module.exports = routes
