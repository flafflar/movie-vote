const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('../db').connection;
const { checkUserAuthToken } = require('../user');

const router = express.Router();

router.use(express.json());
router.use(cookieParser());

function checkAuthTokenMiddleware(req, res, next) {
	checkUserAuthToken(req.cookies.auth_id, (err, valid) => {
		if (err) throw err;

		if (!valid){
			res.status(401);
			res.end();
		} else {
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

module.exports = router;