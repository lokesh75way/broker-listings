const { Pool, Client } = require('pg');

// Client connection object
const client = new Client({
     user: process.env.DB_USERNAME,
     host: process.env.DB_HOST,
     database: process.env.DB_NAME,
     password: process.env.DB_PASSWORD,
     port: process.env.DB_PORT
})

module.exports = client;
