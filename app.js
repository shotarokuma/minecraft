require('dotenv').config()
const express = require('express');
const mysql = require('mysql2');
const app = express();

const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}

const server = app.listen(3001, () => console.log("listening"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let db = null;

app.get('/', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM user
    `;
    db.query(sql, (err, result) => {
      if (err) {
        throw err
      };
      res.set({ 'Access-Control-Allow-Origin': '*' })
      res.status(201).json(result);
    })
  });
});
