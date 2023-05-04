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
 * @callback CheckUserAuthTokenCallback
 * @param {Error | null} err
 * @param {boolean} valid Whether the token is valid.
 * @param {number | undefined} id The id of the authenticated user.
 * @param {boolean | undefined} isAdmin Whether the authenticated user is an
 * admin.
 */

/**
 * Checks if an authentication token is valid.
 *
 * @param {string} token The token to check.
 * @param {CheckUserAuthTokenCallback} callback
 */
function checkUserAuthToken(token, callback){
	db.query(`SELECT users.id, users.is_admin FROM user_tokens
		INNER JOIN users ON user_tokens.user_id = users.id
		WHERE token = ?`,
	[token], (err, results, fields) => {
		if (err) return callback(err);

		if (results.length === 0){
			callback(null, false, null);
		} else {
			callback(null, true, results[0].id, results[0].is_admin);
		}

	})
}

module.exports = {
	generateUserAuthToken,
	checkUserAuthToken
}