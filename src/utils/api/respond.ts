import { parse } from 'js2xmlparser';
import { NextApiRequest, NextApiResponse } from 'next';

import { xmlContent } from '../../constants';
import { HttpError } from '../../exceptions/HttpError';

export function respond(req: NextApiRequest, res: NextApiResponse, data?: object | object[] | Error) {
  if (!data) {
    return res.status(204).send('204');
  }

  const failed = data instanceof Error;
  const body = {
    status: {
      success: !failed,
      error: failed ? (data as Error).message : null
    },
    data: failed ? null : data
  };

  if (failed) {
    res.status(data instanceof HttpError ? data.code : 500);
  }

  if (req.headers.accept !== xmlContent) {
    return res.json(body);
  }

  res.setHeader('content-type', xmlContent);
  res.send(parse('root', body, {
    declaration: {
      encoding: 'utf-8'
    },
    format: {
      doubleQuotes: true
    }
  }));
}
