import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGameState, useRoom } from '../@library/GameConnector';
import { useLocation } from 'react-router-dom';
import './GameNavigation.css';

export const GameNavigation = () => {
	const { state } = useGameState();
	const room = useRoom();
	const history = useHistory();
	useLocation();

	const handleLeave = () => {
		const result = state?.hasStarted
			? window.confirm('Are you sure? There is a game in progress!')
			: true;
		if (result) {
			room.leave();
			history.push('/');
			window.localStorage.removeItem('@@Colosyius_GC_kings_cup');
		}
	};
	const renderHeader = hidden => (
		<div className={`Header${hidden ? ' is-hidden' : ''}`}>
			{history.length > 1 && (
				<div className="Header-actionBar">
					{!state?.hasStarted && (
						<button
							onClick={e => {
								e.preventDefault();
								history.go(-1);
							}}
						>
							Back
						</button>
					)}
					<span className="spacer" />
					{!!state && <button onClick={handleLeave}>Leave</button>}
				</div>
			)}
			<div className="Header-title">
				<h1>Kings Cup</h1>
			</div>
		</div>
	);

	return (
		<div>
			{renderHeader(true)}
			{renderHeader(false)}
		</div>
	);
};

export default GameNavigation;
