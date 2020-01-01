import { Schema, type, MapSchema, ArraySchema } from '@colyseus/schema';
import { drawCard } from '@kings-cup/shared/actions';
import { Client } from 'colyseus';

export enum Suit {
	Spade,
	Heart,
	Diamond,
	Club,
	All
}

export interface Action {
	type: string;
	payload: any;
	player: string;
	client: Client;
}

export class Card extends Schema {
	@type('string')
	suit: string = '';

	@type('string')
	value: string = '';

	@type('boolean')
	isDrawn: boolean = false;
}

export class Player extends Schema {
	@type([Card])
	hand = new ArraySchema<Card>();

	@type('string')
	name: string = '';

	@type('string')
	id: string = '';

	@type('string')
	avatar: string = '';

	@type('boolean')
	isHost: boolean = false;

	@type('boolean')
	connected: boolean = false;
}

export class RuleCard extends Schema {
	@type(Card)
	card = new Card();

	@type('string')
	rule: string = '';
}

export class State extends Schema {
	@type({ map: Player })
	players = new MapSchema<Player>();

	@type([Card])
	deck = new ArraySchema<Card>();

	@type('boolean')
	hasStarted: boolean = false;

	@type('number')
	active: number = 0;

	@type({ map: RuleCard })
	rules = new MapSchema<RuleCard>();
}

export class Action_CardDrawn extends Schema {
	@type('string')
	player: string = '';

	@type(Card)
	card = new Card();

	@type('string')
	rule: string = '';

	@type('string')
	type: string = drawCard.toString();
}
