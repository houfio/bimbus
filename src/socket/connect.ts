import { Server, Socket } from 'socket.io';

import { Game } from '../models/Game';
import { User } from '../models/User';

import { guess } from './guess';

export async function connect(io: Server, socket: Socket) {
  const { id } = socket.handshake.query;
  const user = await User.findOne({ username: socket.user });

  if (!user || typeof id !== 'string') {
    return socket.disconnect(true);
  }

  const [hostUsername, opponentUsername] = id.split('-');

  if (user.role !== 'admin' && hostUsername !== user.username && opponentUsername !== user.username) {
    return socket.disconnect(true);
  }

  const host = await User.findOne({ username: hostUsername });
  const opponent = await User.findOne({ username: opponentUsername });

  if (!host || !opponent) {
    return socket.disconnect(true);
  }

  const game = await Game.findOne({
    'host.user': host.id,
    'opponent.user': opponent.id,
    completed: false
  });

  if (!game) {
    return socket.disconnect(true);
  }

  socket.join(id);
  socket.emit('message', `The word is ${game.word.length} characters long`);

  const room = io.in(id);

  console.log(`${socket.user} connected to ${id}`);
  room.emit('message', `${user.username} joined the game`);

  socket.on('disconnect', () => console.log(`${socket.user} disconnected from ${id}`));
  socket.on('guess', (word: string) => {
    if (io.sockets.adapter.rooms.get(id)?.size !== 2) {
      return room.emit('message', 'Please wait for all users to connect');
    }

    return guess(room, socket, user, game.id, word)
  });
}
