import React from 'react';
import { toast } from 'react-toastify';
import { drawCard } from '@kings-cup/shared/actions';
import { useScrollLock } from '../../util/hooks';
import { cardDescription } from '../../util/cards';
import { useGameState, useOnMessageReceived } from './../../@library/GameConnector';
import PlayerList from '../../components/PlayerList';
import Gameboard from './Gameboard';
import { getCardImage } from './../../util/image';
import EndgameSpash from './EndgameSpash';
import { useHistory } from 'react-router-dom';

const getPlayerByIndex = players => i => players[Object.keys(players)[i]];
const getPlayerName = player => player.name || player.id;

export const GameScreen = () => {
	useScrollLock();
	const history = useHistory();
	const { state = {}, getSelf } = useGameState();
	const { active, players = {}, deck } = state;
	const activePlayer = getPlayerByIndex(players)(active) || {};
	const self = getSelf() || {};
	const yourTurn = activePlayer.id === self.id;

	React.useEffect(() => {
		if (!state.hasStarted) {
			history.push('/game/lobby');
		}
	}, [state.hasStarted]);

	useOnMessageReceived(message => {
		if (message.type === drawCard.toString()) {
			toast.warning(
				<>
					<img src={getCardImage(message.card)} className="AvatarContainer AvatarContainer--card" />
					<img src={players[message.player].avatar} className="AvatarContainer" />
					<div>
						{getPlayerName(players[message.player])} just drew a {cardDescription(message.card)}
					</div>
					<div>
						{message.rule || "No rule defined for this card... I guess you're playing it by ear"}!
					</div>
				</>
			);
		}
	});
	const isGameOver = (deck || []).filter(({ isDrawn } = {}) => !isDrawn).length === 0;

	return (
		<>
			<div
				className="column-layout container gameboard"
				style={isGameOver ? { filter: 'brightness(0.3)' } : {}}
			>
				{!isGameOver && <h1>It's {yourTurn ? 'your' : `${getPlayerName(activePlayer)}'s`} turn</h1>}
				<PlayerList />
				<Gameboard canDraw={yourTurn && !isGameOver} />
			</div>
			{isGameOver && <EndgameSpash />}
		</>
	);
};

export default GameScreen;
