import { gameSerializer } from './game';

const object: any = {
  dictionary: {
    slug: 'dictionary'
  },
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
    dictionary: 'dictionary',
    host: 'host',
    opponent: 'opponent'
  });

  expect(serialized[1]).toEqual({
    hostScore: 0,
    opponentScore: 1
  });
});
