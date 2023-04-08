require('dotenv').config();

const db = require('./db').connection;

const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.end();
})

app.get('/movies', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});