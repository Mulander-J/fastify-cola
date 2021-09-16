const {generateBase} = require('../../utils/descHelper')
const TAG_NAME = 'user'
const BODY_USER = {
  type: 'object',
  properties: {
    'openId': { type: 'string' },
    'userInfo': { 
      type: 'object',
      properties: {
        'nickName': { type: 'string' },
        'avatarUrl': { type: 'string' },
        'city': { type: 'string' },
        'province': { type: 'string' },
        'language': { type: 'string' }
      }
    }
  }
}
module.exports = {
  login: {
    description: `Login`,
    tags: [TAG_NAME],
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
    ...generateBase('list',TAG_NAME),
    querystring: {
      type: 'object',
      additionalProperties: false,
      properties: {
        openId: { type: 'string' },
        isActive: { type: 'boolean'}
      }
    }
    // response: {
    //   200: {
    //     type: 'array',
    //     items:{ 
    //       type:'object',
    //       properties: {
    //         '_id': { type: 'string' },
    //         openId: { type: 'string' },
    //         isActive: { type: 'boolean' },
    //         userInfo: { 
    //           type: 'object',
    //           properties: {
    //             'nickName': { type: 'string' },
    //             'avatarUrl': { type: 'string' },
    //             'city': { type: 'string' },
    //             'province': { type: 'string' },
    //             'language': { type: 'string' }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  },
  item: generateBase('item',TAG_NAME),
  delete: generateBase('delete',TAG_NAME),
  add: {
    ...generateBase('add',TAG_NAME),
    body: BODY_USER
  },
  update: {
    ...generateBase('update',TAG_NAME),
    body: BODY_USER
  },
}