// tslint:disable-next-line:no-var-requires
const mockingoose = require('mockingoose');

import { Dictionary } from '../models/Dictionary';

import { serialize } from './serialize';

const mockRequest = (include: string[] | undefined = undefined) => ({
  query: {
    include
  }
}) as any;

const mockData = () => ({
  slug: 'slug',
  name: 'name',
  language: 'en',
  public: true,
  words: ['test']
}) as any;

beforeEach(() => {
  mockingoose.resetAll();
});

it('should return raw objects', () => {
  expect(serialize(mockRequest(), { test: true })).toEqual({ test: true });
});

it('should serialize a document', async () => {
  mockingoose(Dictionary)
    .toReturn(mockData(), 'findOne');

  const document = await Dictionary.findOne();

  expect(serialize(mockRequest(), document!)).toEqual({
    slug: 'slug',
    name: 'name',
    language: 'en',
    public: true
  });
});

it('should serialize a list compact', async () => {
  mockingoose(Dictionary)
    .toReturn(mockData(), 'findOne');

  const document = await Dictionary.findOne();
  const result = serialize(mockRequest(), [document]) as object[];

  expect(result.length).toBe(1);
  expect(result[0]).toEqual({
    slug: 'slug',
    name: 'name'
  });
});

it('should include specified propertier', async () => {
  mockingoose(Dictionary)
    .toReturn(mockData(), 'findOne');

  const document = await Dictionary.findOne();

  expect(serialize(mockRequest(['slug']), document!)).toEqual({
    slug: 'slug'
  });
});
