import { Socket } from 'socket.io';

import { Game } from '../models/Game';
import { User } from '../models/User';

export const socketConnect = async (socket: Socket) => {
  console.log(`User ${socket.user} connected`);

  const user = await User.findOne({ username: socket.user });

  if (user == null) {
    socket.disconnect(true);

    return;
  }

  socket.on('roomInit', async (data) => {
    const reject = () => {
      socket.emit('roomInitResponse', false);
      socket.disconnect();
    };

    const regexResult = data.match(/^[A-Za-z0-9_]+-[A-Za-z0-9_]+$/);

    if (regexResult == null) {
      return reject();
    }

    const [hostUsername, opponentUsername] = data.split('-');

    // bruhh waar zijn m'n mooie middlewares?
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
      'completed': false
    });

    if (!game) {
      return reject();
    }

    console.log(`${game.host.user.username} vs ${game.opponent.user.username}`);

    socket.join(data);
    socket.to(data).emit('userJoined', user.username);
    socket.emit('roomInitResponse', true);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.user} disconnected`);
  });
};
