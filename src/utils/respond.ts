import { parse } from 'js2xmlparser';
import { NextApiRequest, NextApiResponse } from 'next';

export function respond(name: string, body: object, req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.accept === 'application/xml') {
    res.setHeader('content-type', req.headers.accept);
    res.send(parse(name, body, {
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
