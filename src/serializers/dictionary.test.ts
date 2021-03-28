import { expect } from 'chai';

import { dictionarySerializer } from './dictionary';

const object: any = {
  slug: 'slug',
  name: 'name',
  language: 'language',
  public: true
};

describe('dictionarySerializer()', () => {
  it('should return the correct length', () => {
    const serialized = dictionarySerializer(object);

    expect(serialized).to.have.length(2);
  });

  it('should populate the fields', () => {
    const serialized = dictionarySerializer(object);

    expect(serialized[0]).to.deep.equal({
      slug: 'slug',
      name: 'name'
    });

    expect(serialized[1]).to.deep.equal({
      language: 'language',
      public: true
    });
  });
});
