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
        const filtered = match(letter, arr, (_, ii) => !correct.find((c) => c.i === ii))

        if (matchedGuess.length === matchedWord.length
          || filtered.find((g) => g.i === i)!.ii < matchedWord.length - correct.length) {
          return `(${letter})`;
        }
      }

      return ` ${letter} `;
    });

  return result.join('');
}

function match(letter: string, letters: string[], filter: (l: string, i: number) => boolean = (l) => l === letter) {
  return letters
    .map((l, i) => ({ l, i }))
    .filter(({ l, i }) => filter(l, i))
    .map(({ l, i }, ii) => ({ l, i, ii }));
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
