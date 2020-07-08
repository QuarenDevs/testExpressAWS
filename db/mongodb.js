const mongoose = require('mongoose')

mongoose.connection.on('open', () => console.log('DB connected'))

async function connectDB({host, port, dbName})
{
    const uri = `mongodb://${host}:${port}/${dbName}`
    console.log(`Supuesta conexión a ${uri}`)
    await mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser:true})
    console.log("Después de solicitar conexión")
}

module.exports = connectDB