const config = {
    appConfig:{
        port: process.env.port || 3000
    },
    dbConfig:{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dbName: process.env.DB_NAME
    }
};

module.exports = config;