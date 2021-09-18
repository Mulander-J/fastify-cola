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

exports.esLogCaller = (fastify,req,reply)=>{
    const {
        time_fr='',time_to='',
        sortBy=[],orderBy=[],
        match={},
        terms={}
    } = req.body

    let _body = {
        index: _indexName,
        type: _typeName,
    }
    //  handle match
    if(Object.keys(match).length>0){
        (_body['query']||(_body['query']={}))
        _body['query']['match'] = match
    }
    //  handle range
    if(time_fr&&time_to){
        _r["timestamp"] = {
            "gte": time_fr,
            "lte": time_to,
            "format": "dd/MM/yyyy||yyyy"
        }
        (_body['query']||(_body['query']={}))
        _body['query']['sort'] = _r
    }
    //  handle sort & order
    let _s_k = sortBy.length<=0 ? ['timestamp','level'] : sortBy
    let _s = _s_k.map((e,n)=>({[e]:{"order": orderBy[n] || 'desc'}}))
    _body['sort'] = _s

    return esQuery(fastify,_body)
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

const esQuery = async (fastify,payloads) => {
    try {
        console.log('[ payloads ] >', payloads)
        const { body } = await fastify.elastic.search(payloads)
        return body?.hits?.hits || []
    } catch (err) {
        throw boom.boomify(err)
    }
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