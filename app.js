let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config');
let model = require('./model');

let game = new model.Game();
let players = require('./players');
players.forEach(player => {
    game.addPlayer(new model.Player(player.id, player.name));
});

let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/img/player/*.jpg', (req, res) => {
    res.sendFile(__dirname + '/public/img/player/empty.jpg');
});

app.get('/', (req, res) => {
    res.render('index', { game: game });
});

app.get('/control', (req, res) => {
    res.render('control', { game: game });
});

app.get('/api/view', (req, res) => {
    res.json(game);
});

let server = app.listen(config.runport, () => {
    console.log("Listening to port " + config.runport);
});

let io = require('socket.io')(server);
io.on('connection', socket => {
    console.log(io.engine.clientsCount + " clients connected");
    socket.on('next', () => {
        let status = game.next();
        if (status) io.emit('update', 'next');
    });
    socket.on('restart', id => {
        game.players.forEach(player => {
            player.isBoxOpened = false;
            player.isTaken = false;
        });
        game.currentPlayerId = null;
        io.emit('update', '');
    })
});