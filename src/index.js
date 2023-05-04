require('dotenv').config();

const db = require('./db').connection;

const express = require('express');
const app = express();

const apiRoute = require('./routes/api');
const oauthRoute = require('./routes/oauth');

const PORT = process.env.PORT || 3000;

app.use('/', express.static('frontend/build'))

app.get('/admin', (req, res) => res.sendFile('frontend/build/index.html'))

app.use('/api', apiRoute);

app.use('/oauth', oauthRoute);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});