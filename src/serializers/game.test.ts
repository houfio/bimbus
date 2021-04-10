import { gameSerializer } from './game';

const object: any = {
  dictionary: {
    slug: 'dictionary'
  },
  completed: false,
  word: 'test',
  host: {
    user: {
      username: 'host'
    },
    score: 0
  },
  opponent: {
    user: {
      username: 'opponent'
    },
    score: 1
  }
};

it('should return the correct length', () => {
  const serialized = gameSerializer(object);

  expect(serialized.length).toBe(2);
});

it('should populate the fields', () => {
  const serialized = gameSerializer(object);

  expect(serialized[0]).toEqual({
    host: 'host',
    opponent: 'opponent',
    completed: false
  });

  expect(serialized[1]).toEqual({
    dictionary: 'dictionary',
    hostScore: 0,
    opponentScore: 1,
    word: null
  });
});
