import { userSerializer } from './user';

const object: any = {
  username: 'username',
  role: 'role',
  email: 'email',
  dictionaries: []
};

it('should return the correct length', () => {
  const serialized = userSerializer(object);

  expect(serialized.length).toBe(2);
});

it('should populate the fields', () => {
  const serialized = userSerializer(object);

  expect(serialized[0]).toEqual({
    username: 'username',
    role: 'role'
  });

  expect(serialized[1]).toEqual({
    email: 'email',
    dictionaries: 0
  });
});
