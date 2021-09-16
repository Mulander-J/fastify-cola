// External Dependancies
const boom = require('boom')

const indexName = 'cola'    //equal database
const typeName = 'humanity' //equal table
const humanitySchema = {
    timestamp: '',
    workSpace: '',
    keyword: '',
    eventName: '',
    handlerId: '',
    handlerInfo: '',
    targetId: '',
    targetInfo: '',
    remark: '',
    level: 1,
    fault: false,
}

exports.esQuery = async (fastify,req, reply) => {
    try {
        const { body } = await fastify.elastic.search({
            index: indexName,
            type: typeName,
            body: {
                // query: { match: { text: req.query.q }}
            }
        })
        
        return body.hits.hits
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.esWrite = async (fastify) => {
    try {
        return fastify.elastic.index({
            index: indexName,
            type: typeName,
            id: JSON.stringify(new Date().getTime()),// uuid，update if id existed else insert 
            body: {
                ...humanitySchema,
                timestamp: new Date().getTime(),
                workSpace: 'Task',
                keyword: 'TASK_CREATE',
                eventName: 'Create Task',
                handlerId: '1',
                handlerInfo: 'admin',
                targetId: '1',
                targetInfo: 'Task002',
            }
        });
    } catch (err) {
        throw boom.boomify(err)
    }
}