import { Server } from 'http';
import socketIo from 'socket.io';
import { game } from './game';

export function initSocket(server: Server) {
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
}
