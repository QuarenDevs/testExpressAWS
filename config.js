const config = {
    appConfig:{
        port: process.env.port || 3000
    },
    dbConfig:{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS
    }
};

module.exports = config;