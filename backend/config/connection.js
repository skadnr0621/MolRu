/**
 * DB 연동을 위한 설정
 */

const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,

  dateStrings: "date", // ref. https://sailer.tistory.com/entry/Nodejs-Mysql-%EC%97%90%EC%84%9C-DateTime-%EC%BB%AC%EB%9F%BC-%ED%98%95%ED%83%9C-%EB%B0%94%EA%BE%B8%EA%B8%B0
});

module.exports = connection;
