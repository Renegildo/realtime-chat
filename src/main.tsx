import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />
	},
	{
		path: 'sign-up',
		element: <SignUp />,
	},
	{
		path: 'sign-in',
		element: <SignIn />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
