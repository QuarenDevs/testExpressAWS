module.exports = function(modelName, extras = []) {

    const router = require('express').Router();

    const controllerCallbacks = require(`../controllers/${modelName}Controller`)
    
    if(extras.length == 0)
    {
        extras.push({ method: 'GET', endpoint: "", callback: 'index'});
        extras.push({ method: 'GET', endpoint: ":id", callback: 'show'});
        extras.push({ method: 'POST', endpoint: "", callback: 'store'});
        extras.push({ method: 'PUT', endpoint: ":id", callback: 'update'});
        extras.push({ method: 'PATCH', endpoint: ":id", callback: 'update'});
        extras.push({ method: 'DELETE', endpoint: ":id", callback: 'destroy'});
    }

    if (extras.length > 0)
    {
        
        extras.forEach(route => {
            var fn = route.callback.trim();
            if (fn in controllerCallbacks && typeof controllerCallbacks[fn] === "function") 
            {
                const routePath = `/${modelName.toLowerCase()}/${route.endpoint}`
                console.log(`${route.method.toUpperCase()}: ${routePath}   (${fn})`)


                if(route.method.toLowerCase() === "get")
                {
                    router.get(routePath, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "post")
                {
                    router.post(routePath, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "put")
                {
                    router.put(routePath, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "patch")
                {
                    router.patch(routePath, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "delete")
                {
                    router.delete(routePath, controllerCallbacks[fn])
                }
            }
        });
    }  
    
    return router;
  
  };