"use strict";
exports.__esModule = true;
var Status = /** @class */ (function () {
    function Status(title, data) {
        this.title = title;
        this.data = data;
    }
    return Status;
}());
exports.Status = Status;
var Player = /** @class */ (function () {
    function Player(id, name) {
        this.id = id;
        this.name = name;
    }
    return Player;
}());
exports.Player = Player;
var Game = /** @class */ (function () {
    function Game() {
        this.players = [];
        this.remainingPlayerIds = [];
        this.currentPlayerId = null;
    }
    Game.prototype.addPlayer = function (player) {
        this.players.push(player);
        this.remainingPlayerIds.push(player.id);
    };
    Game.prototype.getPlayer = function (id) {
        var filterPlayers = this.players.filter(function (player) { return player.id == id; });
        if (filterPlayers.length == 0)
            return null;
        return filterPlayers[0];
    };
    Game.prototype.getCurrentPlayer = function () {
        if (this.currentPlayerId == null)
            return null;
        return this.getPlayer(this.currentPlayerId);
    };
    Game.prototype.getRandomRemainingPlayer = function () {
        if (this.remainingPlayerIds.length == 0)
            return null;
        var newPlayerIndex = Math.floor(Math.random() * this.remainingPlayerIds.length);
        var newPlayerId = this.remainingPlayerIds[newPlayerIndex];
        this.remainingPlayerIds.splice(newPlayerIndex, 1);
        return this.getPlayer(newPlayerId);
    };
    Game.prototype.next = function () {
        var randomPlayer = this.getRandomRemainingPlayer();
        this.currentPlayerId = randomPlayer ? randomPlayer.id : null;
        return true;
    };
    Game.prototype.restart = function () {
        var _this = this;
        this.currentPlayerId = null;
        this.remainingPlayerIds = [];
        this.players.forEach(function (player) {
            _this.remainingPlayerIds.push(player.id);
        });
    };
    return Game;
}());
exports.Game = Game;