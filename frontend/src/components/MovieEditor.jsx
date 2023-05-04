import { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../Main';

import './MovieEditor.css';

export default function MovieEditor({ title, posterUrl, onCancel, onSubmit }) {
	const [titleValue, setTitleValue] = useState(title);
	const [posterUrlValue, setPosterUrlValue] = useState(posterUrl);

	useEffect(() => {
		setTitleValue(title);
		setPosterUrlValue(posterUrl);
	}, [title, posterUrl]);

	function cancel() {
		// Reset the values in case the modal is reopened
		setTitleValue(title);
		setPosterUrlValue(posterUrl);

		onCancel();
	}

	function submit() {
		onSubmit({
			title: titleValue,
			posterUrl: posterUrlValue
		})
	}

	return (
		<form className="movie-editor" onSubmit={submit}>
			<div className="inputs">
				<label for="movie-title-input">Title:</label>
				<input
					id="movie-title-input"
					type='text'
					value={titleValue}
					onChange={(e) => setTitleValue(e.target.value)}
				/>
				<label for="movie-poster-url-input">Poster image URL:</label>
				<input
					id="movie-poster-url-input"
					type='url'
					value={posterUrlValue}
					onChange={(e) => setPosterUrlValue(e.target.value)}
				/>
			</div>
			<div className="buttons">
				<div className="button" onClick={cancel}>Cancel</div>
				<div className='button inverted' onClick={submit}>Submit</div>
			</div>
		</form>
	);
}