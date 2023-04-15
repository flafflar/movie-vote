const axios = require('axios');

const express = require('express');
const router = express.Router();

const { generateUserAuthToken } = require('../user');

router.get('/', (req, res) => {
	if (!req.query.code){
		res.status(400);
		return;
	}

	// Exchange the Authorization Code for a short-lived Instagram User Access
	// Token. The User Access Token is then used get the username of the
	// authenticated user.
	axios.post('https://api.instagram.com/oauth/access_token', new URLSearchParams({
		client_id: process.env.INSTAGRAM_APP_ID,
		client_secret: process.env.INSTAGRAM_APP_SECRET,
		code: req.query.code,
		grant_type: 'authorization_code',
		redirect_uri: 'https://localhost:3000/oauth'
	})).then((response) => {
		const userId = response.data.user_id;
		const accessToken = response.data.access_token;

		axios.get(`https://graph.instagram.com/v16.0/${userId}?fields=username&access_token=${accessToken}`).then((response) => {

			generateUserAuthToken(response.data.username, (err, token, expires) => {
				if (err) throw err;

				res.cookie('auth_id', token, {expires});
				res.redirect('/');
			});

		}).catch((err) => console.error(err));

	}).catch((err) => console.error(err.response.data));
})

module.exports = router;