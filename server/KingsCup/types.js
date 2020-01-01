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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var schema_1 = require("@colyseus/schema");
var actions_1 = require("@kings-cup/shared/actions");
var Suit;
(function (Suit) {
    Suit[Suit["Spade"] = 0] = "Spade";
    Suit[Suit["Heart"] = 1] = "Heart";
    Suit[Suit["Diamond"] = 2] = "Diamond";
    Suit[Suit["Club"] = 3] = "Club";
    Suit[Suit["All"] = 4] = "All";
})(Suit = exports.Suit || (exports.Suit = {}));
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.suit = '';
        _this.value = '';
        _this.isDrawn = false;
        return _this;
    }
    __decorate([
        schema_1.type('string')
    ], Card.prototype, "suit");
    __decorate([
        schema_1.type('string')
    ], Card.prototype, "value");
    __decorate([
        schema_1.type('boolean')
    ], Card.prototype, "isDrawn");
    return Card;
}(schema_1.Schema));
exports.Card = Card;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hand = new schema_1.ArraySchema();
        _this.name = '';
        _this.id = '';
        _this.avatar = '';
        _this.isHost = false;
        _this.connected = false;
        return _this;
    }
    __decorate([
        schema_1.type([Card])
    ], Player.prototype, "hand");
    __decorate([
        schema_1.type('string')
    ], Player.prototype, "name");
    __decorate([
        schema_1.type('string')
    ], Player.prototype, "id");
    __decorate([
        schema_1.type('string')
    ], Player.prototype, "avatar");
    __decorate([
        schema_1.type('boolean')
    ], Player.prototype, "isHost");
    __decorate([
        schema_1.type('boolean')
    ], Player.prototype, "connected");
    return Player;
}(schema_1.Schema));
exports.Player = Player;
var RuleCard = (function (_super) {
    __extends(RuleCard, _super);
    function RuleCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.card = new Card();
        _this.rule = '';
        return _this;
    }
    __decorate([
        schema_1.type(Card)
    ], RuleCard.prototype, "card");
    __decorate([
        schema_1.type('string')
    ], RuleCard.prototype, "rule");
    return RuleCard;
}(schema_1.Schema));
exports.RuleCard = RuleCard;
var State = (function (_super) {
    __extends(State, _super);
    function State() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.players = new schema_1.MapSchema();
        _this.deck = new schema_1.ArraySchema();
        _this.hasStarted = false;
        _this.active = 0;
        _this.rules = new schema_1.MapSchema();
        return _this;
    }
    __decorate([
        schema_1.type({ map: Player })
    ], State.prototype, "players");
    __decorate([
        schema_1.type([Card])
    ], State.prototype, "deck");
    __decorate([
        schema_1.type('boolean')
    ], State.prototype, "hasStarted");
    __decorate([
        schema_1.type('number')
    ], State.prototype, "active");
    __decorate([
        schema_1.type({ map: RuleCard })
    ], State.prototype, "rules");
    return State;
}(schema_1.Schema));
exports.State = State;
var Action_CardDrawn = (function (_super) {
    __extends(Action_CardDrawn, _super);
    function Action_CardDrawn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = '';
        _this.card = new Card();
        _this.rule = '';
        _this.type = actions_1.drawCard.toString();
        return _this;
    }
    __decorate([
        schema_1.type('string')
    ], Action_CardDrawn.prototype, "player");
    __decorate([
        schema_1.type(Card)
    ], Action_CardDrawn.prototype, "card");
    __decorate([
        schema_1.type('string')
    ], Action_CardDrawn.prototype, "rule");
    __decorate([
        schema_1.type('string')
    ], Action_CardDrawn.prototype, "type");
    return Action_CardDrawn;
}(schema_1.Schema));
exports.Action_CardDrawn = Action_CardDrawn;
