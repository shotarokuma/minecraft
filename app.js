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

app.get('/user', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM User
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

app.get('/chunks', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Chunks
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

app.get('/blocks', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Blocks
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

app.get('/items', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Items
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

app.get('/enchantments', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Enchantments
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

app.get('/villages', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Villages
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

app.get('/villagers', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Villagers
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

app.get('/storage', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Storage
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

app.get('/chests', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Chest
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

app.get('/ender_chest', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Ender_Chest
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

app.get('/user_storage', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM User_storage
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

app.get('/monsters', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Monster
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

app.get('/gangs', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Gangs
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

app.get('/pillagers', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Pillagers
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

app.get('/animal', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) throw err;
    const sql = `
    SELECT * FROM Animal
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
