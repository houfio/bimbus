// tslint:disable-next-line:no-var-requires
const mockingoose = require('mockingoose');

import { AuthenticationError } from '../errors/AuthenticationError';
import { User } from '../models/User';

import { withAuthentication } from './withAuthorization';

const mockCall = (bearer: string = '') => withAuthentication()({}, {
  headers: {
    authorization: `Bearer ${bearer}`
  }
} as any);
let old = {};

beforeEach(() => {
  old = process.env;
  process.env = { SECRET: 'secret' };

  mockingoose.resetAll();
});

afterEach(() => {
  process.env = old;
});

it('should change middleware method', () => {
  expect(withAuthentication(false).method).toBe('all');
  expect(withAuthentication(true).method).toBe('use');
});

it('should should return the populated context', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');

  await expect(mockCall('eyJhbGciOiJIUzI1NiJ9.YWRtaW4.Hq25ihi_FB2DYnhkH9mO7z7nz67xPsE5IfFsUgDhbrU')).resolves.toBeInstanceOf(Object);
});

it('should throw when no token is given', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');

  await expect(mockCall()).rejects.toThrow(AuthenticationError);
});
