import bodyParser from 'body-parser';
import express from 'express';
import { join } from 'path';
import socketIo from 'socket.io';
import { port } from './config';
import { Game } from './game';
import { Player } from './player';
import players from './players';

const game = new Game();
players.forEach(player => {
    game.addPlayer(new Player(player.id, player.name));
});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/img/player/*.jpg', (req, res) => {
    res.sendFile(join(__dirname, '../public/img/player/empty.jpg'));
});

app.get('/', (req, res) => {
    res.render('index', { game });
});

app.get('/control', (req, res) => {
    res.render('control', { game });
});

app.get('/api/view', (req, res) => {
    res.json(game);
});

const server = app.listen(port, () => {
    console.log('Listening to port ' + port);
});

const io = socketIo(server);
io.on('connection', socket => {
    console.log((io.engine as any).clientsCount + ' clients connected');
    socket.on('next', () => {
        const status = game.next();
        if (status) { io.emit('update', 'next'); }
    });
    socket.on('restart', id => {
        game.restart();
        io.emit('update', 'restart');
    });
});
