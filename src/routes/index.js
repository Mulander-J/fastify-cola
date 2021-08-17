// Import Swagger documentation
const apiSchema = require('./documentation/apiSchema')
// Import our Controllers
const teamController = require('../controllers/teamController')
const taskController = require('../controllers/taskController')

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
const routes = [
  ...routeTeam,
  ...routeTask
]

module.exports = routes
