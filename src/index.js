// Require the config of fastify-plugin-options
const conf = require('./config')
const fp = require('fastify-plugin')
//  Setup logger
const {opt} = require('fastify-logger')(conf.logger);
opt.stream = null;
// Require the fastify framework and instantiate it
const fastify = require('fastify')({ logger: opt })
/**
 * @description Inject Swagger with env&conf
 * @param {*} fastify 
 */
async function injectSwagger (fastify) {
  let { swaggerDoc } = conf  
  swaggerDoc.swagger.host = fastify.config.APP_SWAGGER_URL
  // Register Swagger (https://github.com/fastify/fastify-swagger)
  fastify.register(require('fastify-swagger'), swaggerDoc)
}
/**
 * @description bind es with env&conf
 * @param {*} fastify 
 */
 async function bindES (fastify) {
  // Register ES [elasticsearch](https://github.com/fastify/fastify-elasticsearch)
  fastify.register(require('fastify-elasticsearch'), { 
    ...conf.elasticsearch,
    node: fastify.config.APP_ES
  })  
}
/**
 * @description connect mongoDB with env&conf
 * @param {*} fastify 
 */
async function connectDB (fastify) {
  // Require external modules
  const mongoose = require('mongoose')
  /*DeprecationWarning: collection.ensureIndex is deprecated.Use createIndexes*/
  mongoose.set('useCreateIndex', true);
  // Connect to DB
  mongoose.connect(fastify.config.APP_MGDB,{
    /*DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.*/
    useNewUrlParser: true ,
    /*DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.*/
    useUnifiedTopology: true
  })
    .then(() => fastify.log.info('==============>MongoDB connected success<=============='))
    .catch(err => fastify.log.error(err))
}
/**
 * @description Start the service
 */
async function start () {
  // Reigseter Plugins
  await fastify
    // Register ENV (https://github.com/fastify/fastify-env)
    .register(require('fastify-env'), conf.env)
    // Register Cors (https://github.com/fastify/fastify-cors)
    .register(require('fastify-cors'), conf.cors)
    // Register helmet (https://github.com/fastify/fastify-helmet)
    .register(require('fastify-helmet'), conf.helmet)
    // Register Multipart (https://github.com/fastify/fastify-multipart)
    .register(require('fastify-multipart'), conf.file)
    // Register Multipart (https://github.com/fastify/fastify-static)
    .register(require('fastify-static'), conf.staticFile)
    // Register Compress (https://github.com/fastify/fastify-compress)
    .register(require('fastify-compress'), conf.compress)
    // Register Pressure (https://github.com/fastify/under-pressure)
    .register(require('under-pressure'), conf.pressure)
    // Register Rate-limit (https://github.com/fastify/fastify-rate-limit)
    .register(require('fastify-rate-limit'), conf.rateLimit)
    .register(fp(injectSwagger))
    .register(fp(connectDB))
    .register(fp(bindES))
  
  
  /*log the config via .env*/
  console.info("==============>fastify.config",fastify.config)  

  fastify.setErrorHandler(function (error, request, reply) {
    if (reply.statusCode === 429) {
      error.message = 'You hit the rate limit! Slow down please!'
    }
    reply.send(error)
  })

  // Loop over each route
  // routes.forEach(route => {fastify.route(route)})
  fastify.register(require('./routes/index'), { prefix: '/api' })

  try {
    await fastify.listen(fastify.config.APP_PORT, fastify.config.APP_HOST)
    fastify.swagger()
    console.info(`==============>Swagger-Url | http://${fastify.config.APP_SWAGGER_URL}${conf.swaggerDoc.routePrefix}/index.html#/`)

    const figlet = require('figlet');
    figlet('FASTIFY . C O L A', function(err, data) {
      if (err) {
          console.log('[figlet]Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
  }); 
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()