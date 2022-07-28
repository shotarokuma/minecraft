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

app.get('/user/select', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM User
    WHERE Name = '${req.query.Name}'
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/user/join', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT Host_In.CoordinateX, Host_In.CoordinateY, Host_In.CoordinateZ, Host_In.Reputation FROM User, Host_In
    WHERE User.ID = ${req.query.ID}
    AND User.ID = Host_In.User_ID
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/user/aggregation', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT COUNT(*) FROM Animal
    WHERE UserID = ${req.query.ID}
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.get('/user/nestedAggregation', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT COUNT(*) FROM Animal
    WHERE UserID = ${req.query.ID}
    AND Damage >(SELECT AVG(Damage) FROM Animal)
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.get('/user/division', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM User
    INNER JOIN User_Storage AS U ON User.ID = User_storage.User_ID
    INNER JOIN Ender_Chest U.ID = Ender_Chest.UserID
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.get('/users', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM User
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.post('/user', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err)res.status(500).json(err);
    const sql = `
    INSERT INTO User VALUES(${req.body.ID},'${req.body.Name}', ${req.body.CoordinateX},${req.body.CoordinateY},${req.body.CoordinateZ},${req.body.Food_Bar},'${req.body.Health}', ${req.body.Spawn_PointX}, ${req.body.Spawn_PointY}, ${req.body.Spawn_PointZ});
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  })
});

app.delete('/user', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
      DELETE FROM User WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  })
});

app.put('/user', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
      UPDATE User SET ID = ${req.body.ID},Name = '${req.body.Name}', CoordinateX = ${req.body.CoordinateX}, CoordinateY = ${req.body.CoordinateY},CoordinateZ = ${req.body.CoordinateZ}, Food_Bar = ${req.body.Food_Bar},Health = '${req.body.Health}',Spawn_PointX = ${req.body.Spawn_PointX}, Spawn_PointY = ${req.body.Spawn_PointY}, Spawn_PointZ = ${req.body.Spawn_PointZ} WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  })
})

app.get('/chunks', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Chunks
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.post('/chunk', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    INSERT INTO Chunks VALUES(${req.body.CoordinateX},${req.body.CoordinateY},${req.body.CoordinateZ}, '${req.body.Weather}');
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.delete('/chunk', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
      DELETE FROM Chunks 
      WHERE CoordinateX = ${req.body.target[0]} 
      AND CoordinateY = ${req.body.target[1]}
      AND CoordinateZ = ${req.body.target[2]};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  })
});


app.put('/chunk', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
      UPDATE Chunks SET CoordinateX = ${req.body.CoordinateX}, CoordinateY = ${req.body.CoordinateY}, CoordinateZ = ${req.body.CoordinateZ}, Weather = '${req.body.Weather}'
      WHERE CoordinateX = ${req.body.target[0]} 
      AND CoordinateY = ${req.body.target[1]}
      AND CoordinateZ = ${req.body.target[2]};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  })
})

app.get('/blocks', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Blocks
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/items', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Items
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.post('/item', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    INSERT INTO Items(Type) VALUES('${req.body.Type}');
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.delete('/item', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    DELETE FROM Items
    WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.put('/item', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    UPDATE Items SET Type = ${req.body.Type}
    WHERE ID = ${req.body.target} 
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.get('/enchantments', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Enchantments
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.post('/enchantment', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    INSERT INTO Enchantments VALUES('${req.body.Type}', ${req.body.Level});
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.delete('/enchantment', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    DELETE FROM Enchantments
    WHERE Type = '${req.body.target}';
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});



app.put('/enchantment', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    UPDATE Enchantments SET Type = ${req.body.Type}, Level = ${req.body.Level}
    WHERE Type = '${req.body.target}'
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.get('/villages', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Villages
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.post('/village', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    INSERT INTO Villages VALUES(${req.body.CoordinateX},${req.body.CoordinateY},${req.body.CoordinateZ});
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.delete('/village',(req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    DELETE FROM Villages 
    WHERE CoordinateX = ${req.body.target[0]} 
    AND CoordinateY = ${req.body.target[1]}
    AND CoordinateZ = ${req.body.target[2]};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.put('/village',(req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    UPDATE Villages SET CoordinateX = ${req.body.CoordinateX}, CoordinateY = ${req.body.CoordinateY}, CoordinateZ=${req.body.CoordinateZ}
    WHERE CoordinateX = ${req.body.target[0]} 
    AND CoordinateY = ${req.body.target[1]}
    AND CoordinateZ = ${req.body.target[2]};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});



app.get('/villagers', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Villagers
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.post('/villager', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    INSERT INTO Villagers VALUES(${req.body.ID},${req.body.CoordinateX},${req.body.CoordinateY},${req.body.CoordinateZ}, '${req.body.Occupation}', '${req.body.Health}');
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.delete('/villager', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    DELETE FROM Villagers 
    WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.put('/villager', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    UPDATE Villagers  SET ID = ${req.body.ID},CoordinateX = ${req.body.CoordinateX}, CoordinateY = ${req.body.CoordinateY},CoordinateZ = ${req.body.CoordinateZ}, Occupation = '${req.body.Occupation}', Health ='${req.body.Health}'
    WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/chests', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Chest
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/ender_chest', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Ender_Chest
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/user_storage', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM User_storage
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/monsters', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Monster
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.post('/monster', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    INSERT INTO Monster VALUES(${req.body.ID}, '${req.body.Health}', ${req.body.Damage});
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.delete('/monster', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    DELETE FROM Monster 
    WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.put('/monster',(req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    UPDATE Monster SET ID = ${req.body.ID}, Health = '${req.body.Health}',Damage = ${req.body.Damage}
    WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
},[])

app.get('/gangs', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Gangs
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.get('/pillagers', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Pillagers
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});

app.post('/pillager', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    INSERT INTO Pillagers VALUES(${req.body.ID}, '${req.body.Location}', '${req.body.Occupation}');
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.delete('/pillager', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    DELETE FROM Pillagers
    WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});


app.put('/pillager', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    UPDATE Pillagers SET ID = ${req.body.ID}, Location= '${req.body.Location}', Occupation= '${req.body.Occupation}'
    WHERE ID = ${req.body.target};
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});



app.get('/animal', (req, res) => {
  db = mysql.createConnection(mysqlConfig);
  db.connect((err) => {
    if (err) res.status(500).json(err);
    const sql = `
    SELECT * FROM Animal
    `;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      };
      res.status(201).json(result);
    })
  });
});
