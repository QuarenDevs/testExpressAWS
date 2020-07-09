const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const glob = require("glob")

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

let apiPrefix = ""

let swaggerOptions = {}

function listControllers (callback) {
    const controllersPath = path.join(__dirname, '../controllers');
    glob(controllersPath + '/**/*Controller.js', callback);
};
function listModels (callback) {
    const modelsPath = path.join(__dirname, '../models');
    glob(modelsPath + '/**/*.js', callback);
};


module.exports = function(apiPrefix, apiDocsPrefix)
{
    
    //apiPrefix = pApiPrefix
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
        apis: [],
        
        definitions:{
            "Product":{
                "properties":{
                    "uuid":{
                        "type":"string"
                    }
                }
            }
        }
    }

    // Check for duplicates
    // Models and creation of Model's SwaggerDocs
    
    let registeredModels = []
    listModels(function (err, models) {
        if (err) {
          console.log('Error', err);
        } else {
            
            models.forEach(modelFullPath => {
                
                let relativePath = modelFullPath.split("app/models/")[1]

                let currentModel = modelFullPath.split("/")
                currentModel = currentModel[currentModel.length - 1].replace(".js", "")
                
                if (registeredModels.includes(currentModel))
                {
                    throw new Error(`Duplicated Model "${currentModel}" at "${modelFullPath}"\n`)
                }
                else
                {
                    if(currentModel != "index")
                    {
                        console.log("Found model: " + currentModel  +"  " + relativePath)
                        
                        swaggerOptions.apis.push("./app/models/" + relativePath)
                        registeredModels.push(currentModel)
                    }
                }

            })
        }
      });

      // Controller
      let registeredControllers = []
      listControllers(function (err, controllers) {
          if (err) {
            console.log('Error', err);
          } else {
              
              controllers.forEach(controllerFullPath => {
                  let currentModel = controllerFullPath.split("/")
                  currentModel = currentModel[currentModel.length - 1].replace("Controller.js", "")
                  
                  if (registeredControllers.includes(currentModel))
                  {
                      throw new Error(`Duplicated Controller for Model "${currentModel}" at "${controllerFullPath}"\n`)
                  }
                  else
                  {
                      registeredControllers.push(currentModel)
                  }
              })
          }
        });

    // Create Controller routes with SwaggerDoc
    listControllers(function (err, controllers) {
        if (err) {
          console.log('Error', err);
        } else {
            
            controllers.forEach(controllerFullPath => {
                let relativePath = controllerFullPath.split("/controllers/")[1]
   
                let modelName = relativePath.replace("Controller.js", "")
                
                require('./Model')(router, apiPrefix, modelName)
                
                swaggerOptions.apis.push("./app/controllers/" + relativePath)

            })
             
            console.log(swaggerOptions)
            const swaggerDocs = swaggerJsDoc(swaggerOptions)
            router.use(apiDocsPrefix, swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        }
      });
      
    return router;
}