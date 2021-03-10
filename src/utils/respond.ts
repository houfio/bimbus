import { parse } from 'js2xmlparser';
import { NextApiRequest, NextApiResponse } from 'next';

import { xmlContent } from '../constants';
import { HttpError } from '../errors/HttpError';
import { InternalServerError } from '../errors/InternalServerError';

export function respond(req: NextApiRequest, res: NextApiResponse, data?: object | object[] | Error) {
  if (!data) {
    return res.status(204).send('204');
  }

  const failed = data instanceof Error;
  const error = data instanceof HttpError ? data : new InternalServerError();
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
