/**
 * @fileoverview Creates a DB connection to be shared between all modules.
 * This takes advantage of Node's module caching (https://nodejs.org/docs/latest/api/modules.html#caching)
 * which returns the same object when requiring the same module.
 */

require('dotenv').config();

const mysql = require('mysql');

/**
 * Initializes the tables of the database, if they do not exist.
 */
function initDB(connection){
    connection.query(`CREATE TABLE IF NOT EXISTS movies (
        id int NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        posterImageUrl varchar(4095),
        PRIMARY KEY (id)
    );`, (err, results, fields) => {
        if (err) throw err;

        console.log("Table 'movies' created successfully");
    });
}

// Create the connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (err) throw err;

    console.log('Connected to database');

    initDB(connection);
})

module.exports = {connection};