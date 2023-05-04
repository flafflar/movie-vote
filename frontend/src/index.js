import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Main from './Main';
import App from './routes/App';
import Admin from './routes/Admin';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
	},
	{
		path: '/admin',
		element: <Admin />
	}
], {basename: new URL(process.env.PUBLIC_URL).pathname})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Main>
			<RouterProvider router={router} />
		</Main>
	</React.StrictMode>
);