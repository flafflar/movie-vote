import { useState, createContext, useEffect } from "react";
import { getMovies } from "./api/client";

export const MoviesContext = createContext({
	movies: null,
	fetchMovies: () => {}
});


export default function Main({ children }) {
	const [movies, setMovies] = useState(null);

	function fetchMovies() {
		getMovies().then(movies => setMovies(movies)).catch(err => console.error(err));
	}

	useEffect(() => {
		if (movies === null){
			fetchMovies();
		}
	});

	return (
		<MoviesContext.Provider value={{movies, fetchMovies}}>
			<div className="app">
				<div className='main-content'>{
					children
				}</div>
			</div>
		</MoviesContext.Provider>
	);
}
