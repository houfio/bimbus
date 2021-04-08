export function compare(guess: string, word: string) {
  const letters = word.split('');

  const result = guess.split('')
    .map((letter, i, arr) => {
      if (letter === letters[i]) {
        return `[${letter}]`;
      } else if (letters.includes(letter)) {
        const matchedGuess = match(letter, arr);
        const matchedWord = match(letter, letters);
        const correct = matchedWord.filter((c) => matchedGuess.find(equals(c)));

        if (matchedGuess.length === matchedWord.length || i < matchedWord.length - correct.length) {
          return `(${letter})`;
        }
      }

      return ` ${letter} `;
    });

  return result.join('');
}

function match(letter: string, letters: string[]) {
  return letters
    .map((l, i) => ({ l, i }))
    .filter(({ l }) => l === letter);
}

function equals(a: any) {
  return (b: any) => {
    for (const [key, value] of Object.entries(a)) {
      if (value !== b[key]) {
        return false;
      }
    }

    return true;
  };
}
