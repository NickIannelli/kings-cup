import { Room, Client } from 'colyseus';
import { shuffle } from 'lodash';
import getDerivedState from './reducer';
import { Suit, Card, Player, State } from './types';

const getValue = (v: number): string => {
	switch (v) {
		case 1:
			return 'A';
		case 11:
			return 'J';
		case 12:
			return 'Q';
		case 13:
			return 'K';
		default:
			return v.toString();
	}
};

export class KingsCupRoom extends Room {
	reducer = getDerivedState.bind(this);

	onCreate(options: any) {
		console.log(`Room Created`, options);
		this.setState(new State());
		this.populateDeck();
	}

	onJoin(client: Client, options: any) {
		if (!this.state.hasStarted) {
			console.log(`client "${client.sessionId}" has joined, options =>`, options);
			const player = new Player();
			player.id = client.sessionId;
			player.connected = true;
			if (Object.keys(this.state.players).every(player => !this.state.players[player].isHost)) {
				player.isHost = true;
			}
			this.state.players[client.sessionId] = player;
		}
	}

	async onLeave(client: Client, consented: boolean) {
		try {
			this.state.players[client.sessionId].connected = false;
			if (consented) {
				throw new Error('consented leave!');
			}

			console.log("let's wait for reconnection!");
			const newClient = await this.allowReconnection(client, 60);
			console.log('reconnected!', newClient.sessionId);
			this.state.players[newClient.sessionId].connected = true;
		} catch (e) {
			console.log('disconnected!', client.sessionId);
			// Add logic to move isHost attributes
			const { active, hasStarted } = this.state;

			if (hasStarted) {
				const index = Object.keys(this.state.players).findIndex(key => key === client.sessionId);
				if (index < active) {
					this.state.active = active - 1;
				} else if (active === Object.keys(this.state.players).length - 1) {
					// Last person on list DC'd, and it's their turn = go to first persons turn
					this.state.active = 0;
				}
			}
			delete this.state.players[client.sessionId];
		}
	}

	onMessage(client: Client, message: any) {
		const action = {
			...message,
			client
		};
		this.reducer(this.state, action);
	}

	onDispose() {
		console.log('Disposing KingsCup Room');
	}

	populateDeck() {
		let deck = [] as any;
		for (let suits = 0; suits < 4; suits++) {
			for (let values = 1; values <= 13; values++) {
				deck.push({ suit: Suit[suits], value: getValue(values) });
			}
		}
		deck = shuffle(deck);
		// Note: Have to do it this way as the shuffle lodash method doesn't recognise ArraySchema as an array... :S
		deck.forEach(card => {
			const newCard = new Card();
			newCard.suit = card.suit;
			newCard.value = card.value;
			newCard.isDrawn = false;
			this.state.deck.push(newCard);
		});
	}

	getPlayer(client: Client): Player {
		return this.state.players[client.sessionId];
	}
}
