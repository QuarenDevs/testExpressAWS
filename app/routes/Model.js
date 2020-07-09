const pluralize = require('pluralize')
const { snakeCase } = require('change-case')

function isValidHTTPMethod(method)
{
    const allowedHTTPMethods = ['get', 'post', 'put', 'patch', 'delete']
    
    return allowedHTTPMethods.includes(method.toLowerCase())
}

module.exports = function(router, apiPrefix, modelControllerPath) 
{
    let modelName = modelControllerPath.split("/")
    modelName = modelName[modelName.length - 1]

    const controllerPath = `../controllers/${modelControllerPath}Controller`

    const modelController = require(controllerPath)

    let { routes } = modelController
    
    // Validate params
    let maxLengthEndpoint = 0
    routes.forEach(route => {
        const { method, endpoint, callback} = route

        if (!isValidHTTPMethod(method))
        {
            throw new Error(`${controllerPath}: HTTP Method (${method}) is not allowed`)
        }
        
        if (!(typeof callback === "function"))
        {
            throw new Error(`${controllerPath}: (${callback} : ${typeof callback}) is not a proper method/function for HTTP Method (${method})`)
        }
        
        if (endpoint === undefined )
        {
            throw new Error(`${controllerPath}: (${callback} :  HTTP Method (${method}) Endpoint is not defined`)
        }
        else if(!(typeof endpoint === "string"))
        {
            throw new Error(`${controllerPath}: (${callback} :  HTTP Method (${method}) Endpoint type is not a 'string'`)
        }
        else
        {
            if(endpoint.length > maxLengthEndpoint)
            {
                maxLengthEndpoint = endpoint.length
            }
        }
    })
    
    routes = routes.sort(function(first, second){
        const methods = ['get', 'post', 'put', 'patch', 'delete']
        
        const firstMethod = methods.indexOf(first.method.toLowerCase())
        const secondMethod = methods.indexOf(second.method.toLowerCase())

        let diff = firstMethod - secondMethod
        
        if( diff === 0)
        {
            diff = first.endpoint.localeCompare(second.endpoint)
        }
        return diff
    })

    //console.log(`\n`)
    console.log(`- Routes of Model: "${modelName}"`)
    console.log(`       Controller: "${modelControllerPath}"`)
    //console.log("=".repeat(104))
    // console.log("    Method\t|" + " ".repeat(((maxLengthEndpoint/2)) - 1 ) + "Endpoint" + " ".repeat((maxLengthEndpoint/2) ) +"|     Controller Method")
    // console.log("=".repeat(104))
    routes.forEach(route => {
        const { method, endpoint, callback} = route
        
        const path = `${apiPrefix}/${snakeCase(pluralize(modelName)).toLowerCase()}/`
        const routeFullPath = path + endpoint
        let numberTabs = ((path.length) + maxLengthEndpoint  - routeFullPath.length)
        const extraTabulator = " ".repeat(numberTabs + 7)
        //console.log(`     ${method.toUpperCase()}\t|\t${routeFullPath}${extraTabulator}|\t${callback.name}`)


        if(method.toLowerCase() === "get")
        {
            router.get(routeFullPath, callback)
        }
        else if(method.toLowerCase() === "post")
        {
            router.post(routeFullPath, callback)
        }
        else if(method.toLowerCase() === "put")
        {
            router.put(routeFullPath, callback)
        }
        else if(method.toLowerCase() === "patch")
        {
            router.patch(routeFullPath, callback)
        }
        else if(method.toLowerCase() === "delete")
        {
            router.delete(routeFullPath, callback)
        }
        
    });
    //console.log("=".repeat(104))
    

    
    return router;
  
  };