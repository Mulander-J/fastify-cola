const path = require('path')

module.exports = {
    env: {
        dotenv: true,
        schema: {
            type: 'object',
            required: [ 'APP_PORT' ],
            properties: {
                APP_PORT: { type: 'string', default: 3000},
                APP_HOST: { type: 'string', default: '0.0.0.0'},
                APP_SWAGGER_URL: { type: 'string', default: 'localhost：3000'},
                APP_MGDB: { type: 'string', default: 'mongodb://localhost/mytest'},
                MINI_ID: { type: 'string', default: ''},
                MINI_SECRET: { type: 'string', default: ''}
            }
        }
    },
    logger: {
        // console: true,
        file : path.join(__dirname, '../../logs/fastify.log'), //此处设置log文件输出路径
        logrotator : {  // 设置按什么归档日志
          byDay: true,
          dayDelimiter: '_'
        },
        customLevels: 'all',    //自定义level设置输出所有级别日志
        maxBufferLength: 4096,
        flushInterval: 1000,
        //  setup pino-pretty
        prettyPrint: {
            colorize: false,
            timestampKey: 'time',
            translateTime : 'SYS:yyyy-mm-dd HH:MM:ss Z',
            messageFormat: '{msg}',
        }
    },
    cors: {},
    helmet: { contentSecurityPolicy: false },
    compress: { global: true },
    pressure: {
        maxEventLoopDelay: 10_000,
        maxHeapUsedBytes: 300_000_000,
        maxRssBytes: 50_000_0000,
        maxEventLoopUtilization: 0.98,
        message: 'Under pressure!',
        retryAfter: 50,
        healthCheckInterval: 1_000 * 60 * 30,
        healthCheck: async function (fastifyInstance) {
            fastifyInstance.log.info(`======> ❤️ Health-Jump ❤️ <======`)
            return true
        }
    },
    rateLimit: {
        max: 1_000,
        timeWindow: 1_000 * 60
    },
    file: {
        // limits: {
        //     fieldNameSize: 100, // Max field name size in bytes
        //     fieldSize: 100,     // Max field value size in bytes
        //     fields: 10,         // Max number of non-file fields
        //     fileSize: 1000000,  // For multipart forms, the max file size in bytes
        //     files: 1,           // Max number of file fields
        //     headerPairs: 2000   // Max number of header key=>value pairs
        // }
    },
    staticFile: {
        root: path.join(__dirname, '../../public'),
        prefix: '/', // optional: default '/'
      },
    swaggerDoc:{
        routePrefix: '/doc',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Fastify Cola',
                description: 'Building a cool fast REST APIs with Node.js, MongoDB, Fastify and Swagger.',
                version: '1.0.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            tags: [
                { name: 'common', description: 'Common related end-points' },
                { name: 'user', description: 'User related end-points' },
                { name: 'team', description: 'Team related end-points' },
                { name: 'task', description: 'Task related end-points' },
            ],
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    }
}