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

	// This table is used to store all the valid users that are allowed to use
	// the app
	connection.query(`CREATE TABLE IF NOT EXISTS users (
		id int NOT NULL AUTO_INCREMENT,
		username varchar(255) NOT NULL,
		is_admin boolean NOT NULL,
		PRIMARY KEY (id)
	)`, (err, results, fields) => {
		if (err) throw err;

		console.log("Table 'users' created successfully");
	})

	// This table stores all the authentication tokens generated for each user
	connection.query(`CREATE TABLE IF NOT EXISTS user_tokens (
		user_id int NOT NULL,
		token varchar(36) NOT NULL UNIQUE,
		expires datetime NOT NULL,
		CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id)
	)`, (err, results, fields) => {
		if (err) throw err;

		console.log("Table 'user_tokens' created successfully");
	})

	// This event automatically deletes expired tokens
	connection.query(`CREATE EVENT IF NOT EXISTS expired_user_tokens_delete
		ON SCHEDULE EVERY 1 HOUR DO
		DELETE FROM user_tokens WHERE expires <= CURRENT_TIMESTAMP()
	`, (err, results, fields) => {
		if (err) throw err;

		console.log("Event 'expired_user_tokens_delete' created successfully");
	})

	// This table stores all the votes
	connection.query(`CREATE TABLE IF NOT EXISTS votes (
		movie_id int NOT NULL,
		user_id int NOT NULL,
		CONSTRAINT FK_movie_id FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT FK_vote_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
	)`, (err, results, fields) => {
		if (err) throw err;

		console.log("Table 'votes' created successfully");
	})
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