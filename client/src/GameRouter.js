import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { LobbyScreen, EditScreen, DrawScreen } from './feature/Lobby';
import GameScreen from './feature/PlayGame';
import GameConnector from './@library/GameConnector';
import GameNavigation from './components/GameNavigation';

export const GameRouter = () => {
	const { path } = useRouteMatch();
	const { hostname } = window?.location ?? {};
	const decorator = process.env.NODE_ENV === 'production' ? '/api' : ':2567';

	return (
		<GameConnector roomId="kings_cup" url={`ws://${hostname}${decorator}`}>
			<GameNavigation />
			<Switch>
				<Route exact path={`${path}/lobby`}>
					<LobbyScreen />
				</Route>
				<Route exact path={`${path}/lobby/edit`}>
					<EditScreen />
				</Route>
				<Route exact path={`${path}/lobby/draw`}>
					<DrawScreen />
				</Route>
				<Route exact path={`${path}/play`}>
					<GameScreen />
				</Route>
				<Redirect to={`${path}/lobby`} />
			</Switch>
		</GameConnector>
	);
};

export default GameRouter;
