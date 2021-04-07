import { Socket } from 'socket.io';

import { Game } from '../models/Game';
import { User } from '../models/User';

export const socketConnect = async (socket: Socket) => {
  console.log(`User ${socket.user} connected`);

  const user = await User.findOne({ username: socket.user }).exec();

  if (user == null) {
    socket.disconnect(true);

    return;
  }

  socket.on('roomInit', async (data) => {
    const regexResult = data.match(/^[A-Za-z0-9]+-[A-Za-z0-9]+$/);

    // Check whether sent gameId is valid and if current user is in it
    if (regexResult == null && data.split('-').includes(user._id.toString())) {
      socket.emit('roomInitResponse', false);
      socket.disconnect();

      return;
    }

    const dataArr = data.split('-');
    const game = await Game.findOne({
      'host.user': dataArr[0],
      'opponent.user': dataArr[1],
      'completed': false
    });

    if (game) {
      console.log(`${game.host.user} vs ${game.opponent.user}`);

      socket.join(`${game.host.user}-${game.opponent.user}`);
      socket.to(`${game.host.user}-${game.opponent.user}`).emit('userJoined', user.username);
      socket.emit('roomInitResponse', true);
    } else {
      socket.emit('roomInitResponse', false);
      socket.disconnect();
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.user} disconnected`);
  });
};
