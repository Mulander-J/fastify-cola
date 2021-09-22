const TAG_NAME = 'common'

module.exports = {
  hello: {
    description: `Hello APi`,
    tags: [TAG_NAME],
    summary: `Test the api`
  },
  file: {
    description: `Upload file`,
    tags: [TAG_NAME],
    summary: `Upload your file`
  },
  public: {
    description: `Get file`,
    tags: [TAG_NAME],
    summary: `Get your file with the filename`
  },
  jieba: {
    description: `Get jieba`,
    tags: [TAG_NAME],
    summary: `Get your words with the jieba`,
    querystring: {
      type: 'object',
      additionalProperties: false,
      properties: {
        mode: { type: 'string' },
        topk: { type: 'integer', minimum: 1, maximum: 200 }
      }
    }
  },
  encode: {
    description: `Encode anything`,
    tags: [TAG_NAME],
    summary: `Encode anything with input`,
    querystring: {
      type: 'object',
      additionalProperties: false,
      required: ['target'],
      properties: {
        target: { type: 'string' },
        namespace: { type: 'string' }
      }
    }
  },
  decode: {
    description: `Decode something`,
    tags: [TAG_NAME],
    summary: `Decode your message`,
    params: {
      type: 'object',
      properties: {
          code: {
              type: 'string',
              description: `the code`
          }
      },
      required: ['code']
    }
  },
  esQuery: {
    description: `Read data From ES`,
    tags: [TAG_NAME],
    summary: `Query with your payloads`,
    body: {
      type: 'object',
      properties: {
        time_fr: {
            type: 'string',
            description: `Start at`
        },
        time_to: {
            type: 'string',
            description: `End at`
        },
        sortBy: {
            type: 'array',
            description: `Sort keys`,
            items: { type: 'string' }
        },
        orderBy: {
            type: 'array',
            description: `Order keys[desc|asc]`,
            items: { type: 'string' }
        },
        search: { 
          type: 'object',
          description: `{k:v}`,
        },
        pageSize: {
          type: 'number',
          description: `Page Limit | 10`
        },
        pageNo: {
          type: 'number',
          description: `Page from | 1`
        }
      }
    }
  }
}