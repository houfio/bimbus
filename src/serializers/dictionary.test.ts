import { dictionarySerializer } from './dictionary';

const object: any = {
  slug: 'slug',
  name: 'name',
  language: 'language',
  public: true
};

it('should return the correct length', () => {
  const serialized = dictionarySerializer(object);

  expect(serialized.length).toBe(2);
});

it('should populate the fields', () => {
  const serialized = dictionarySerializer(object);

  expect(serialized[0]).toEqual({
    slug: 'slug',
    name: 'name'
  });

  expect(serialized[1]).toEqual({
    language: 'language',
    public: true
  });
});
