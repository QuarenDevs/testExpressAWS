const router = require('express').Router();

const fs = require('fs');
const path = require('path');
//joining path of directory 
const directoryPath = path.join(__dirname, '../controllers');

const controllers = ["PRIMERO"]

//passsing directoryPath and callback function
fs.readdir(directoryPath, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    controllers.push("asda")
    //listing all files using forEach
    files.forEach(function (file) {
        if(file.includes("Controller.js"))
        {
            let name = file.replace("Controller.js", "")
            let controller = {
                model: name
            }
            router.use('/', require('./Model')(name))
        }
    });
});

module.exports = router