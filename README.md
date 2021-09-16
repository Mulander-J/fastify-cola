
```
  _____ _    ____ _____ ___ _______   __       ____    ___    _          _    
 |  ___/ \  / ___|_   _|_ _|  ___\ \ / /      / ___|  / _ \  | |        / \   
 | |_ / _ \ \___ \ | |  | || |_   \ V /      | |     | | | | | |       / _ \  
 |  _/ ___ \ ___) || |  | ||  _|   | |    _  | |___  | |_| | | |___   / ___ \ 
 |_|/_/   \_\____/ |_| |___|_|     |_|   (_)  \____|  \___/  |_____| /_/   \_\
                                                                              
```

    
# Fastify Cola

A cool fast REST APIs with Node.js, Fastify, MongoDB, Elasticsearch and Swagger.


## Tech Stack

**Server:** 

[![nodejs](https://img.shields.io/badge/nodejs-v14.17.4-green.svg?)](https://nodejs.org/) 

[![fastify](https://img.shields.io/badge/fastify-v3.20.1-black.svg?)](https://www.fastify.io/)

**Database:** 

[![mongoDB](https://img.shields.io/badge/mongoDB-moogose-orange.svg?)](https://www.mongodb.com/) 

[![elastic](https://img.shields.io/badge/elastic-Elasticsearch-blue.svg?)](https://www.elastic.co/cn/elasticsearch/)



## Documentation

API-Doc is put on as Swagger `http://localhost:3699/doc/index.html#/`

  
## Features

- User `CRUD`
- Team `CRUD` \ `Bind` User
- Task `CRUD` \ `TreeData` \  `Bind` User & Team 
- Common
    - Static File upload & download
    - Redis liked encode & decode
    - Jieba for letter cutting
    - Elasticsearch query proxy

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT`- `APP_HOST` - `APP_SWAGGER_URL`- `APP_MGDB`- `APP_ES`

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/Mulander-J/fastify-cola
```

Go to the project directory

```bash
  cd fastify-cola
```


Install dependencies

```bash
  npm install
```

Start the server with nodemon

```bash
  npm run dev
```

Start the server locally

```bash
  npm run start
```

Clean the npm cache

```bash
  npm run clean
```

  
## Running Tests

To run tests, run the following command

```bash
  curl http://localhost:3699/api/hello
```

  
## Deployment

To deploy this project run

```bash
# depoly with build
docker-compose up -d --build
# deploy udate
docker-compose up -d
```

  
## Optimizations

- ["under-pressure"](https://github.com/fastify/under-pressure): "5.7.0" - pressure-control
- ["fastify-rate-limit"](https://github.com/fastify/fastify-rate-limit): "5.6.0" - rate-limit-control

  
## Authors

- [@Mulander](https://mulander-j.github.io/fillory/Wiki1001/)

  
## Acknowledgements

 - [@siegfriedgrimbeek](https://github.com/siegfriedgrimbeek) / [Tutorial on Medium](https://medium.freecodecamp.org/how-to-build-blazing-fast-rest-apis-with-node-js-mongodb-fastify-and-swagger-114e062db0c9)

  
## Contributing

Contributions are always welcome!

  
## Related

Seek more detials via these sites below

- [fastify-official-doc](https://www.fastify.io/)
- [fastify-guidebook-cn](https://lavyun.gitbooks.io/fastify/content/)

  
## License

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?)](https://github.com/Mulander-J/fastify-cola/blob/main/LICENSE)