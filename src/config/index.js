module.exports = {
    env: {
        dotenv: true,
        schema: {
            type: 'object',
            required: [ 'APP_PORT' ],
            properties: {
                APP_PORT: { type: 'string', default: 3000},
                APP_HOST: { type: 'string', default: 'localhost'},
                APP_SWAGGER_URL: { type: 'string', default: 'localhost：3000'},
                APP_MGDB: { type: 'string', default: 'mongodb://localhost/mytest'},
            }
        }
    },
    logger: {
        //  setup pino-pretty
        prettyPrint: {
            colorize: true,
            timestampKey: 'time',
            translateTime : 'yyyy-mm-dd HH:MM:ss.l',
            messageFormat: '{msg}',
            // file : 'D://Test//test.log', //此处设置log文件输出路径
            // logrotator : {  // 设置按什么归档日志
            //   byDay: true,
            //   dayDelimiter: '_'
            // },
            // maxBufferLength: 4096,
            // flushInterval: 1000,
        }
    },
    cors: {},
    helmet: {
        contentSecurityPolicy: false
    },
    compress: { global: true },
    pressure: {
        maxEventLoopDelay: 1000,
        maxHeapUsedBytes: 100000000,
        maxRssBytes: 100000000,
        maxEventLoopUtilization: 0.98,
        message: 'Under pressure!',
        retryAfter: 50
    },
    rateLimit: {
        max: 100,
        timeWindow: 1000 * 60
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
    swaggerDoc:{
        routePrefix: '/documentation',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
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