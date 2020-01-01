import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Game from './Game';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => (
	<BrowserRouter>
		<ToastContainer
			position="top-center"
			autoClose={false}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnVisibilityChange
			draggable
			pauseOnHover
			draggablePercent={40}
		/>
		<Game />
	</BrowserRouter>
);
export default App;
