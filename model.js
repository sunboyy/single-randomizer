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
        this.isTaken = false;
    }
    return Player;
}());
exports.Player = Player;
var Game = /** @class */ (function () {
    function Game() {
        this.players = [];
        this.currentPlayerId = null;
    }
    Game.prototype.addPlayer = function (player) {
        this.players.push(player);
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
        var remainingPlayers = this.players.filter(function (player) { return !player.isTaken; });
        if (remainingPlayers.length == 0)
            return null;
        var randomPlayer = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];
        randomPlayer.isTaken = true;
        return randomPlayer;
    };
    Game.prototype.next = function () {
        var randomPlayer = this.getRandomRemainingPlayer();
        this.currentPlayerId = randomPlayer ? randomPlayer.id : null;
        this.swappedPlayers = [this.currentPlayerId];
        this.shouldSwap = (this.currentPlayerId != null);
        return true;
    };
    return Game;
}());
exports.Game = Game;
