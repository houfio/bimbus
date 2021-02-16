import { NextApiRequest, NextApiResponse } from 'next';

import { respond } from '../../utils/respond';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    status: {
      success: true,
      error: null
    },
    data: {
      version: 1
    }
  };

  respond('index', body, req, res);
}
