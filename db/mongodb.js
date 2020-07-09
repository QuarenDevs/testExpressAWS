const mongoose = require('mongoose')

mongoose.connection.on('open', () => console.log('DB connected'))

async function connectDB({host, port, dbName, dbUser, dbPass})
{
    let uri = `mongodb://${host}:${port}/${dbName}`
    if(host !== 'localhost')
    {
        uri = `mongodb+srv://${dbUser}:${dbPass}@${host}/${dbName}?retryWrites=true&w=majority`
    }

    console.log(`Supuesta conexión a ${uri}`)
    await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
    console.log("Después de solicitar conexión") 
    
}

module.exports = connectDB