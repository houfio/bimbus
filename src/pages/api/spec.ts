import { NextApiRequest, NextApiResponse } from 'next';
import { generateSpec } from 'utils/generateSpec';

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.json(generateSpec());
}
