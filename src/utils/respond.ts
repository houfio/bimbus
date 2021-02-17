import { parse } from 'js2xmlparser';
import { NextApiRequest, NextApiResponse } from 'next';

import { xmlContent } from '../constants';

export function respond(req: NextApiRequest, res: NextApiResponse, data?: object | object[], err?: Error) {
  const body = {
    status: {
      success: !err,
      error: err?.message || null
    },
    data: !data || err ? null : data
  };

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
