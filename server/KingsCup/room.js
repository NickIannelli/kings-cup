"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var colyseus_1 = require("colyseus");
var lodash_1 = require("lodash");
var reducer_1 = require("./reducer");
var types_1 = require("./types");
var getValue = function (v) {
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
var KingsCupRoom = (function (_super) {
    __extends(KingsCupRoom, _super);
    function KingsCupRoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reducer = reducer_1["default"].bind(_this);
        return _this;
    }
    KingsCupRoom.prototype.onCreate = function (options) {
        console.log("Room Created", options);
        this.setState(new types_1.State());
        this.populateDeck();
    };
    KingsCupRoom.prototype.onJoin = function (client, options) {
        var _this = this;
        if (!this.state.hasStarted) {
            console.log("client \"" + client.sessionId + "\" has joined, options =>", options);
            var player = new types_1.Player();
            player.id = client.sessionId;
            player.connected = true;
            if (Object.keys(this.state.players).every(function (player) { return !_this.state.players[player].isHost; })) {
                player.isHost = true;
            }
            this.state.players[client.sessionId] = player;
        }
    };
    KingsCupRoom.prototype.onLeave = function (client, consented) {
        return __awaiter(this, void 0, void 0, function () {
            var newClient, e_1, active, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.state.players[client.sessionId].connected = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (consented) {
                            throw new Error('consented leave!');
                        }
                        console.log("let's wait for reconnection!");
                        return [4 /*yield*/, this.allowReconnection(client, 60)];
                    case 2:
                        newClient = _a.sent();
                        console.log('reconnected!', newClient.sessionId);
                        this.state.players[newClient.sessionId].connected = true;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('disconnected!', client.sessionId);
                        active = this.state.active;
                        index = Object.keys(this.state.players).findIndex(function (key) { return key === client.sessionId; });
                        if (index < active) {
                            this.state.active = active - 1;
                        }
                        else if (active === Object.keys(this.state.players).length - 1) {
                            // Last person on list DC'd, and it's their turn = go to first persons turn
                            this.state.active = 0;
                        }
                        delete this.state.players[client.sessionId];
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    KingsCupRoom.prototype.onMessage = function (client, message) {
        var action = __assign({}, message, { client: client });
        this.reducer(this.state, action);
    };
    KingsCupRoom.prototype.onDispose = function () {
        console.log('Disposing KingsCup Room');
    };
    KingsCupRoom.prototype.populateDeck = function () {
        var _this = this;
        var deck = [];
        for (var suits = 0; suits < 4; suits++) {
            for (var values = 1; values < 13; values++) {
                deck.push({ suit: types_1.Suit[suits], value: getValue(values) });
            }
        }
        deck = lodash_1.shuffle(deck);
        deck.forEach(function (card) {
            var newCard = new types_1.Card();
            newCard.suit = card.suit;
            newCard.value = card.value;
            newCard.isDrawn = false;
            _this.state.deck.push(newCard);
        });
    };
    KingsCupRoom.prototype.getPlayer = function (client) {
        return this.state.players[client.sessionId];
    };
    return KingsCupRoom;
}(colyseus_1.Room));
exports.KingsCupRoom = KingsCupRoom;
