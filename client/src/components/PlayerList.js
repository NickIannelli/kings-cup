import React from 'react';
import { useGameState } from '../@library/GameConnector';
import './playerlist.css';

export const PlayerList = () => {
	const { state = {}, getSelf } = useGameState();

	if (!state || !state.players) return null;
	const self = getSelf();
	const { players } = state;
	return (
		<ul className="PlayerList notList">
			{Object.keys(players).map((playerId, i) => {
				const player = players[playerId];
				return (
					<li
						key={playerId}
						className={[self.id === playerId ? 'self' : '', state.active === i ? 'selected' : '']
							.filter(i => !!i)
							.join(' ')}
					>
						<img src={player.avatar} className="AvatarContainer" />
						{player.name || player.id}
						<div className={`StatusDot ${player.connected ? 'green' : 'orange'}`} />
					</li>
				);
			})}
		</ul>
	);
};

export default PlayerList;
