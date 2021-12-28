-- Connect to mysql
mysql -u root -p
-- omit -p if password is not set

-- Type exit to finish session
exit

-- Create a new user
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

-- Drop user
DROP USER 'username'@'localhost';

-- Check all databases
SHOW databases;

-- Set default database for subsequent statements
USE databaseName;

-- Create database
CREATE DATABASE dbName;

-- Drop database
DROP DATABASE dbName;

