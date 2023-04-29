import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import { updateMovie } from '../api/client';
import { MoviesContext } from '../Main';
import MovieRow from '../components/MovieRow';
import IconButton from '../components/IconButton';
import ModalWindow from '../components/ModalWindow';
import MovieEditor from '../components/MovieEditor';

import './MovieList.css';

export default function EditableMovieList() {
	const {movies, fetchMovies} = useContext(MoviesContext);

	const [showModal, setShowModal] = useState(false);
	const [modalMovie, setModalMovie] = useState(null);

	function submitMovie(movieId, details) {
		updateMovie(movieId, details.title, details.posterUrl).then(() => {
			fetchMovies();
			setShowModal(false);
		}).catch((err) => console.error(err));
	}

	const movieRows = movies?.map(movie => (
		<MovieRow
			key={movie.id}
			title={movie.title}
			posterUrl={movie.posterImageUrl}
			totalVotes={0}
			actionElement={
				<div className='action-button' onClick={() => {
					setModalMovie(movie);
					setShowModal(true);
				}}>
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
		<ModalWindow
			title="Edit movie"
			show={showModal}
			onHide={() => setShowModal(false)}
		>
			<MovieEditor 
				title={modalMovie?.title}
				posterUrl={modalMovie?.posterImageUrl}
				onCancel={() => setShowModal(false)}
				onSubmit={(details) => submitMovie(modalMovie?.id, details)}
			/>
		</ModalWindow>
	</>
}