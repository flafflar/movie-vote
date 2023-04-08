import { useState } from "react";

import { getMovies } from '../api/client';

import MovieRow from '../components/MovieRow';

import './MovieList.css';

export default function MovieList() {
	const [movies, setMovies] = useState(undefined);

	if (movies === undefined){
		// TODO: Error handling
		getMovies().then(movies => setMovies(movies)).catch(err => console.error(err));
	}

	let movieRows = movies?.map(movie => <MovieRow key={movie.id} title={movie.title} posterUrl={movie.posterImageUrl} />)

	return <div className="movie-list">{movieRows}</div>;
}