import * as actions from '@kings-cup/shared/actions';
import { omit } from 'lodash';
import { State, Action, Card, RuleCard, Action_CardDrawn } from './types';
import { KingsCupRoom } from './room';
import { Room } from 'colyseus';

const handler: any = {
	[actions.disconnect]: (_: State, action: Action) => {
		action.client.close();
	},

	[actions.drawCard]: function drawCard(this: Room, state: State, action: Action) {
		const idx: number = action.payload?.index ?? state.deck.length - 1;

		state.players[action.client.sessionId].hand.push(state.deck[idx]);
		const card = new Card();
		card.suit = state.deck[idx].suit;
		card.value = state.deck[idx].value;
		card.isDrawn = true;
		state.deck[idx] = card;
		state.active = (state.active + 1) % Object.keys(state.players).length;

		const drawAction = new Action_CardDrawn();
		drawAction.player = action.client.sessionId;
		drawAction.card = card;
		if (state.rules[`${card.value}_ALL`]) {
			drawAction.rule = state.rules[`${card.value}_ALL`].rule;
		}
		this.broadcast(drawAction, { except: action.client });
	},

	[actions.startGame]: function startGame(this: Room, state: State, action: Action) {
		if (state.players[action.client.sessionId].isHost && !state.hasStarted) {
			state.hasStarted = true;
			const index = Math.floor(Math.random() * Object.keys(state.players).length);
			state.active = index;
			this.lock();
		}
	},

	[actions.setUsername]: (state: State, action: Action) => {
		const { name } = action.payload;
		state.players[action.client.sessionId].name = name;
	},

	[actions.setCardDetail]: (state: State, action: Action) => {
		const { value, detail, suit } = action.payload;
		const { rules } = state;
		const foundRule = Object.keys(rules)
			.map(key => rules[key])
			.findIndex(({ card }) => card.value === value && card.suit === suit);
		if (foundRule > -1) {
			rules[`${value}_${suit}`].rule = detail;
			return;
		}
		const newRule = new RuleCard();
		const card = new Card();
		card.value = value;
		card.suit = suit;
		newRule.card = card;
		newRule.rule = detail;
		state.rules[`${value}_${suit}`] = newRule;
	},

	[actions.saveAvatar]: (state: State, action: Action) => {
		state.players[action.client.sessionId].avatar = action.payload.image;
	},

	[actions.remakeGame]: function remakeGame(this: KingsCupRoom, state: State) {
		this.populateDeck();
		Object.keys(state.players).forEach(player => {
			state.players[player].hand.length = 0;
		});
		state.hasStarted = false;
		this.unlock();
	}
};

function reducer(this: Room, state: State, action: Action) {
	const invoke: any = handler[action.type].bind(this);

	console.log('action', { ...omit(action, 'client'), sessionId: action.client.sessionId });

	if (typeof invoke === 'function') {
		invoke(state, action);
	} else {
		console.warn('>>> unknown action received', action?.type);
	}
}

export default reducer;
