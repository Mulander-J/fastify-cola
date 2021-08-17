const {paramId,generateBase} = require('./descHelper')

const TAG_TEAM = 'team'
const BODY_TEAM = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    desc: { type: 'string' },
    avatar: { type: 'string' },
    tags: { type: 'array', 'items': { 'type': 'string'}}
  }
}
exports.teamApi = {
  list: generateBase('list',TAG_TEAM),
  item: generateBase('item',TAG_TEAM),
  delete: generateBase('delete',TAG_TEAM),
  add: {
    ...generateBase('add',TAG_TEAM),
    body: BODY_TEAM
  },
  update: {
    ...generateBase('update',TAG_TEAM),
    body: BODY_TEAM
  },
}

const TAG_TASK = 'task'
const BODY_TASK = {
  type: 'object',
  properties: {
    team_id: { type: 'string' },
    title: { type: 'string' },
    desc: { type: 'string' },
    remark: { type: 'string' },
    tags: { type: 'array', items: {type: 'string'}},
    priority: { type: 'integer', minimum: 1, maximum: 5 },
    status: { type: 'integer', minimum: 1, maximum: 5 },
    score: { type: 'integer', minimum: 1, maximum: 10 },
    issuer: { type: 'array', items: {type: 'string'}},
    responser: { type: 'array', items: {type: 'string'}},
    open_at: { type: 'string', format: 'date-time' },
    close_at: { type: 'string', format: 'date-time' },
    alpha_at: { type: 'string', format: 'date-time' },
    beta_at: { type: 'string', format: 'date-time' },
    relase_at: { type: 'string', format: 'date-time' },
    expandObj: { type: 'object' },
  }
}
exports.taskApi = {
  tree: { 
    ...generateBase('tree',TAG_TASK),
    querystring: {
      type: 'object',
      additionalProperties: false,
      properties: {
        parent: { type: 'string' }
      }
    }
  },
  list: {
    ...generateBase('list',TAG_TASK,[TAG_TEAM]),
    querystring: {
      type: 'object',
      required: ['team_id'],
      additionalProperties: false,
      properties: {
        team_id: { type: 'string' }
      }
    }
  },
  item: generateBase('item',TAG_TASK),
  delete: generateBase('delete',TAG_TASK),
  add: {
    ...generateBase('add',TAG_TASK),
    body: BODY_TASK,
    querystring: {
      type: 'object',
      additionalProperties: false,
      properties: {
        parent: { type: 'string' }
      }
    }
  },
  update: {
    ...generateBase('update',TAG_TASK),
    body: BODY_TASK
  },
}