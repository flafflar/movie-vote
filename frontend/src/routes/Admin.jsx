import EditableMovieList from '../containers/EditableMovieList';
import './App.css';

export default function Admin() {
	return (
		<div className='app'>
			<div className='main-content'>
				<EditableMovieList />
			</div>
		</div>
	);
}