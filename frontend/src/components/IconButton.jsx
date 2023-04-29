import './IconButton.css';

export default function IconButton({ icon, text, onClick }) {
	return (
		<div className='button' onClick={onClick}>
			<span className='icon'>{icon}</span>
			{text}
		</div>
	);
}