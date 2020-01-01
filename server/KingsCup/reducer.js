"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var actions = require("@kings-cup/shared/actions");
var lodash_1 = require("lodash");
var types_1 = require("./types");
var handler = (_a = {},
    _a[actions.disconnect] = function (_, action) {
        action.client.close();
    },
    _a[actions.drawCard] = function drawCard(state, action) {
        var idx = action.payload ? .index ?  ? state.deck.length - 1 :  :  : ;
        state.players[action.client.sessionId].hand.push(state.deck[idx]);
        var card = new types_1.Card();
        card.suit = state.deck[idx].suit;
        card.value = state.deck[idx].value;
        card.isDrawn = true;
        state.deck[idx] = card;
        state.active = (state.active + 1) % Object.keys(state.players).length;
        var drawAction = new types_1.Action_CardDrawn();
        drawAction.player = action.client.sessionId;
        drawAction.card = card;
        if (state.rules[card.value + "_ALL"]) {
            drawAction.rule = state.rules[card.value + "_ALL"].rule;
        }
        this.broadcast(drawAction, { except: action.client });
    },
    _a[actions.startGame] = function startGame(state, action) {
        if (state.players[action.client.sessionId].isHost && !state.hasStarted) {
            state.hasStarted = true;
            var index = Math.floor(Math.random() * Object.keys(state.players).length);
            state.active = index;
            this.lock();
        }
    },
    _a[actions.setUsername] = function (state, action) {
        var name = action.payload.name;
        state.players[action.client.sessionId].name = name;
    },
    _a[actions.setCardDetail] = function (state, action) {
        var _a = action.payload, value = _a.value, detail = _a.detail, suit = _a.suit;
        var rules = state.rules;
        var foundRule = Object.keys(rules)
            .map(function (key) { return rules[key]; })
            .findIndex(function (_a) {
            var card = _a.card;
            return card.value === value && card.suit === suit;
        });
        if (foundRule > -1) {
            rules[value + "_" + suit].rule = detail;
            return;
        }
        var newRule = new types_1.RuleCard();
        var card = new types_1.Card();
        card.value = value;
        card.suit = suit;
        newRule.card = card;
        newRule.rule = detail;
        state.rules[value + "_" + suit] = newRule;
    },
    _a[actions.saveAvatar] = function (state, action) {
        state.players[action.client.sessionId].avatar = action.payload.image;
    },
    _a[actions.remakeGame] = function remakeGame(state) {
        this.populateDeck();
        Object.keys(state.players).forEach(function (player) {
            state.players[player].hand.length = 0;
        });
        state.hasStarted = false;
        this.unlock();
    },
    _a);
function reducer(state, action) {
    var invoke = handler[action.type].bind(this);
    console.log('action', __assign({}, lodash_1.omit(action, 'client'), { sessionId: action.client.sessionId }));
    if (typeof invoke === 'function') {
        invoke(state, action);
    }
    else {
        console.warn('>>> unknown action received', action ? .type : );
    }
}
exports["default"] = reducer;
var _a;
