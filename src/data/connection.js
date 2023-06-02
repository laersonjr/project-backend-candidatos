const mysql = require("mysql2");
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORTBD,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const connection = pool.promise();

module.exports = connection;


