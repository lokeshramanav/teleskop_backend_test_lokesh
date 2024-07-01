module.exports = {
    environment : {
        port : process.env.PORT || 3000,
        env : process.env.NODE_ENV || 'development',
    },
    db : {
        host : process.env.DB_HOST || 'localhost',
        user : process.env.DB_USER || 'root',
        password : process.env.DB_PASSWORD || '',
        database : process.env.DB_NAME || 'test',
        port : process.env.DB_PORT || 3306,
    },
    jwt : {
        secret : process.env.JWT_SECRET ,
        expiresIn : process.env.JWT_EXPIRES_IN || '1h',
    },
};