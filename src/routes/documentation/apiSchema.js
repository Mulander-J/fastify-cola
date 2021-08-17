const {generateBase} = require('./descHelper')

const TAG_COMMON = 'common'
exports.commonApi = {
  token: {
    description: `Get token`,
    tags: [TAG_COMMON],
    summary: `Get the user token of session-key`,
    body: {
      type: 'object',
      properties: {
        app_id: { type: 'string' },
        app_secret: { type: 'string' },
        js_code: { type: 'string' },
      }
    }
  },
  file: {
    description: `Upload file`,
    tags: [TAG_COMMON],
    summary: `Upload your file`
  },
}

const TAG_USER = 'user'
const BODY_USER = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    pwd: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    options: { type: 'object' }
  }
}
exports.userApi = {
  list: generateBase('list',TAG_USER),
  item: generateBase('item',TAG_USER),
  delete: generateBase('delete',TAG_USER),
  add: {
    ...generateBase('add',TAG_USER),
    body: BODY_USER
  },
  update: {
    ...generateBase('update',TAG_USER),
    body: BODY_USER
  },
}

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
  heads: {
    description: `Get ${TAG_TASK} heads`,
    tags: [TAG_TEAM, TAG_TASK],
    summary: `Get the top ${TAG_TASK} head list`,
    querystring: {
      type: 'object',
      additionalProperties: false,
      properties: {
        team_id: { type: 'string' },
        title: { type: 'string' },
        priority: { type: 'integer', minimum: 1, maximum: 5 },
        status: { type: 'integer', minimum: 1, maximum: 5 }
      }
    }
  },
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
  list: generateBase('list',TAG_TASK),
  item: generateBase('item',TAG_TASK),
  delete: generateBase('delete',TAG_TASK)
}