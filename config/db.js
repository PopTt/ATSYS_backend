const mysql = require("mysql")
const dotenv = require('dotenv')

dotenv.config()

var pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

module.exports = pool;