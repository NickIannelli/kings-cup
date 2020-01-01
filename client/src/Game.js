import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeScreen from './feature/HomePage';
import FindScreen from './feature/FindGame';
import GameRouter from './GameRouter';

export const Game = () => (
	<>
		<Switch>
			<Route exact path="/">
				<HomeScreen />
			</Route>
			<Route exact path="/find">
				<FindScreen />
			</Route>
			<Route path="/game">
				<GameRouter />
			</Route>
		</Switch>
	</>
);

export default Game;
