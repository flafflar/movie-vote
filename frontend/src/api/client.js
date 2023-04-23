import axios from 'axios';

export async function getMovies() {
	let res = await axios.get(`/api/movies`);

	if (res.status !== 200){
		// TODO
		throw res.status;
	}

	return res.data;
}

export async function getVotes() {
	let res = await axios.get('/api/votes');

	if (res.status !== 200){
		// TODO
		throw res.status;
	}

	return res.data;
}