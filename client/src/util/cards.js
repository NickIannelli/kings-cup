const cardAliases = {
	J: 'Jack',
	Q: 'Queen',
	K: 'King',
	A: 'Ace'
};

export const cardDescription = card => `${cardAliases[card.value] || card.value} of ${card.suit}s`;
