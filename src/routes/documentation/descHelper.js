const paramId = (tag)=>({
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: `the ${tag} identifier, as ${tag}Id`
        }
    },
    required: ['id']
})
exports.paramId = paramId

exports.generateBase = (methods, tag, extraTag=[])=>{
    switch (methods){
        case 'list':
            return {
                description: `Get ${tag} list`,
                tags: [tag,...extraTag],
                summary: `Get all ${tag} in list`,
            }
        case 'add':
            return {
                description: `Create a new ${tag}`,
                tags: [tag,...extraTag],
                summary: `Creates new ${tag} with given values`,
            }
        case 'item':
            return {
                description: `Get a ${tag} item`,
                tags: [tag,...extraTag],
                summary: `Get the specific ${tag} item detail`,
                params: paramId(tag)
            }
        case 'delete':
            return {
                description: `Delete a ${tag} item`,
                tags: [tag,...extraTag],
                summary: `Delete the specific ${tag} item`,
                params: paramId(tag)
            }            
        case 'update':
            return {
                description: `Update the ${tag}`,
                tags: [tag,...extraTag],
                summary: `Update the ${tag} with given values`,
                params: paramId(tag)
            }
        case 'tree':
            return {
                description: `Get ${tag} tree`,
                tags: [tag,...extraTag],
                summary: `Get the ${tag} with tree`
            }    
        default: 
            return {}
    }
}
