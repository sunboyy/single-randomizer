import { Player } from './player';

export class Game {
    public players: Player[];
    public remainingPlayerIds: number[];
    public currentPlayerId?: number;
    constructor() {
        this.players = [];
        this.remainingPlayerIds = [];
    }
    addPlayer(player: Player) {
        this.players.push(player);
        this.remainingPlayerIds.push(player.id);
    }
    getPlayer(id: number): Player | null {
        const filterPlayers = this.players.filter(player => player.id === id);
        if (filterPlayers.length === 0) { return null; }
        return filterPlayers[0];
    }
    getCurrentPlayer(): Player | null {
        if (!this.currentPlayerId) { return null; }
        return this.getPlayer(this.currentPlayerId);
    }
    getRandomRemainingPlayer(): Player | null {
        if (this.remainingPlayerIds.length === 0) { return null; }
        const newPlayerIndex = Math.floor(Math.random() * this.remainingPlayerIds.length);
        const newPlayerId = this.remainingPlayerIds[newPlayerIndex];
        this.remainingPlayerIds.splice(newPlayerIndex, 1);
        return this.getPlayer(newPlayerId);
    }
    next(): boolean {
        const randomPlayer = this.getRandomRemainingPlayer();
        this.currentPlayerId = randomPlayer ? randomPlayer.id : undefined;
        return true;
    }
    restart() {
        this.currentPlayerId = undefined;
        this.remainingPlayerIds = [];
        this.players.forEach(player => {
            this.remainingPlayerIds.push(player.id);
        });
    }
}
