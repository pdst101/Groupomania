const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '101winters',
    host: 'localhost',
    port: 5432,
    database: 'groupomania'
});

module.exports = pool;