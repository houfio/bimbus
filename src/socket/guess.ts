import { Schema } from 'mongoose';
import { BroadcastOperator, Socket } from 'socket.io';

import { Game } from '../models/Game';
import { User } from '../models/User';
import { ModelType } from '../types';
import { compare } from '../utils/compare';

export async function guess(room: BroadcastOperator<any>, socket: Socket, user: ModelType<typeof User>, id: Schema.Types.ObjectId, word: string) {
  const game = await Game.findById(id);

  if (!game) {
    return;
  }

  if (word.length !== game.word.length) {
    return socket.emit('message', 'Guess not same length as answer');
  } else if (!game.dictionary.words.includes(word)) {
    return socket.emit('message', 'Guess not in the dictionary');
  }

  const key = user.username === game.host.user.username ? 'host' : 'opponent';

  game[key].guesses.push(word);
  await game.save();

  socket.emit('message', compare(word, game.word));

  if (word === game.word) {
    game[key].score++;
    game.completed = true;
    await game.save();

    room.emit('message', `${user.username} guessed the word!`)
    room.disconnectSockets(true);
  }
}
