import { xmlContent } from '../constants';

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
