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
    statusCode:-1
}

exports.esLogCaller = (fastify,req,reply)=>{
    const {
        search={},
        time_fr='',time_to='',
        pageSize=10,pageNo=1,
        sortBy=[],orderBy=[]
    } = req.body

    let _ps = pageSize >0 ? pageSize : 10
    let _pf = pageNo >0 ? pageNo : 1
    let _body = {
        "query":{
            "bool":{
                "must":[],
                "filter":[]
            }
        },
        "sort":[],
        "from":(_pf-1)*_ps,
        "size":_ps,
    }
    //  handle match
    const keysSearch = Object.keys(search)
    _body.query.bool.must = (keysSearch||[]).map(e=>({"match":{[e]:search[e]}}))
    //  handle range
    if(time_fr&&time_to){
        _body.query.bool.filter.push({
            "range":{
                "timestamp":{
                    "gte": time_fr,
                    "lte": time_to,
                    "format": "dd/MM/yyyy||yyyy"
                }
            }
        })
    }
    //  handle sort & order
    const _s_k = sortBy.length<=0 ? ['level','timestamp'] : sortBy
    let _s = _s_k.map((e,n)=>({
        [e]:{order:orderBy?.[n] || 'desc'}
    }))
    _body.sort = _s

    return esQuery(fastify,{
        index: _indexName,
        type: _typeName,
        body: _body
    })
}

exports.esWrCaller = async(fastify, req,reply)=>{
    const {statusCode=''} = reply
    const {url='',method=''} = req
    const {cuslog=null} = req.body
    if(cuslog){
        return esWrite(fastify,{
            ...cuslog,
            statusCode: Number(statusCode) || -1,
            source:`[${method}]${url}`
        })
    }
    return false
}

const esQuery = async (fastify,payloads) => {
    try {
        console.log('[ payloads ] >', JSON.stringify(payloads))
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