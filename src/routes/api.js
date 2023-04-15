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

module.exports = router;