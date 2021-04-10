import { Token } from '../types';

export function compare(guess: string, word: string) {
  const tokenizedGuess = tokenize(guess);
  const tokenizedWord = tokenize(word);

  return tokenizedGuess.map((token) => {
    const incorrect = tokenizedGuess.filter((t) => containsNeither(t, token, tokenizedWord));

    if (!incorrect.includes(token)) {
      return `[${token.letter}]`;
    } else if (incorrect.indexOf(token) < remainderOf(token, tokenizedGuess, tokenizedWord)) {
      return `(${token.letter})`;
    }

    return ` ${token.letter} `;
  }).join('');
}

const tokenize = (str: string) => str.split('').map<Token>((letter, index) => ({
  letter,
  index
}));

const containsNeither = (a: Token, b: Token, tokens: Token[]) =>
  a.letter === b.letter && !tokens.some(({ letter, index }) => letter === a.letter && index === a.index);

const remainderOf = (token: Token, a: Token[], b: Token[]) =>
  b.reduce((acc, t) => acc + (containsNeither(t, token, a) ? 1 : 0), 0);
