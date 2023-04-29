import './MovieEditor.css';

export default function MovieEditor() {
	return (
		<form className="movie-editor">
			<div className="inputs">
				<label for="movie-title-input">Title:</label>
				<input id="movie-title-input" type='text' />
				<label for="movie-poster-url-input">Poster image URL:</label>
				<input id="movie-poster-url-input" type='url' />
			</div>
			<div className="buttons">
				<div className="button">Cancel</div>
				<div className='button inverted'>Submit</div>
			</div>
		</form>
	);
}