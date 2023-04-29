import Cookie from 'js-cookie';

import MovieList from '../containers/MovieList';
import LoginList from '../components/LoginList';

import './App.css';

function App() {
	const isLoggedIn = !!Cookie.get('auth_id');

	return isLoggedIn ? <MovieList /> : <LoginList />;
}

export default App;
