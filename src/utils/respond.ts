import { parse } from 'js2xmlparser';
import { NextApiRequest, NextApiResponse } from 'next';

export function respond(req: NextApiRequest, res: NextApiResponse, data?: object | object[], err?: Error) {
  const body = {
    status: {
      success: !err,
      error: err?.message || null
    },
    data: !data || err ? null : data
  };

  if (req.headers.accept === 'application/xml') {
    res.setHeader('content-type', req.headers.accept);
    res.send(parse('root', body, {
      declaration: {
        encoding: 'utf-8'
      },
      format: {
        doubleQuotes: true
      }
    }));

    return;
  }

  res.json(body);
}
