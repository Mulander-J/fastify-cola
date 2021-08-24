const {generateBase} = require('./descHelper')

const TAG_COMMON = 'common'
exports.commonApi = {
  file: {
    description: `Upload file`,
    tags: [TAG_COMMON],
    summary: `Upload your file`
  },
  public: {
    description: `Get file`,
    tags: [TAG_COMMON],
    summary: `Get your file with the filename`
  }
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
  login: {
    description: `Login`,
    tags: [TAG_USER],
    summary: `Login with mini-program-code`,
    body: {
      type: 'object',
      required: ['js_code','name','pwd'],
      properties: {
        js_code: { type: 'string' },
        name: { type: 'string' },
        pwd: { type: 'string' }
      }
    }
  },
  list: {
    ...generateBase('list',TAG_USER),
    response: {
      200: {
        type: 'array',
        items:{ 
          type:'object',
          properties: {
            '_id': { type: 'string' },
            'name': { type: 'string' },
            'email': { type: 'string' },
            'avatar': { type: 'string' },
            'isActive': { type: 'boolean' }
          }
        }
      }
    }
  },
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
    users: { type: 'array', items: {type: 'string'}},
    tags: { type: 'array', items: { type: 'string'}}
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
    title: { type: 'string' },
    team: { type: 'string' },
    desc: { type: 'string' },
    remark: { type: 'string' },
    tags: { type: 'array', items: {type: 'string'}},
    budget: { type: 'integer', minimum: 0, maximum: 24*7 },
    priority: { type: 'integer', minimum: 0, maximum: 5 },
    status: { type: 'integer', minimum: 0, maximum: 5 },
    score: { type: 'integer', minimum: 0, maximum: 10 },
    issuer: { type: 'array', items: {type: 'string'}},
    responser: { type: 'array', items: {type: 'string'}},
    open_at: { type: 'string' },
    close_at: { type: 'string'},
    alpha_at: { type: 'string'},
    beta_at: { type: 'string'},
    relase_at: { type: 'string'},
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
        team: { type: 'string' },
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
    querystring: {
      type: 'object',
      additionalProperties: false,
      properties: {
        parent: { type: 'string' }
      }
    },
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
      }
    }
  },
  update: {
    ...generateBase('update',TAG_TASK),
    body: BODY_TASK
  },
  list: {
    ...generateBase('list',TAG_TASK),
    response: {
      200: {
        type: 'array',
        items:{ 
          type:'object',
          properties: {
            '_id': { type: 'string' },
            title: { type: 'string' },
            budget: { type: 'integer'},
            priority: { type: 'integer' },
            status: { type: 'integer' },
            score: { type: 'integer' },
            updatedAt: {type: 'string' }
          }
        }
      }
    }
  },
  item: generateBase('item',TAG_TASK),
  delete: generateBase('delete',TAG_TASK)
}