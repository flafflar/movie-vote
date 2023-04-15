const uuid = require('uuid');

const db = require('./db').connection;

/**
 * Generate a user authentication token and store it in the database.
 *
 * @param {string} username
 */
function generateUserAuthToken(username, callback){
	const token = uuid.v4();

	// Expire in a month
	const expires = new Date(Date.now() + 1000*60*60*24*30);

	db.query(`INSERT INTO user_tokens(user_id, token, expires)
	VALUES ((SELECT id FROM users WHERE username = ?), ?, ?)`,
	[username, token, expires], (err, results, fields) => {
		if (err) return callback(err);

		callback(null, token);
	})
}

/**
 * Checks if an authentication token is valid.
 *
 * @param {string} token The token to check.
 */
function checkUserAuthToken(token, callback){
	db.query(`SELECT user_id FROM user_tokens WHERE token = ?`, [token], (err, results, fields) => {
		if (err) return callback(err);

		callback(null, results.length !== 0);
	})
}

module.exports = {
	generateUserAuthToken,
	checkUserAuthToken
}