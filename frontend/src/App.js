import Cookie from 'js-cookie';

import MovieList from './containers/MovieList';
import LoginList from './components/LoginList';

import './App.css';

function App() {
	const isLoggedIn = !!Cookie.get('auth_id');

	return (
		<div className="app">
			<div className='main-content'>{
				isLoggedIn ? <MovieList /> : <LoginList />
			}</div>
		</div>
	);
}

export default App;
