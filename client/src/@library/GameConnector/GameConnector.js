import React from 'react';
import * as Colyseus from 'colyseus.js';
import { withRouter } from 'react-router-dom';
import { pick } from 'lodash';

export const GameContext = React.createContext();

class GameConnector extends React.Component {
	client;
	state;

	constructor(props) {
		super(props);
		this.client = new Colyseus.Client(props.url);
		this.state = {
			isJoined: false,
			room: null,
			messages: [],
			...props.initialState
		};
		this.onVisibilityChange = this.onVisibilityChange.bind(this);
	}

	async componentDidMount() {
		this.onConnect();
		document.addEventListener('visibilitychange', this.onVisibilityChange);
	}

	componentWillUnmount() {
		document.removeEventListener('visibilitychange', this.onVisibilityChange);
		const { room } = this.state;
		if (room) {
			room.removeAllListeners();
			room.leave();
		}
		window.localStorage.removeItem(this.getLsKey());
	}

	getLsKey() {
		return `@@Colyseus_GC_${this.props.roomId}`;
	}

	async onVisibilityChange() {
		if (!document.hidden) {
			await this.onConnect();
		}
	}

	async onConnect() {
		try {
			const { roomId } = this.props;
			const key = this.getLsKey();
			const instance = JSON.parse(window.localStorage.getItem(key) || '{}');
			let room;
			if (instance.id && instance.sessionId) {
				try {
					room = await this.client.reconnect(instance.id, instance.sessionId);
				} catch (e) {
					window.localStorage.removeItem(key);
					if (window.location.pathname === '/') {
						room = await this.client.joinOrCreate(roomId);
					} else {
						this.props.history.push('/');
						return;
					}
				}
			} else {
				room = await this.client.joinOrCreate(roomId);
			}
			this.setState({
				isJoined: true,
				room
			});
			room.onStateChange(this.setState.bind(this));
			room.onMessage(message => {
				if (message === 'FORCE_DC') {
					room.leave();
					this.props.history.push('/');
				}
				this.setState(state => ({ messages: [...state.messages, message] }));
			});
			window.localStorage.setItem(key, JSON.stringify(pick(room, 'id', 'sessionId', 'name')));
			if (this.state._processing) {
				this.state._processing.forEach(room.send.bind(room));
				delete this.state._processing;
			}
		} catch (e) {
			console.log('could not join room', e);
			this.props.history.push('/');
		}
	}

	render() {
		return <GameContext.Provider value={this.state}>{this.props.children}</GameContext.Provider>;
	}
}

const getSelf = ({ room }) => room?.state.players[room?.sessionId] ?? {};

export const useGameState = () => {
	const state = React.useContext(GameContext);
	const result = state?.room?.serializer ?? {};
	result.getSelf = getSelf.bind(null, state);
	return result;
};

export const useMessageHandler = () => {
	const state = React.useContext(GameContext);
	if (state?.room?.send) {
		return message => {
			state.room.send(message);
		};
	}
	// stubbed method when room doesn't exist
	return message => {
		state._processing = [...(state._processing || []), message];
	};
};

export const useOnMessageReceived = fn => {
	const state = React.useContext(GameContext);
	React.useEffect(() => {
		if (state.messages.length) {
			fn(state.messages[state.messages.length - 1]);
		}
	}, [state.messages.length]);
};

export const useClearMessages = () => {
	const state = React.useContext(GameContext);
	return () => {
		state.messages = [];
	};
};

export const useRoom = () => {
	const state = React.useContext(GameContext);
	return state?.room ?? {};
};

export default withRouter(GameConnector);
