import { xmlContent } from '../constants';
import { MethodError } from '../errors/MethodError';

import { respond } from './respond';

const mockRequest = (xml = false) => ({
  ip: '::1',
  headers: {
    accept: xml ? xmlContent : 'application/json'
  }
}) as any;

const mockResponse = () => {
  const res: any = {};

  res.status = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
};

it('should return 204 when data is empty', () => {
  const res = mockResponse();

  respond(mockRequest(), res);

  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.send).toHaveBeenCalledWith('204');
});

it('should respond with xml when requested', () => {
  const res = mockResponse();

  respond(mockRequest(true), res, {});

  expect(res.setHeader).toHaveBeenCalledWith('Content-Type', xmlContent);
});

it('should unpack nested data', () => {
  const res = mockResponse();

  respond(mockRequest(), res, {
    test: true,
    data: {
      test: true
    }
  });

  expect(res.json).toHaveBeenCalledWith({
    status: { code: 200, info: null, message: null, success: true },
    test: true,
    data: { test: true }
  });
});

it('should add error headers', () => {
  const res = mockResponse();

  respond(mockRequest(), res, new MethodError(['get']));

  expect(res.setHeader).toHaveBeenCalledWith('Allowed', 'GET');
});
