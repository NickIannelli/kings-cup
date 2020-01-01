import React from 'react';
import { useHistory } from 'react-router-dom';
import { remakeGame } from '@kings-cup/shared/actions';
import { useRoom, useClearMessages } from '../../@library/GameConnector';

export const EndgameSplash = () => {
	const room = useRoom();
	const history = useHistory();
	const clearMessages = useClearMessages();
	const leave = () => {
		room.leave();
		history.push('/');
		window.localStorage.removeItem('@@Colosyius_GC_kings_cup');
	};
	const remake = () => {
		room.send(remakeGame());
		clearMessages();
	};
	return (
		<div className="endgame-splash">
			<h1>Game complete!</h1>
			<button onClick={remake} type="button">
				Play again
			</button>
			<button onClick={leave} type="button" className="leave">
				Leave
			</button>
		</div>
	);
};

export default EndgameSplash;
