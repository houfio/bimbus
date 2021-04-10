// tslint:disable-next-line:no-var-requires
const mockingoose = require('mockingoose');

import { ResourceError } from '../errors/ResourceError';
import { Game } from '../models/Game';
import { User } from '../models/User';
import { ModelType } from '../types';

import { withGameData } from './withGameData';

const mockCall = (user: ModelType<typeof User>) => withGameData(
  () => [user, user]
)({}, {} as any);

beforeEach(() => {
  mockingoose.resetAll();
});

it('should return the populated context', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');
  mockingoose(Game)
    .toReturn({}, 'findOne');

  const user = await User.findOne();

  await expect(mockCall(user!)).resolves.toBeInstanceOf(Object);
});

it('should throw if no document is found', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');
  mockingoose(Game)
    .toReturn(undefined, 'findOne');

  const user = await User.findOne();

  await expect(mockCall(user!)).rejects.toThrow(ResourceError);
});
