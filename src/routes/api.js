const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('../db').connection;
const { checkUserAuthToken } = require('../user');

const router = express.Router();

router.use(express.json());
router.use(cookieParser());

function checkAuthTokenMiddleware(req, res, next) {
	checkUserAuthToken(req.cookies.auth_id, (err, valid, id) => {
		if (err) throw err;

		if (!valid){
			res.status(401);
			res.end();
		} else {
			req.userId = id;
			next();
		}
	})
}

router.get('/movies', checkAuthTokenMiddleware, (req, res) => {
	db.query('SELECT id, title, posterImageUrl FROM movies', (err, results, fields) => {
		if (err) {
			res.status(500);
			res.json({error: err});
			return;
		}

		const data = results.map(row => row);
		res.json(data);
	})
})

router.get('/votes', checkAuthTokenMiddleware, (req, res) => {
	db.query(`SELECT movies.id, count(votes.user_id) AS votes FROM votes
		RIGHT JOIN movies ON votes.movie_id = movies.id
		GROUP BY movies.id
	`, (err, results, fields) => {
		if (err) {
			res.status(500);
			res.json({error: err});
			return;
		}

		res.json(results);
	})
})

/* Returns the users who voted for a specific movie */
router.get('/votes/movie/:movieId', checkAuthTokenMiddleware, (req, res) => {
	db.query(`SELECT users.id, users.username FROM votes
		INNER JOIN users ON votes.user_id = users.id
		WHERE votes.movie_id = ?`,
	[req.params.movieId], (err, results, fields) => {
		if (err) {
			res.status(500);
			res.json({error: err});
			return;
		}

		res.json(results);
	})
})

/* Casts a vote to the specific movie */
router.post('/votes/movie/:movieId', checkAuthTokenMiddleware, (req, res) => {
	// Check if the user has already voted
	db.query(`SELECT COUNT(user_id) AS count FROM votes WHERE user_id = ?`,
	[req.userId], (err, results, fields) => {
		if (err) {
			res.status(500);
			res.json({error: err});
			return;
		}

		if (results[0].count > 0){
			res.status(409);
			res.end();
			return;
		}

		db.query(`INSERT INTO votes(movie_id, user_id) VALUES (?, ?)`,
		[req.params.movieId, req.userId], (err, results, fields) => {
			if (err) {
				res.status(500);
				res.json({error: err});
				return;
			}

			res.end();
		})
	})
})

/* Returns the movies voted by the authenticated user. Useful for checking if
 * the user has already voted or not. */
router.get('/votes/user', checkAuthTokenMiddleware, (req, res) => {
	db.query(`SELECT movie_id FROM votes WHERE user_id = ?`,
	[req.userId], (err, results, fields) => {
		if (err) {
			res.status(500);
			res.json({error: err});
			return;
		}

		const data = results.map(row => row.movie_id);
		res.json(data);
	})
})

module.exports = router;