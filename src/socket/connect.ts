import { Server, Socket } from 'socket.io';

import { Game } from '../models/Game';
import { User } from '../models/User';
import { Username } from '../structs/refinements/Username';
import { compare } from '../utils/compare';

export const socketConnect = async (io: Server, socket: Socket) => {
  console.log(`User ${socket.user} connected`);

  const user = await User.findOne({ username: socket.user });

  if (user == null) {
    return socket.disconnect(true);
  }

  socket.on('join', async (data) => {
    const reject = () => {
      socket.emit('success', false);
      socket.disconnect();
    };

    const [hostUsername, opponentUsername] = data.split('-');

    if (!Username.is(hostUsername) || !Username.is(opponentUsername)) {
      return reject();
    }

    // todo(lex): bruhh waar zijn m'n mooie middlewares?
    const host = await User.findOne({
      username: hostUsername
    });
    const opponent = await User.findOne({
      username: opponentUsername
    });

    if (!host || !opponent) {
      return reject();
    }

    const game = await Game.findOne({
      'host.user': host.id,
      'opponent.user': opponent.id,
      completed: false
    });

    if (!game) {
      return reject();
    }

    socket.data.gameId = game._id;
    socket.data.roomId = data;

    socket.join(data);
    io.in(data).emit('userJoined', user.username);

    socket.emit('success', true);
    socket.emit('message', `The word is ${game.word.length} characters long`);
  });

  socket.on('guess', async (guess: string) => {
    const { roomId, gameId } = socket.data;

    if (!roomId || !gameId) {
      return;
    }

    const game = await Game.findById(gameId);

    if (!game) {
      return;
    }

    if (guess.length !== game.word.length) {
      return io.in(roomId).emit('message', `Invalid guess ${guess} (not same length as answer)`);
    } else if (!game.dictionary.words.includes(guess)) {
      return io.in(roomId).emit('message', `Invalid guess ${guess} (not in the selected dictionary)`);
    }

    const key = user.username === game.host.user.username ? 'host' : 'opponent';

    game[key].guesses.push(guess);
    await game.save();

    io.in(roomId).emit('message', `Result: ${compare(guess, game.word)}`);

    if (guess === game.word) {
      game.completed = true;
      await game.save();

      io.in(roomId).disconnectSockets(true);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.user} disconnected`);
  });
};



