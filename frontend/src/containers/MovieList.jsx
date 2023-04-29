import { useEffect, useState } from "react";

import { getMovies, getVotes, castVote, getHasVoted } from '../api/client';

import MovieRow from '../components/MovieRow';
import Spinner from '../components/Spinner';

import './MovieList.css';

export default function MovieList() {
	const [movies, setMovies] = useState(undefined);
	const [votes, setVotes] = useState([]);

	const [voted, setVoted] = useState(null);

	useEffect(() => {
		if (voted === null){
			// TODO: Error handling
			getHasVoted().then(hasVoted => setVoted(hasVoted)).catch(err => console.error(err));
		}
	}, [voted]);

	useEffect(() => {
		if (movies === undefined){
			// TODO: Error handling
			getMovies().then(movies => setMovies(movies)).catch(err => console.error(err));
		}
	}, [movies]);

	useEffect(() => {
		if (voted){
			getVotes().then(votes => setVotes(votes)).catch(err => console.error(err));
		}
	}, [voted]);

	const totalVotes = votes.reduce((sum, v) => sum + v.votes, 0);

	let movieRows = movies?.map(movie =>
		<MovieRow
			key={movie.id}
			title={movie.title}
			posterUrl={movie.posterImageUrl}
			totalVotes={voted ? totalVotes : 0}
			votes={votes.find(v => v.id === movie.id)?.votes}
			actionElement={
				<div
					className="action-button vote-button"
					onClick={() => {
						if (voted === false) {
							// Set the voted to null to indicate that it is 
							// unknown whether the voting has succeeded. This
							// will also cause the spinner to display.
							setVoted(null);

							castVote(movie.id).then(() => {
								setVoted(true);
							}).catch(err => {
								setVoted(false);
								console.error(err)
							});
						}
					}}
				>{
					// Display a spinner either when:
					// - Not yet determined whether the user can vote (voted is 
					//   null).
					// - The user has voted (or is in the process of voting) and
					//   the votes have not been loaded yet.
					voted === null || (voted !== false && votes.length === 0)
					? <Spinner size='36px' />
					: 'Vote'
				}</div>
			}
		/>
	)

	return <div className="movie-list">{movieRows}</div>;
}