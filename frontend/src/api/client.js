import axios from 'axios';

export async function getMovies() {
	let res = await axios.get(`/api/movies`);

	if (res.status !== 200){
		// TODO
		throw res.status;
	}

	return res.data;
}

export async function getHasVoted() {
	let res = await axios.get('/api/votes/user');

	// TODO: Error handling
	if (res.status !== 200){
		throw res.status;
	}

	return res.data.length !== 0;
}

export async function getVotes() {
	let res = await axios.get('/api/votes');

	if (res.status !== 200){
		// TODO
		throw res.status;
	}

	return res.data;
}

export async function castVote(movieId) {
	let res = await axios.post(`/api/votes/movie/${movieId}`);

	if (res.status !== 200) {
		// TODO
		throw res.status;
	}
}