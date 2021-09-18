// External Dependancies
const boom = require('boom')

const _indexName = 'cola'    //equal database
const _typeName = 'humanity' //equal table

const humanitySchema = {
    timestamp: '',
    workSpace: '',
    source: '',
    eventCode: '',
    eventInfo: '',
    handlerId: '',
    handlerInfo: '',
    targetId: '',
    targetInfo: '',
    content: '',
    remark: '',
    level: 1,
    fault: false
}

exports.esQuery = async (fastify,req, reply) => {
    try {
        const { body } = await fastify.elastic.search({
            index: _indexName,
            type: _typeName,
            body: {
                // query: { match: { text: req.query.q }}
            }
        })
        
        return body.hits.hits
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.esWrCaller = async(fastify, req,reply)=>{
    const {statusCode=''} = reply
    const {url='',method=''} = req
    const {cuslog=null} = req.body
    if(cuslog){
        return esWrite(fastify,{
            ...cuslog,
            source:`[${method}]${url}`,
            fault: statusCode && statusCode != '200'
        })
    }
    return false
}

const esWrite = async (fastify, data) => {
    try {
        const _t = new Date().getTime()
        
        return fastify.elastic.index({
            index: _indexName,
            type: _typeName,
            id: JSON.stringify(_t),// uuid，update if id existed else insert 
            body: {
                ...humanitySchema,
                ...data,
                timestamp: _t
            }
        });
    } catch (err) {
        fastify.log.error(err)
    }
}