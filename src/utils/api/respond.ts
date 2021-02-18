import { parse } from 'js2xmlparser';
import { NextApiRequest, NextApiResponse } from 'next';

import { xmlContent } from '../../constants';

export function respond(req: NextApiRequest, res: NextApiResponse, data?: object | object[], err?: Error, status?: number) {
  const body = {
    status: {
      success: !err,
      error: err?.message || null
    },
    data: !data || err ? null : data
  };

  if (err || status) {
    res.status(status ?? 500);
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
