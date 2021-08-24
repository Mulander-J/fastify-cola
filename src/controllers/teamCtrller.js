// External Dependancies
const boom = require('boom')

// Get Data Models
const Team = require('../models/Team')

// Get all teams
exports.getTeams = async (req, reply) => {
  try {
    const teams = await Team.find()
    return teams
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single team by ID
exports.getSingleTeam = async (req, reply) => {
  try {
    const id = req.params.id
    const team = await Team.findById(id).populate(  { path: 'users', select:'_id name avatar' })
    return team
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new Team
exports.addTeam = async (req, reply) => {
  try {
    const team = new Team(req.body)
    return team.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing team
exports.updateTeam = async (req, reply) => {
  try {
    const id = req.params.id
    const team = req.body
    const { ...updateData } = team
    const update = await Team.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a team
exports.deleteTeam = async (req, reply) => {
  try {
    const id = req.params.id
    const team = await Team.findByIdAndRemove(id)
    return team
  } catch (err) {
    throw boom.boomify(err)
  }
}
