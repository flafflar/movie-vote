import { useState } from "react";

import { getMovies, getVotes, castVote, getHasVoted } from '../api/client';

import MovieRow from '../components/MovieRow';

import './MovieList.css';

export default function MovieList() {
	const [movies, setMovies] = useState(undefined);
	const [votes, setVotes] = useState([]);

	const [voted, setVoted] = useState(null);

	if (voted === null){
		// TODO: Error handling
		getHasVoted().then(hasVoted => setVoted(hasVoted)).catch(err => console.error(err));
	}

	if (movies === undefined){
		// TODO: Error handling
		getMovies().then(movies => setMovies(movies)).catch(err => console.error(err));
	}

	if (voted && votes.length === 0){
		// TODO: Error handling
		getVotes().then(votes => setVotes(votes)).catch(err => console.error(err));
	}

	const totalVotes = votes.reduce((sum, v) => sum + v.votes, 0);

	let movieRows = movies?.map(movie =>
		<MovieRow
			key={movie.id}
			title={movie.title}
			posterUrl={movie.posterImageUrl}
			enableVoting={voted ? votes.length > 0 : true}
			totalVotes={voted ? totalVotes : 0}
			votes={votes.find(v => v.id === movie.id)?.votes}
			onVote={() => {
				castVote(movie.id).then(() => {
					setVoted(true)
				}).catch(err => console.log(err));
			}}
		/>
	)

	return <div className="movie-list">{movieRows}</div>;
}