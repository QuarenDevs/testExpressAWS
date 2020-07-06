const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const glob = require("glob")

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

let apiPrefix = ""

let swaggerOptions = {}

function listControllers (src, callback) {
    glob(src + '/**/*Controller.js', callback);
  };


module.exports = function(pApiPrefix, apiDocsPrefix)
{
    const initialPath = path.join(__dirname, '../controllers');
    apiPrefix = pApiPrefix
    swaggerOptions = {
        swaggerDefinition: {
            openapi: "3.0.3",
            info: {
                title: "Entrepreneur App",
                description: "API para la consulta de información de emprendimientos",
                servers: [`http://localhost:8080/${apiPrefix}/`],
            }
        },
        basepath: "/api/v1/",
        apis: []
    }

    // Check for duplicates
    let models = []
    listControllers(initialPath, function (err, controllers) {
        if (err) {
          console.log('Error', err);
        } else {
            
            controllers.forEach(controllerFullPath => {
                let currentModel = controllerFullPath.split("/")
                currentModel = currentModel[currentModel.length - 1].replace("Controller.js", "")
                
                if (models.includes(currentModel))
                {
                    throw new Error(`Duplicated Model "${currentModel}" at "${controllerFullPath}"\n`)
                }
                else
                {
                    models.push(currentModel)
                }
            })
        }
      });
    

    listControllers(initialPath, function (err, controllers) {
        if (err) {
          console.log('Error', err);
        } else {
            
            controllers.forEach(controllerFullPath => {
                let relativePath = controllerFullPath.split("/controllers/")[1]
   
                let modelName = relativePath.replace("Controller.js", "")
                
                require('./Model')(router, apiPrefix, apiDocsPrefix, modelName)
                
                swaggerOptions.apis.push("./app/controllers/" + relativePath)

            })
             
            const swaggerDocs = swaggerJsDoc(swaggerOptions)
            router.use(apiDocsPrefix, swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        }
      });
      
    return router;
}