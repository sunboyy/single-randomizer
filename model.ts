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
    constructor(id, name: string) {
        this.id = id;
        this.name = name;
    }
}
export class Game {
    public players: Player[];
    public remainingPlayerIds: string[];
    public currentPlayerId: string;
    constructor() {
        this.players = [];
        this.remainingPlayerIds = [];
        this.currentPlayerId = null;
    }
    addPlayer(player: Player) {
        this.players.push(player);
        this.remainingPlayerIds.push(player.id);
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
        if (this.remainingPlayerIds.length == 0) return null;
        let newPlayerIndex = Math.floor(Math.random() * this.remainingPlayerIds.length);
        let newPlayerId = this.remainingPlayerIds[newPlayerIndex];
        this.remainingPlayerIds.splice(newPlayerIndex, 1);
        return this.getPlayer(newPlayerId);
    }
    next(): boolean {
        let randomPlayer = this.getRandomRemainingPlayer();
        this.currentPlayerId = randomPlayer ? randomPlayer.id : null;
        return true;
    }
    restart() {
        this.currentPlayerId = null;
        this.remainingPlayerIds = [];
        this.players.forEach(player => {
            this.remainingPlayerIds.push(player.id);
        });
    }
}