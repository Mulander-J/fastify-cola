# A cool fast REST APIs with Node.js, MongoDB, Fastify and Swagger.

> FastifyCola . A Node.js backend project

## Prerequisites
- Nodejs
- MongoDB

## Build Setup

``` bash
# install dependencies
npm install
# or
npm run bootstrap
# clean the node_modules & npm cache
npm clean
# serve with hot reload at localhost:3000
npm dev
# serve once
npm start
```

## CI
```bash
# depoly with build
docker-compose up -d --build
# deploy udate
docker-compose up -d
```

## Dependency & Support
> "fastify": "3.20.1"
- ["fastify-compress"]((https://github.com/fastify/fastify-compress)): "3.6.0" - compress
- ["fastify-env"](https://github.com/fastify/fastify-env): "2.1.1" - dotEnv
- ["fastify-helmet"](https://github.com/fastify/fastify-helmet): "5.3.2" - helmet
- "fastify-mongodb": "^0.9.1" - mongodb
- ["fastify-swagger"](https://github.com/fastify/fastify-swagger): "^0.15.3" - swagger
- "fastify-plugin": "3.0.0" - custom Plugin
- ["fastify-cors"](https://github.com/fastify/fastify-cors): "6.0.2" - cors
- ["fastify-multipart"](https://github.com/fastify/fastify-multipart): "4.0.7" - file/field upload
- ["fastify-static"](https://github.com/fastify/fastify-static): "4.2.3" - static-file-access
- ["mongoose-mpath"](https://www.npmjs.com/package/mongoose-mpath#getancestors): "2.4.11" - treeData
- "pino-pretty": "5.1.3" - logger-pritter
- ["under-pressure"](https://github.com/fastify/under-pressure): "5.7.0" - pressure-control
- ["fastify-rate-limit"](https://github.com/fastify/fastify-rate-limit): "5.6.0" - rate-limit-control
- "boom": "^7.2.2" - Error Handler
- "nodemon": "^1.18.7" - node-hotLoad

## Based & forked from here
> 🙏 Thanks the author [@siegfriedgrimbeek](https://github.com/siegfriedgrimbeek) 
>- A blazing fast REST APIs with Node.js, MongoDB, Fastify and Swagger.
>- [Tutorial on Medium](https://medium.freecodecamp.org/how-to-build-blazing-fast-rest-apis-with-node-js-mongodb-fastify-and-swagger-114e062db0c9)

## Seek more detials via these sites below
- [fastify-official-doc](https://www.fastify.io/)
- [fastify-guidebook-cn](https://lavyun.gitbooks.io/fastify/content/)