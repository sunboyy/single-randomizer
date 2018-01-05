const model = require("./model");
const readlineSync = require('readline-sync');
var game = new model.Game();
let id = 1;
while (true) {
    let answer = readlineSync.question(">> ").split(' ');
    if (answer[0] == 'q') break;
    else if (answer[0] == 'a') {
        game.addPlayer(new model.Player(id++, answer[1]));
    }
    else if (answer[0] == 'p') {
        console.log(game);
    }
    else if (answer[0] == 'n') {
        let status = game.next();
        if (status) {
            console.log("Next turn: " + game.getCurrentPlayer().name);
        }
    }
    else if (answer[0] == 'o') {
        let status = game.openBox(answer[1]=='1');
        if (status) {
            console.log(game.getCurrentPlayer().name + " open the box");
        }
    }
    else if (answer[0] == 's') {
        let filterPlayers = game.players.filter(player => (player.id == answer[1]));
        if (filterPlayers.length == 1) {
            let status = game.swap(filterPlayers[0].id);
            if (status) {
                console.log("Swapped with: " + game.getCurrentPlayer().name);
            }
        }
    }
    else {
        console.log("Unknown command.");
    }
}
