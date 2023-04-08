require('dotenv').config();

const mysql = require('mysql');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const dbconn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

/**
 * Initializes the tables of the database, if they do not exist.
 */
function initDB(){
    dbconn.query(`CREATE TABLE IF NOT EXISTS movies (
        id int NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        posterImageUrl varchar(4095),
        PRIMARY KEY (id)
    );`, (err, results, fields) => {
        if (err) throw err;

        console.log("Table 'movies' created successfully");
    });
}

dbconn.connect((err) => {
    if (err) throw err;

    console.log('Connected to database');

    initDB();
})

app.get('/', (req, res) => {
    res.end();
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});