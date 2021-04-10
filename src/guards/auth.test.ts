// tslint:disable-next-line:no-var-requires
const mockingoose = require('mockingoose');
import { Document } from 'mongoose';

import { AuthenticationError } from '../errors/AuthenticationError';
import { User } from '../models/User';

import { auth } from './auth';

let old = {};

beforeEach(() => {
  old = process.env;
  process.env = { SECRET: 'secret' };

  mockingoose.resetAll();
});

afterEach(() => {
  process.env = old;
});

it('should fail with no headers are given', async () => {
  await expect(auth({})).rejects.toThrow(AuthenticationError);
});

it('should fail when invalid headers are given', async () => {
  await expect(auth({ authorization: 'token' })).rejects.toThrow(AuthenticationError);
});

it('should fail when the user is not found', async () => {
  mockingoose(User)
    .toReturn(undefined, 'findOne');

  await expect(auth({ authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.YWRtaW4.Hq25ihi_FB2DYnhkH9mO7z7nz67xPsE5IfFsUgDhbrU' })).rejects.toThrow(AuthenticationError);
});

it('should return the user on success', async () => {
  mockingoose(User)
    .toReturn({}, 'findOne');

  await expect(auth({ authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.YWRtaW4.Hq25ihi_FB2DYnhkH9mO7z7nz67xPsE5IfFsUgDhbrU' })).resolves.toBeInstanceOf(Document);
});
