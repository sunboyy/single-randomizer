export class Status {
    public title: string;
    public data: any;
    constructor(title: string, data: object | string) {
        this.title = title;
        this.data = data;
    }
}
export class Player {
    public id;
    public name: string;
    public isTaken: boolean;
    constructor(id, name: string) {
        this.id = id;
        this.name = name;
        this.isTaken = false;
    }
}
export class Game {
    public players: Player[];
    public swappedPlayers: string[];
    public currentPlayerId: string;
    public shouldSwap: boolean;
    constructor() {
        this.players = [];
        this.currentPlayerId = null;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    getPlayer(id: string): Player {
        let filterPlayers = this.players.filter(player => player.id == id);
        if (filterPlayers.length == 0) return null;
        return filterPlayers[0];
    }
    getCurrentPlayer(): Player {
        if (this.currentPlayerId == null) return null;
        return this.getPlayer(this.currentPlayerId);
    }
    getRandomRemainingPlayer(): Player {
        let remainingPlayers = this.players.filter(player => !player.isTaken);
        if (remainingPlayers.length == 0) return null;
        let randomPlayer = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];
        randomPlayer.isTaken = true;
        return randomPlayer;
    }
    next(): boolean {
        let randomPlayer = this.getRandomRemainingPlayer();
        this.currentPlayerId = randomPlayer ? randomPlayer.id : null;
        this.swappedPlayers = [this.currentPlayerId];
        this.shouldSwap = (this.currentPlayerId != null);
        return true;
    }
}