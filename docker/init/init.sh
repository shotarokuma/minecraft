#!/bin/bash

# create table
mysql -u root -proot minecraft < "/docker-entrypoint-initdb.d/sql/init-schema.sql"

# insert data
mysql -u root -proot minecraft < "/docker-entrypoint-initdb.d/sql/init-data.sql"