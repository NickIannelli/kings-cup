const { createActions } = require('./utils');

const emptyAction = () => {};

const actions = createActions({
	SET_USERNAME: name => ({ name }),
	DISCONNECT: emptyAction,
	START_GAME: emptyAction,
	DRAW_CARD: index => ({ index }),
	SET_CARD_DETAIL: (value, detail, suit = 'ALL') => ({ value, detail, suit }),
	SAVE_AVATAR: image => ({ image }),
	REMAKE_GAME: emptyAction
});

module.exports = actions;
