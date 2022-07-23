INSERT INTO User VALUES(1,'Mark',2,0,2, 1, 'Hunger',1,2,3);
INSERT INTO User VALUES(2,'Bob', 9,0,2, 5, 'Death',2,3,4);
INSERT INTO User VALUES(3,'Catherine', 0,1,3, 5, 'Instant Health',1,4,5);
INSERT INTO User VALUES(4,'Brian', 3,4,5, 2, 'Absorption',2,4,5);
INSERT INTO User VALUES(5,'Hao', 1,3,5, 2, 'Death',1,4,5);

INSERT INTO Chunks VALUES(0,0,0, 'rain');
INSERT INTO Chunks VALUES(0,0,1, 'sunny');
INSERT INTO Chunks VALUES(0,0,2, 'sunny');
INSERT INTO Chunks VALUES(1,0,0, 'rain');
INSERT INTO Chunks VALUES(0,1,0, 'rain');

INSERT INTO Block_Types VALUES('Stone', 4, 'Rock');
INSERT INTO Block_Types VALUES('Dirt', 1, 'Ground');
INSERT INTO Block_Types VALUES('Cobblestone', 4, 'Rock');
INSERT INTO Block_Types VALUES('Gold', 12, 'Metal');
INSERT INTO Block_Types VALUES('Ancient Debris', 9, 'Rock');

INSERT INTO Blocks VALUES(21,15,26, 0,0,0, 'Stone');
INSERT INTO Blocks VALUES(17,10,9, 0,0,1, 'Dirt');
INSERT INTO Blocks VALUES(170,55,14, 0,0,2, 'Cobblestone');
INSERT INTO Blocks VALUES(1,20,94, 1,0,0, 'Gold');
INSERT INTO Blocks VALUES(76,22,39, 0,1,0, 'Ancient Debris');

INSERT INTO Items(Type) VALUES('Boat');
INSERT INTO Items(Type) VALUES('Pickaxe');
INSERT INTO Items(Type) VALUES('Sword');
INSERT INTO Items(Type) VALUES('Heart of the Sea');
INSERT INTO Items(Type) VALUES('Spyglass');
INSERT INTO Items(Type) VALUES('Trident');
INSERT INTO Items(Type) VALUES('Fishing Rod');
INSERT INTO Items(Type) VALUES('Helmet');

INSERT INTO Tools VALUES(1, 10);
INSERT INTO Tools VALUES(2, 22);
INSERT INTO Tools VALUES(5, 12);
INSERT INTO Tools VALUES(6, 10);
INSERT INTO Tools VALUES(7, 11);

INSERT INTO Enchantments VALUES('Silk Touch', 1);
INSERT INTO Enchantments VALUES('Mending', 1);
INSERT INTO Enchantments VALUES('Unbreaking', 2);
INSERT INTO Enchantments VALUES('Aqua Affinity', 2);
INSERT INTO Enchantments VALUES('Feather Falling', 3);

INSERT INTO AppliedTo VALUES('Silk Touch', 1, 1);
INSERT INTO AppliedTo VALUES('Mending', 1, 1);
INSERT INTO AppliedTo VALUES('Unbreaking', 5, 2);
INSERT INTO AppliedTo VALUES('Unbreaking', 4, 2);
INSERT INTO AppliedTo VALUES('Mending', 7, 1);

INSERT INTO Villages VALUES(1,0,2);
INSERT INTO Villages VALUES(4,0,2);
INSERT INTO Villages VALUES(5,6,8);
INSERT INTO Villages VALUES(1,3,5);
INSERT INTO Villages VALUES(3,5,1);

INSERT INTO Villagers VALUES(1,1,0,2, 'Armourer', 'Death');
INSERT INTO Villagers VALUES(3,4,0,2, 'Farmer', 'Hunger');
INSERT INTO Villagers VALUES(2,5,6,8, 'Fisherman', 'Death');
INSERT INTO Villagers VALUES(4,3,5,1, 'Cartographer', 'Death');
INSERT INTO Villagers VALUES(5,5,6,8, 'Leatherworker', 'Instat Health');

INSERT INTO Host_In VALUES('bad',3,5,1, 1);
INSERT INTO Host_In VALUES('good',4,0,2, 2);
INSERT INTO Host_In VALUES('good',1,3,5, 3);
INSERT INTO Host_In VALUES('bad', 3,5,1, 4);

INSERT INTO Storage(Type) VALUES('User_storage');
INSERT INTO Storage(Type) VALUES('User_storage');
INSERT INTO Storage(Type) VALUES('User_storage');
INSERT INTO Storage(Type) VALUES('User_storage');
INSERT INTO Storage(Type) VALUES('User_storage');
INSERT INTO Storage(Type) VALUES('Ender_storage');
INSERT INTO Storage(Type) VALUES('Ender_storage');
INSERT INTO Storage(Type) VALUES('Ender_storage');
INSERT INTO Storage(Type) VALUES('Chest');
INSERT INTO Storage(Type) VALUES('Chest');
INSERT INTO Storage(Type) VALUES('Chest');

INSERT INTO Items_stored_at VALUES(1, 2, 1);
INSERT INTO Items_stored_at VALUES(1, 1, 1);
INSERT INTO Items_stored_at VALUES(1, 3, 1);
INSERT INTO Items_stored_at VALUES(1, 4, 1);
INSERT INTO Items_stored_at VALUES(2, 1, 2);
INSERT INTO Items_stored_at VALUES(2, 6, 1);
INSERT INTO Items_stored_at VALUES(2, 7, 1);
INSERT INTO Items_stored_at VALUES(3, 1, 3);
INSERT INTO Items_stored_at VALUES(6, 2, 2);
INSERT INTO Items_stored_at VALUES(7, 3, 2);
INSERT INTO Items_stored_at VALUES(9, 5, 1);
INSERT INTO Items_stored_at VALUES(10, 6, 2);

INSERT INTO Blocks_stored_at VALUES(1, 1, 'Stone');
INSERT INTO Blocks_stored_at VALUES(1, 2, 'Dirt');
INSERT INTO Blocks_stored_at VALUES(1, 5, 'CobbleStone');
INSERT INTO Blocks_stored_at VALUES(2, 5, 'Stone');
INSERT INTO Blocks_stored_at VALUES(2, 3, 'Gold');
INSERT INTO Blocks_stored_at VALUES(3, 2, 'Stone');
INSERT INTO Blocks_stored_at VALUES(3, 3, 'Dirt');
INSERT INTO Blocks_stored_at VALUES(5, 3, 'Stone');
INSERT INTO Blocks_stored_at VALUES(8, 4, 'Gold');
INSERT INTO Blocks_stored_at VALUES(11, 3, 'Ancient Debris');

INSERT INTO Chest VALUES(9, 22,33,44);
INSERT INTO Chest VALUES(10, 64,58,88);
INSERT INTO Chest VALUES(11, 45,56,77);

INSERT INTO Ender_Chest VALUES(6, 1);
INSERT INTO Ender_Chest VALUES(7, 3);
INSERT INTO Ender_Chest VALUES(8, 4);

INSERT INTO User_storage VALUES(1, 1);
INSERT INTO User_storage VALUES(2, 2);
INSERT INTO User_storage VALUES(3, 3);
INSERT INTO User_storage VALUES(4, 4);
INSERT INTO User_storage VALUES(5, 5);

INSERT INTO Monster VALUES(1, 'Hunger', 1);
INSERT INTO Monster VALUES(2, 'Death', 2);
INSERT INTO Monster VALUES(3, 'Normal', 5);
INSERT INTO Monster VALUES(4, 'Hunger', 4);
INSERT INTO Monster VALUES(5, 'Death', 2);

INSERT INTO Gangs VALUES('Village');
INSERT INTO Gangs VALUES('Desert');
INSERT INTO Gangs VALUES('Mountain');
INSERT INTO Gangs VALUES('Prison');
INSERT INTO Gangs VALUES('Forest');

INSERT INTO Pillagers VALUES(1, 'Prison', 'Armourer');
INSERT INTO Pillagers VALUES(2, 'Village', 'Farmer');
INSERT INTO Pillagers VALUES(3, 'Mountain', 'Fisherman');
INSERT INTO Pillagers VALUES(4, 'Prison', 'Cartographer');
INSERT INTO Pillagers VALUES(5, 'Mountain', 'Leatherworker');

INSERT INTO Animal VALUES(1, 'Hunger', 1);
INSERT INTO Animal VALUES(2, 'Death', 2);
INSERT INTO Animal VALUES(3, 'Normal', 3);
INSERT INTO Animal VALUES(4, 'Hunger', 4);
INSERT INTO Animal VALUES(5, 'Death', 2);