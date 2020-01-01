import React from 'react';
import { Link, useRouteMatch, withRouter } from 'react-router-dom';
import { setUsername, startGame } from '@kings-cup/shared/actions';
import { useGameState, useMessageHandler } from './../../@library/GameConnector';
import { getCardImage } from './../../util/image';

export const LobbyScreen = ({ history }) => {
	const { path } = useRouteMatch();
	const { state = {}, getSelf } = useGameState();
	const send = useMessageHandler();
	const [name, setName] = React.useState('');

	const { name: selfName, id: selfId } = getSelf();
	React.useEffect(() => {
		setName(selfName || '');
	}, [selfName]);

	React.useEffect(() => {
		if (state.hasStarted) {
			history.push('/game/play');
		}
	}, [state.hasStarted]);

	const onSubmit = e => {
		e.preventDefault();
		send(setUsername(name));
		document.activeElement.blur();
	};

	const start = () => {
		send(startGame());
	};

	return (
		<div style={{ paddingBottom: '130px' }}>
			{getSelf().isHost && (
				<button onClick={start} type="button" className="CTA">
					Start
				</button>
			)}
			<h2 className="row">Players:</h2>
			<ul className="notList">
				{Object.keys(state?.players ?? {}).map(id => {
					const player = state.players[id];
					return (
						<li key={id} className={`PlayerRow${id === selfId ? ' selected' : ''}`}>
							<img src={player.avatar} className="AvatarContainer" alt="" />
							<div className="name">
								{player.name || id}
								{player.isHost ? '*' : ''}
							</div>
						</li>
					);
				})}
			</ul>
			<div className="Flex Flex--edges row">
				<h2>Rules:</h2>
				{getSelf().isHost && (
					<Link to={`${path}/edit`} className="h2">
						<h2>Edit</h2>
					</Link>
				)}
			</div>
			{Object.keys(state?.rules ?? {}).map(id => {
				const rule = state.rules[id];
				return (
					<li key={id} className="PlayerRow">
						<img
							src={getCardImage(rule.card)}
							className="AvatarContainer AvatarContainer--card"
							alt=""
						/>
						<div className="name">{rule.rule}</div>
					</li>
				);
			})}
			<div className="Fixed Fixed--bottom Fixed--stylish">
				<Link
					to={`${path}/draw`}
					style={{ position: 'relative', alignSelf: 'flex-end', padding: '10px 0 10px 10px' }}
				>
					<img src={getSelf()?.avatar || ''} className="AvatarContainer" alt="" />
					<span
						style={{
							position: 'absolute',
							top: '32%',
							left: '21px',
							color: 'black',
							fontWeight: 'bold',
							textShadow: '0px 0px 3px white'
						}}
					>
						Set
					</span>
				</Link>
				<form onSubmit={onSubmit} action="#" style={{ padding: '10px' }}>
					<input
						style={{ textAlign: 'left' }}
						placeholder="Your name"
						type="text"
						value={name}
						onChange={e => setName(e.currentTarget.value)}
						onBlur={onSubmit}
					/>
				</form>
			</div>
		</div>
	);
};

export default withRouter(LobbyScreen);
