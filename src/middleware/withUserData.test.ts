// tslint:disable-next-line:no-var-requires
const mockingoose = require('mockingoose');

import { AuthorizationError } from '../errors/AuthorizationError';
import { ResourceError } from '../errors/ResourceError';
import { User } from '../models/User';
import { ModelType } from '../types';

import { withUserData } from './withUserData';

const mockCall = (
  data: string | [string, ModelType<typeof User>],
  set?: (value: object) => object
) => withUserData(() => data, set)({}, undefined!)

beforeEach(() => {
  mockingoose.resetAll();
});

it('should return the populated context', async () => {
  mockingoose(User)
    .toReturn((query: any) => {
      expect(query.getQuery()).toEqual({
        username: 'test'
      });

      return {};
    }, 'findOne');

  await expect(mockCall('test')).resolves.toBeInstanceOf(Object);
});

it('should throw if the user is not found', async () => {
  mockingoose(User)
    .toReturn(undefined, 'findOne');

  await expect(mockCall('')).rejects.toThrow(ResourceError);
});

it('should use the custom set function', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');

  await expect(mockCall('', (value) => value)).resolves.toBeInstanceOf(User);
});

it('should fail validation when user is not an admin', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');

  const user = await User.findOne();

  await expect(mockCall(['', user!])).rejects.toThrow(AuthorizationError);
});
