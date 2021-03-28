import { expect } from 'chai';

import { gameSerializer } from './game';

const object: any = {
  dictionary: 'dictionary',
  host: {
    user: 'host',
    score: 0
  },
  opponent: {
    user: 'opponent',
    score: 1
  }
}

describe('gameSerializer()', () => {
  it('should return the correct length', () => {
    const serialized = gameSerializer(object);

    expect(serialized).to.have.length(2);
  });

  it('should populate the fields', () => {
    const serialized = gameSerializer(object);

    expect(serialized[0]).to.deep.equal({
      dictionary: 'dictionary',
      host: 'host',
      opponent: 'opponent'
    });

    expect(serialized[1]).to.deep.equal({
      hostScore: 0,
      opponentScore: 1
    });
  });
})
