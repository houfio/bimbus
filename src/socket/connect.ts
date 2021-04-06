import { Socket } from 'socket.io';

export const socketConnect = async (socket: Socket) => {
  console.log(`User ${socket.user} connected`);

  socket.on('roomInit', (data) => {
    // TODO check whether user is allowed to view this game
    console.log(data);

    socket.emit('roomInitResponse', true);
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.user} disconnected`);
  });
}
