const {generateBase} = require('../../utils/descHelper')
const TAG_NAME = 'task'
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
module.exports = {
  heads: {
    description: `Get ${TAG_NAME} heads`,
    tags: [TAG_NAME],
    summary: `Get the top ${TAG_NAME} head list`,
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
    ...generateBase('tree',TAG_NAME),
    querystring: {
      type: 'object',
      additionalProperties: false,
      required: ['team'],
      properties: {
        team: { type: 'string' },
        parent: { type: 'string' },
        priority: { type: 'integer', minimum: 1, maximum: 5 },
        status: { type: 'integer', minimum: 1, maximum: 5 }
      }
    }
  },
  add: {
    ...generateBase('add',TAG_NAME),
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
    ...generateBase('update',TAG_NAME),
    body: BODY_TASK
  },
  list: {
    ...generateBase('list',TAG_NAME),
    // response: {
    //   200: {
    //     type: 'array',
    //     items:{ 
    //       type:'object',
    //       properties: {
    //         '_id': { type: 'string' },
    //         title: { type: 'string' },
    //         budget: { type: 'integer'},
    //         priority: { type: 'integer' },
    //         status: { type: 'integer' },
    //         score: { type: 'integer' },
    //         updatedAt: {type: 'string' }
    //       }
    //     }
    //   }
    // }
  },
  item: generateBase('item',TAG_NAME),
  delete: generateBase('delete',TAG_NAME)
}