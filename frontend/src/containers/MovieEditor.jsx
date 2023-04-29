import { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../Main';

import './MovieEditor.css';

export default function MovieEditor({ forMovieId }) {
	const {movies} = useContext(MoviesContext);

	const [title, setTitle] = useState('');
	const [posterUrl, setPosterUrl] = useState('');

	useEffect(() => {
		if (forMovieId !== null){
			const movie = movies.find(movie => movie.id === forMovieId);
			setTitle(movie.title);
			setPosterUrl(movie.posterImageUrl);
		}
	}, [movies, forMovieId]);

	return (
		<form className="movie-editor">
			<div className="inputs">
				<label for="movie-title-input">Title:</label>
				<input
					id="movie-title-input"
					type='text'
					value={title}
				/>
				<label for="movie-poster-url-input">Poster image URL:</label>
				<input
					id="movie-poster-url-input"
					type='url'
					value={posterUrl}
				/>
			</div>
			<div className="buttons">
				<div className="button">Cancel</div>
				<div className='button inverted'>Submit</div>
			</div>
		</form>
	);
}