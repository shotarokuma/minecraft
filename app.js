const express = require('express');
const mysql = require('mysql2');
const app = express();


const mysqlConfig = {
  host: "mysql_server",
  user: "cmpt354",
  password: "root",
  database: "minecraft"
}

const server = app.listen(3000, () => console.log("listening"));

let db = null;

app.get('/', function (req, res) {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM user
    `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    })
  });
});
