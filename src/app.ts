import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';
import { join } from 'path';
import { port } from './config';
import { game } from './game';
import { initSocket } from './socket';

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

const server = new Server(app);
initSocket(server);

server.listen(port, () => {
    console.log('Listening to port ' + port);
});
