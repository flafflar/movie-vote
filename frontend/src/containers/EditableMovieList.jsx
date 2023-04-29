import { useEffect, useState } from 'react';
import { getMovies } from '../api/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import MovieRow from '../components/MovieRow';
import IconButton from '../components/IconButton';

import './MovieList.css';

export default function EditableMovieList() {
	const [movies, setMovies] = useState(undefined);

	useEffect(() => {
		if (movies === undefined){
			// TODO: Error handling
			getMovies().then(movies => setMovies(movies)).catch(err => console.error(err))
		}
	}, [movies]);

	const movieRows = movies?.map(movie => (
		<MovieRow
			key={movie.id}
			title={movie.title}
			posterUrl={movie.posterImageUrl}
			totalVotes={0}
			actionElement={
				<div className='action-button'>
					<FontAwesomeIcon icon={faPenToSquare} size='xl' />
				</div>
			}
		/>
	))

	return <>
		<div className="movie-list">
			{movieRows}
		</div>
		<IconButton
			icon={<FontAwesomeIcon icon={faPlusSquare} size='xl' />}
			text="Add new"
		/>
	</>
}