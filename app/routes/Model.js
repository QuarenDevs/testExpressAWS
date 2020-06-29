module.exports = function(modelName, extras = null) {

    const router = require('express').Router();

    const controllerCallbacks = require(`../controllers/${modelName}Controller`)
    
    if (extras != null)
    {
        extras.forEach(route => {
            var fn = route.callback.trim();
            if (fn in controllerCallbacks && typeof controllerCallbacks[fn] === "function") 
            {
                if(route.method.toLowerCase() === "get")
                {
                    router.get("/" + route.endpoint, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "post")
                {
                    router.post("/" + route.endpoint, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "put")
                {
                    router.put("/" + route.endpoint, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "patch")
                {
                    router.patch("/" + route.endpoint, controllerCallbacks[fn])
                }
                else if(route.method.toLowerCase() === "delete")
                {
                    router.delete("/" + route.endpoint, controllerCallbacks[fn])
                }
            }
        });
    }  
    
    router.get("/", controllerCallbacks.index)
    router.get('/:id', controllerCallbacks.show)
    router.post('/', controllerCallbacks.store)
    router.put('/:id', controllerCallbacks.update)
    router.patch('/:id', controllerCallbacks.update)
    router.delete('/:id', controllerCallbacks.destroy)

    
    return router;
  
  };