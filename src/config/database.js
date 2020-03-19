const { db_name, db_user, db_dialect, db_host, db_pass } = require('./secret');

module.exports = {
    development: {
        username: db_user,
        password: db_pass,
        database: db_name,
        host: db_host,
        dialect: db_dialect,
    },
    production: {
        username: db_user,
        password: db_pass,
        database: db_name,
        host: db_host,
        dialect: db_dialect,
    }
};