const {generateBase} = require('../../utils/descHelper')
const TAG_NAME = 'team'
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
module.exports = {
  list: {
    ...generateBase('list',TAG_NAME),
    querystring: {
      type: 'object',
      additionalProperties: false,
      properties: {
        userId: { type: 'string' }
      }
    }
  },
  item: generateBase('item',TAG_NAME),
  delete: generateBase('delete',TAG_NAME),
  add: {
    ...generateBase('add',TAG_NAME),
    body: BODY_TEAM
  },
  update: {
    ...generateBase('update',TAG_NAME),
    body: BODY_TEAM
  },
}