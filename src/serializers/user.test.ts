import { expect } from 'chai';

import { userSerializer } from './user';

const object: any = {
  username: 'username',
  role: 'role',
  email: 'email',
  dictionaries: []
}

describe('userSerializer()', () => {
  it('should return the correct length', () => {
    const serialized = userSerializer(object);

    expect(serialized).to.have.length(2);
  });

  it('should populate the fields', () => {
    const serialized = userSerializer(object);

    expect(serialized[0]).to.deep.equal({
      username: 'username',
      role: 'role'
    });

    expect(serialized[1]).to.deep.equal({
      email: 'email',
      dictionaries: 0
    });
  });
})
