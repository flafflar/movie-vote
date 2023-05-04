import axios from 'axios';

export async function getMovies() {
	let res = await axios.get(`${process.env.PUBLIC_URL}/api/movies`);

	if (res.status !== 200){
		// TODO
		throw res.status;
	}

	return res.data;
}

export async function createMovie(title, posterImageUrl) {
	let res = await axios.post(`${process.env.PUBLIC_URL}/api/movies`, {
		title,
		posterImageUrl
	})

	if (res.status !== 200){
		// TODO
		throw res.status;
	}
}

export async function updateMovie(id, title, posterImageUrl) {
	let res = await axios.put(`${process.env.PUBLIC_URL}/api/movies/${id}`, {
		title,
		posterImageUrl
	});

	if (res.status !== 200){
		// TODO
		throw res.status;
	}
}

export async function getHasVoted() {
	let res = await axios.get(`${process.env.PUBLIC_URL}/api/votes/user`);

	// TODO: Error handling
	if (res.status !== 200){
		throw res.status;
	}

	return res.data.length !== 0;
}

export async function getVotes() {
	let res = await axios.get(`${process.env.PUBLIC_URL}/api/votes`);

	if (res.status !== 200){
		// TODO
		throw res.status;
	}

	return res.data;
}

export async function castVote(movieId) {
	let res = await axios.post(`${process.env.PUBLIC_URL}/api/votes/movie/${movieId}`);

	if (res.status !== 200) {
		// TODO
		throw res.status;
	}
}