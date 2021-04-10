import { Token } from '../types';

export function compare(guess: string, word: string) {
  const [guessTokens, { getRemaining }] = tokenize(guess);
  const [wordTokens, { isIncorrect }] = tokenize(word);

  return guessTokens.map((token) => {
    const incorrect = guessTokens.filter((t) => isIncorrect(t, token));

    if (!incorrect.includes(token)) {
      return `[${token.letter}]`;
    } else if (incorrect.indexOf(token) < getRemaining(token, wordTokens)) {
      return `(${token.letter})`;
    }

    return ` ${token.letter} `;
  }).join('');
}

function tokenize(word: string) {
  const tokens = word.split('').map<Token>((letter, index) => ({
    letter,
    index
  }));
  const actions = {
    isIncorrect: (a: Token, b: Token) =>
      a.letter === b.letter && !tokens.some(({ letter, index }) => letter === a.letter && index === a.index),
    getRemaining: (token: Token, ts: Token[]) =>
      ts.reduce((acc, t) => acc + (actions.isIncorrect(t, token) ? 1 : 0), 0)
  };

  return [tokens, actions] as const;
}
