// Require the config of fastify-plugin-options
const fp = require('fastify-plugin')
const conf = require('./config')
// Import Routes
const routes = require('./routes')
// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: conf.logger //  setup logger
})
async function injectSwagger (fastify) {
  let { swaggerDoc } = conf
  swaggerDoc.swagger.host = fastify.config.APP_SWAGGER_URL
  fastify.register(require('fastify-swagger'), swaggerDoc)
}
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
    .then(() => console.info('==============>MongoDB connected success'))
    .catch(err => console.log(err))
}

async function start () {
  // Reigseter Plugins
  await fastify
    // Register ENV (https://github.com/fastify/fastify-env)
    .register(require('fastify-env'), conf.env)
    // Register Cors (https://github.com/fastify/fastify-cors)
    .register(require('fastify-cors'), conf.cors)
    // Register helmet (https://github.com/fastify/fastify-helmet)
    .register(require('fastify-helmet'), conf.helmet)
    // Register Compress (https://github.com/fastify/fastify-compress)
    .register(require('fastify-compress'), conf.compress)
    // Register Pressure (https://github.com/fastify/under-pressure)
    .register(require('under-pressure'), conf.pressure)
    // Register Swagger (https://github.com/fastify/fastify-swagger)
    .register(fp(injectSwagger))
    .register(fp(connectDB))

  console.info("==============>fastify.config",fastify.config)

  // Loop over each route
  routes.forEach(route => {
    fastify.route(route)
  })

  try {
    await fastify.listen(fastify.config.APP_PORT, fastify.config.APP_HOST)
    fastify.swagger()
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()