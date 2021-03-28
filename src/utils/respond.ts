import { Request, Response } from 'express';
import { parse } from 'js2xmlparser';

import { xmlContent } from '../constants';
import { HttpError } from '../errors/HttpError';
import { InternalError } from '../errors/InternalError';

export function respond(req: Request, res: Response, data?: object | object[] | Error) {
  console.log('Responding to', req.ip);

  if (!data) {
    return res.status(204).send('204');
  }

  const failed = data instanceof Error;
  const error = data instanceof HttpError ? data : new InternalError();
  const { data: inner, ...rest } = data as any;
  const body = {
    status: {
      success: !failed,
      code: failed ? error.code : 200,
      message: failed ? error.message : null,
      info: failed ? error.info : null
    },
    ...!failed && inner ? rest : {},
    data: failed ? null : inner ?? data
  };

  if (failed) {
    res.status(error.code);

    for (const [key, value] of Object.entries(error.headers)) {
      res.setHeader(key, value);
    }
  }

  if (req.headers.accept !== xmlContent) {
    return res.json(body);
  }

  res.setHeader('Content-Type', xmlContent);
  res.send(parse('root', body, {
    declaration: {
      encoding: 'utf-8'
    },
    format: {
      doubleQuotes: true
    }
  }));
}
