import './MovieRow.css';

export default function MovieRow({ title, posterUrl }){
	return (
		<div className="movie-row">
			<div className="movie-image">
				<img src={posterUrl} />
			</div>
			<div className="movie-details">
				<div className="movie-details-layer movie-info">
					<div className="movie-title">{title}</div>
					<div className="vote-button">Vote</div>
				</div>
				<div className="movie-details-layer vote-bar-container">
					<div className="vote-bar"></div>
				</div>
			</div>
		</div>
	)
}