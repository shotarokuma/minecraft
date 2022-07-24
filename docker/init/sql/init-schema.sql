CREATE TABLE User(
    ID INT NOT NULL,
    Name VARCHAR(20) NOT NULL,
    CoordinateX INT NOT NULL,
    CoordinateY INT NOT NULL,
    CoordinateZ INT NOT NULL,
    Food_Bar INT,
    Health VARCHAR(20),
    Spawn_PointX INT NOT NULL,
    Spawn_PointY INT NOT NULL,
    Spawn_PointZ INT NOT NULL,
    PRIMARY KEY(ID)
);

CREATE TABLE Chunks(
   CoordinateX INT NOT NULL,
   CoordinateY INT NOT NULL,
   CoordinateZ INT NOT NULL,
   Weather VARCHAR(20) NOT NULL,
   PRIMARY KEY (CoordinateX, CoordinateY, CoordinateZ)
);


CREATE TABLE Block_Types(
   Type VARCHAR(20),
   Toughness INT,
   State VARCHAR(20) NOT NULL,
   PRIMARY KEY(Type)
);

CREATE TABLE Blocks(
   CoordinateBlockX INT NOT NULL,
   CoordinateBlockY INT NOT NULL,
   CoordinateBlockZ INT NOT NULL,
   CoordinateChunkX INT NOT NULL,
   CoordinateChunkY INT NOT NULL,
   CoordinateChunkZ INT NOT NULL,
   Type VARCHAR(20),
   PRIMARY KEY(CoordinateBlockX, CoordinateBlockY,CoordinateBlockZ ,CoordinateChunkX,CoordinateChunkY,CoordinateChunkZ, Type),
   FOREIGN KEY(CoordinateChunkX,CoordinateChunkY,CoordinateChunkZ ) REFERENCES Chunks(CoordinateX,CoordinateY,CoordinateZ)
   ON UPDATE CASCADE
   ON DELETE CASCADE,
   FOREIGN KEY(Type) REFERENCES Block_Types(Type) 
   ON UPDATE CASCADE
   ON DELETE CASCADE
);

CREATE TABLE Items(
   ID INT AUTO_INCREMENT,
   Type VARCHAR(20) UNIQUE,
   PRIMARY KEY(ID)
);

CREATE TABLE Tools(
   ID INT,
   Durability INT NOT NULL,
   PRIMARY KEY(ID),
   FOREIGN KEY(ID) REFERENCES Items(ID) 
   ON UPDATE CASCADE
   ON DELETE CASCADE
);

CREATE TABLE Enchantments(
   Type VARCHAR(20),
   Level INT,
   PRIMARY KEY(Type, Level)
);

CREATE TABLE AppliedTo(
   Type VARCHAR(20),
   ID INT,
   Level INT,
   PRIMARY KEY(Type, Level, ID),
   FOREIGN KEY(Type, Level) REFERENCES Enchantments(Type,Level) 
   ON UPDATE CASCADE
   ON DELETE CASCADE,
   FOREIGN KEY(ID) REFERENCES Items(ID) 
   ON UPDATE CASCADE
   ON DELETE CASCADE
);


CREATE TABLE Villages(
   CoordinateX INT NOT NULL,
   CoordinateY INT NOT NULL,
   CoordinateZ INT NOT NULL,
   PRIMARY KEY(CoordinateX, CoordinateY, CoordinateZ) 
);

CREATE TABLE Villagers(
    ID INT,
    CoordinateX INT NOT NULL,
    CoordinateY INT NOT NULL,
    CoordinateZ INT NOT NULL,
    Health VARCHAR(20) NOT NULL,
    Occupation VARCHAR(20) NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY (CoordinateX,CoordinateY,CoordinateZ) REFERENCES Villages(CoordinateX,CoordinateY,CoordinateZ) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


CREATE TABLE Host_In(
  Reputation VARCHAR(20),
  CoordinateX INT NOT NULL,
  CoordinateY INT NOT NULL,
  CoordinateZ INT NOT NULL,
  User_ID INT NOT NULL,
  PRIMARY KEY(CoordinateX, CoordinateY,CoordinateZ,User_ID),
  FOREIGN KEY(CoordinateX, CoordinateY,CoordinateZ) REFERENCES Villages(CoordinateX, CoordinateY,CoordinateZ)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY(User_ID) REFERENCES User(ID) 
  ON UPDATE CASCADE
  ON DELETE CASCADE
);

CREATE TABLE Storage(
  ID INT AUTO_INCREMENT,
  Type VARCHAR(20) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE Items_stored_at(
  CountItems INT,
  Storage_ID INT,
  Items_ID INT,
  PRIMARY KEY(Storage_ID, Items_ID),
  FOREIGN KEY (Storage_ID) REFERENCES Storage(ID)
   ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (Items_ID) REFERENCES Items (ID)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);

CREATE TABLE Blocks_stored_at(
  Count INT,
  Storage_ID INT,
  Block_Type VARCHAR(20),
  PRIMARY KEY(Storage_ID, Block_Type),
  FOREIGN KEY(Storage_ID) REFERENCES Storage(ID),
  FOREIGN KEY(Block_Type) REFERENCES Block_Types(Type)
);
CREATE TABLE Chest(
  Storage_ID INT NOT NULL,
  LocationX INT,
  LocationY INT,
  LocationZ INT,
  PRIMARY KEY(Storage_ID)
);

CREATE TABLE Ender_Chest(
  Storage_ID INT NOT NULL,
  User_ID INT,
  PRIMARY KEY(Storage_ID)
);

CREATE TABLE User_storage(
  Storage_ID INT NOT NULL,
  User_ID INT,
  PRIMARY KEY(Storage_ID),
  FOREIGN KEY(User_ID) REFERENCES User(ID) 
  ON UPDATE CASCADE
  ON DELETE CASCADE
);

CREATE TABLE Monster(
   ID INT,
   Health VARCHAR(20) NOT NULL,
   Damage INT,
   PRIMARY KEY(ID)
);

CREATE TABLE Gangs(
   Location VARCHAR(10),
   PRIMARY KEY (Location)
);

CREATE TABLE Pillagers(
   ID INT NOT NULL,
   Location VARCHAR(10),
   Occupation VARCHAR(20),
   PRIMARY KEY(ID),
   FOREIGN KEY (Location) REFERENCES Gangs(Location) 
   ON UPDATE CASCADE
   ON DELETE CASCADE
);

CREATE TABLE Animal(
    ID INT NOT NULL,
    Type VARCHAR(20) NOT NULL,
    Health VARCHAR(20) NOT NULL,
    Damage INT NOT NULL,
    UserID INT NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
