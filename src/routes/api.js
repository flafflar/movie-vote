const express = require('express');
const db = require('../db').connection;

const router = express.Router();

router.use(express.json());

router.get('/movies', (req, res) => {
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