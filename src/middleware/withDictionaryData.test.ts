// tslint:disable-next-line:no-var-requires
const mockingoose = require('mockingoose');

import { ResourceError } from '../errors/ResourceError';
import { Dictionary } from '../models/Dictionary';
import { User } from '../models/User';
import { ModelType } from '../types';

import { withDictionaryData } from './withDictionaryData';

const mockCall = (user: ModelType<typeof User>) => withDictionaryData(
  () => ['slug', user]
)({}, {} as any);

beforeEach(() => {
  mockingoose.resetAll();
});

it('should return the populated context', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');
  mockingoose(Dictionary)
    .toReturn({}, 'findOne');

  const user = await User.findOne();

  await expect(mockCall(user!)).resolves.toBeInstanceOf(Object);
});

it('should throw if no document is found', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');
  mockingoose(Dictionary)
    .toReturn(undefined, 'findOne');

  const user = await User.findOne();

  await expect(mockCall(user!)).rejects.toThrow(ResourceError);
});
