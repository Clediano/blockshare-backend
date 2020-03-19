
module.exports = {
    development: {
        username: 'postgres',
        password: 'postgres',
        database: 'database',
        host: 'localhost',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: "DATABASE_URL"
    }
};