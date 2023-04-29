import './MovieRow.css';

export default function MovieRow({ title, posterUrl, votes, totalVotes, actionElement }){
	const voted = totalVotes != 0;

	// const actionElement = <div className="vote-button" onClick={() => enableVoting && onVote()}>{enableVoting ? 'Vote' : <Spinner size='36px' />}</div>;

	return (
		<div className="movie-row">
			<div className="movie-image">
				<img src={posterUrl} />
			</div>
			<div className={"movie-details " + (voted ? "voted" : "")}>
				<div className="movie-info">
					<div className="movie-title">{title}</div>
					{actionElement}
				</div>
				<div className="vote-bar-container">
					<div
						className="vote-bar"
						style={{
							width: `${votes/totalVotes * 100}%`
						}}
					></div>
					<div className="votes-text">{votes}/{totalVotes}</div>
				</div>
			</div>
		</div>
	)
}