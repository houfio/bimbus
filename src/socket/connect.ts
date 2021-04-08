import {Server, Socket} from 'socket.io';

import {Dictionary} from '../models/Dictionary';
import { Game } from '../models/Game';
import { User } from '../models/User';

export const socketConnect = async (io: Server, socket: Socket) => {
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

    const regexResult = data.match(/^[a-zA-Z0-9_]{3,32}-[a-zA-Z0-9_]{3,32}$/);

    if (regexResult == null) {
      return reject();
    }

    const [hostUsername, opponentUsername] = data.split('-');

    // TODO bruhh waar zijn m'n mooie middlewares?
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

    if (game.answers.length === 0) {
      const dictionary = await Dictionary.findById(game.dictionary).exec();

      if (!dictionary || dictionary.words.length === 0) {
        return reject();
      }

      game.answers.push({
        word: dictionary.words[Math.floor(Math.random() * dictionary.words.length)],
        guesses: []
      });
      await game.save()
    }

    socket.data.gameId = game._id;
    socket.data.roomId = data;
    socket.join(data);
    io.in(data).emit('userJoined', user.username);
    socket.emit('roomInitResponse', true);
    socket.emit('message', `The word is ${game.answers[game.answers.length - 1].word.length} characters long!`);
  });

  socket.on('guess', async (guess) => {
    if (socket.data.roomId == null || socket.data.gameId == null) {
      return;
    }

    const game = await Game.findById(socket.data.gameId).exec();

    if (!game) {
      return;
    }

    const answer = game.answers[game.answers.length - 1];

    if (guess.length !== answer.word.length) {
      io.in(socket.data.roomId).emit('message', `Invalid guess ${guess} given. Not same length as answer!`)
      return;
    }

    answer.guesses.push(guess);
    await game.save();

    let revealedWord = '';
    const revealedLetters: string[] = [];

    // Go through the word to add all GUESSED letters
    for(let i = 0; i < answer.word.length; i++) {
      answer.guesses.forEach((g) => {
        if (g[i] === answer.word[i] && revealedWord[i] !== g[i]) {
          revealedWord += answer.word[i];
        }
      });

      if(revealedWord.length !== i + 1) {
        revealedWord += '_';
      }
    }

    // Go through the word to add all letters in the wrong position
    for(let i = 0; i < answer.word.length; i++) {
      answer.guesses.forEach((g) => {
        if (answer.word.includes(g[i]) && !revealedLetters.includes(g[i])) {
          const amountInAnswer = (answer.word.split('').find((s) => s === g[i]) || []).length;
          const amountInRevealed = (revealedWord.split('').find((s) => s === g[i]) || []).length;
          if (amountInAnswer !== amountInRevealed + (revealedLetters.find((s) => s === g[i]) || []).length) {
            revealedLetters.push(g[i]);
          }
        }
      })
    }

    io.in(socket.data.roomId).emit('message', `Client made guess ${guess}, resulting in: ${revealedWord}. Letters in wrong place: ${revealedLetters.join(', ')}`)
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.user} disconnected`);
  });
};



